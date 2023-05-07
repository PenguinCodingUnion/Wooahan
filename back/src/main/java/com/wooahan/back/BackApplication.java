package com.wooahan.back;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Date;

@SpringBootApplication
public class BackApplication {

    public static void main(String[] args) {
//            String clientId = "gtn0k9euc0";//애플리케이션 클라이언트 아이디값";
//            String clientSecret = "3dF1RZ8UPddaf22Nj4iPAL4GuJNplBFIaX0S1wT5";//애플리케이션 클라이언트 시크릿값";
//            try {
//                String text = URLEncoder.encode("개구리가 폴짝폴짝 엄청나게 뛴다", "UTF-8"); // 13자
//                String apiURL = "https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts";
//                URL url = new URL(apiURL);
//                HttpURLConnection con = (HttpURLConnection)url.openConnection();
//                con.setRequestMethod("POST");
//                con.setRequestProperty("X-NCP-APIGW-API-KEY-ID", clientId);
//                con.setRequestProperty("X-NCP-APIGW-API-KEY", clientSecret);
//                // post request
//                String postParams = "speaker=nmeow&volume=0&speed=3&pitch=-1&format=mp3&text=" + text;
//                con.setDoOutput(true);
//                DataOutputStream wr = new DataOutputStream(con.getOutputStream());
//                wr.writeBytes(postParams);
//                wr.flush();
//                wr.close();
//                int responseCode = con.getResponseCode();
//                BufferedReader br;
//                if(responseCode==200) { // 정상 호출
//                    InputStream is = con.getInputStream();
//                    int read = 0;
//                    byte[] bytes = new byte[1024];
//                    // 랜덤한 이름으로 mp3 파일 생성
//                    String tempname = Long.valueOf(new Date().getTime()).toString();
//                    File f = new File(tempname + ".mp3");
//                    f.createNewFile();
//                    OutputStream outputStream = new FileOutputStream(f);
//                    while ((read =is.read(bytes)) != -1) {
//                        outputStream.write(bytes, 0, read);
//                    }
//                    is.close();
//                } else {  // 오류 발생
//                    br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
//                    String inputLine;
//                    StringBuffer response = new StringBuffer();
//                    while ((inputLine = br.readLine()) != null) {
//                        response.append(inputLine);
//                    }
//                    br.close();
//                    System.out.println(response.toString());
//                }
//            } catch (Exception e) {
//                System.out.println(e);
//            }

        SpringApplication.run(BackApplication.class, args);
    }

}
