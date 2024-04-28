/**
 * Controller class handling authentication-related endpoints.
 * Provides endpoints for user login, registration, password reset, and forgot password functionality.
 * Utilizes an authentication manager for login and JWT authentication.
 * Supports cross-origin requests from allowed origins defined in the application properties.
 *
 * @author Rushikumar Patel
 */
package hirex.controller;

import hirex.dto.ForgotPasswordRequestDTO;
import hirex.dto.LoginRequestDTO;
import hirex.dto.RegistrationRequestDTO;
import hirex.dto.ResetPasswordRequestDTO;
import hirex.model.User;
import hirex.model.UserCode;
import hirex.response.APIResponse;
import hirex.response.AuthResponse;
import hirex.service.CustomUserDetailsService;
import hirex.service.EmailService;
import hirex.service.EmailServiceImpl;
import hirex.service.UserCodeService;
import hirex.util.Constants;
import hirex.util.JwtUtil;
import hirex.util.ResponseMessage;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("${cross.origin.allowed-origins}")
@RequestMapping("/rest/auth")
public class AuthController {
    @Value("${frontend-url}")
    private String applicationUrl;
    private final AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private UserCodeService userCodeService;

    @Autowired
    private EmailService emailService;

    private JwtUtil jwtUtil;
    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;

    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequestDTO loginRequestDTO)  {
        AuthResponse authResponse = new AuthResponse();

        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequestDTO.getEmail(), loginRequestDTO.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String email = authentication.getName();
            User user = customUserDetailsService.getUser(email);

            String token = jwtUtil.createToken(user);

            authResponse.setMessage(Constants.SUCCESS);
            authResponse.setSuccess(true);
            authResponse.setUser(user);
            authResponse.setToken(token);

            return new ResponseEntity<>(authResponse, HttpStatus.OK);

        }catch (BadCredentialsException e){
            authResponse.setMessage(ResponseMessage.INVALID_USERNAME_OR_PASSWORD);
            authResponse.setSuccess(false);
            return new ResponseEntity<>(authResponse, HttpStatus.BAD_REQUEST);
        }catch (AuthenticationException e) {
            authResponse.setMessage(ResponseMessage.INVALID_USERNAME_OR_PASSWORD);
            authResponse.setSuccess(false);
            return new ResponseEntity<>(authResponse, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegistrationRequestDTO registrationRequestDTO){
        AuthResponse authResponse = new AuthResponse();

        if(customUserDetailsService.getUser(registrationRequestDTO.getEmail()) != null){
            authResponse.setMessage(ResponseMessage.User_Already_Exists);
            authResponse.setSuccess(false);
            return new ResponseEntity<>(authResponse, HttpStatus.BAD_REQUEST);
        }
        User user = customUserDetailsService.addUser(registrationRequestDTO);

        Authentication authentication =
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(registrationRequestDTO.getEmail(), registrationRequestDTO.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtUtil.createToken(user);

        authResponse.setMessage(Constants.SUCCESS);
        authResponse.setSuccess(true);
        authResponse.setUser(user);
        authResponse.setToken(token);
        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<APIResponse> forgotpassword(@RequestBody ForgotPasswordRequestDTO forgotPasswordRequestDTO) throws MessagingException {
            APIResponse apiResponse = new APIResponse();
            User user = customUserDetailsService.getUser(forgotPasswordRequestDTO.getEmail());
            if(user==null){
                apiResponse.setMessage(ResponseMessage.USER_DOES_NOT_EXISTS);
                apiResponse.setSuccess(false);
                return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
            }
            String subject = "Forget Password Request - HireX";
            String body = "URL to reset your password is: ";
            if(user==null) {
                apiResponse.setMessage(Constants.NOT_FOUND);
                apiResponse.setSuccess(false);
                return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
            }
            UserCode usercode = userCodeService.add(user);

            String link = applicationUrl+"resetpassword/"+usercode.getCode();
            String email = user.getEmail();
            emailService.sendEmail(email, subject, body, link);
            apiResponse.setMessage(Constants.SUCCESS);
            apiResponse.setSuccess(true);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<APIResponse> resetpassword(@RequestBody ResetPasswordRequestDTO resetPasswordRequestDTO){
        APIResponse apiResponse = new APIResponse();

        UserCode userCode = userCodeService.getUserCodeByCode(resetPasswordRequestDTO.getCode());
        if(userCode==null){
            apiResponse.setMessage(Constants.NOT_FOUND);
            apiResponse.setSuccess(false);
            return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
        }

        if(userCode.getIsActive()==false){
            apiResponse.setMessage("Password is Already Reset");
            apiResponse.setSuccess(false);
            return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
        }

        customUserDetailsService.updateUserPassword(userCode.getUser(), resetPasswordRequestDTO.getPassword());

        userCodeService.updateIsActive(userCode);

        apiResponse.setMessage(Constants.SUCCESS);
        apiResponse.setSuccess(true);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }
}