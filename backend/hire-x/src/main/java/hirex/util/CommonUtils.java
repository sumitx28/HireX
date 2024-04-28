package hirex.util;

import java.time.Instant;
import java.time.ZoneId;
import java.util.Date;
import java.util.Random;

public class CommonUtils {

    public static String generatePassword() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder password = new StringBuilder();
        Random rnd = new Random();
        for (int i = 0; i < 8; i++) {
            int index = rnd.nextInt(chars.length());
            password.append(chars.charAt(index));
        }
        return password.toString();
    }
}
