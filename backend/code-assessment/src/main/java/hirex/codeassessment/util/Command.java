// @author Vivek Sonani

package hirex.codeassessment.util;

import java.io.*;

public class Command {
    // @author Vivek Sonani
    public static String[] getJavaCompilationCommand(String directoryPath, String fileName){
        return new String[]{"javac", "-d", directoryPath, directoryPath+fileName};
    }

    // @author Vivek Sonani
    public static String[] getJavaExecutionCommand(String directoryPath, String className){
        return new String[]{"java", "-cp", directoryPath, className};
    }

    // @author Vivek Sonani
    public static String[] getPythonExecutionCommand(String directoryPath, String fileName){
        return new String[]{"python3", directoryPath+fileName};
    }

    // @author Vivek Sonani
    public static int commandExecutor(StringBuilder output, String[] command, String testCaseInput) throws Exception {
        ProcessBuilder processBuilder = new ProcessBuilder(command);
        processBuilder.redirectErrorStream(true);

        Process process = processBuilder.start();
        InputStream inputStream = process.getInputStream();

        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
        OutputStream outputStream = process.getOutputStream();

        if (testCaseInput != null) {
            BufferedWriter bufferedWriter = new BufferedWriter(new OutputStreamWriter(outputStream));
            bufferedWriter.write(testCaseInput);
            bufferedWriter.close();
        }

        String line;
        while ((line = bufferedReader.readLine()) != null) {
            output.append(line).append("\n");
        }

        if(!output.isEmpty()){
            output.setLength(output.length() - 1);
        }

        return process.waitFor();
    }
}
