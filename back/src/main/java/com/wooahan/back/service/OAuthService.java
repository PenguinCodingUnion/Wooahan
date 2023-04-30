//package com.wooahan.back.service;
//
//import com.wooahan.back.dto.Constant;
//import com.wooahan.back.dto.GoogleOauth;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//
//@Service
//@RequiredArgsConstructor
//public class OAuthService {
//    private final GoogleOauth googleOauth;
//    private final HttpServletResponse response;
//
//    public void request(Constant.SocialLoginType socialLoginType) throws IOException {
//        String redirectURL;
//        switch (socialLoginType){
//            case GOOGLE:{
//                //각 소셜 로그인을 요청하면 소셜로그인 페이지로 리다이렉트 해주는 프로세스이다.
//                redirectURL= googleOauth.getOauthRedirectURL();
//            }break;
//            default:{
//                throw new IllegalArgumentException("알 수 없는 소셜 로그인 형식입니다.");
//            }
//
//        }
//
//        response.sendRedirect(redirectURL);
//    }
//}
