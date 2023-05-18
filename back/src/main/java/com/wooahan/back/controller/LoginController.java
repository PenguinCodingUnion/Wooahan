package com.wooahan.back.controller;

import com.wooahan.back.dto.*;
import com.wooahan.back.service.LoginService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.logging.Logger;

@RestController
@CrossOrigin("*")
@Slf4j
@RequiredArgsConstructor
@RequestMapping(value = "/api/login")
public class LoginController {
    private final LoginService loginService;

    @Operation(summary = "어플 시작하자마자 실행할 로그인 요청",description = "androidId와 email을 받고,email과 starCount,Rewards를 return ")
    @PostMapping("/guest")
    //TODO request없으면 안되게 반환
    public ResponseEntity<LoginResDto> guestLogin(@Parameter(name="loginReqDto",description ="email,androidId") @RequestBody LoginReqDto loginReqDto) {
        return new ResponseEntity<>(loginService.tempLogin(loginReqDto), HttpStatus.OK);
    }

    @Operation(summary = "oauth 로그인 요청")
    @PostMapping("/oauth2/{registrationId}")
    public ResponseEntity<LoginResDto> getSocialToken(@RequestBody OauthReqCode oauthReqCode, @PathVariable String registrationId,HttpServletResponse response) throws IOException {
        log.info(registrationId, "구글이에요 카카오요");
        LoginResDto loginResDto = loginService.socialLogin(oauthReqCode, registrationId);
        if(registrationId.equals("google"))
            response.sendRedirect("https://k8b206.p.ssafy.io/login/success");
        return new ResponseEntity<>(loginResDto,HttpStatus.OK);
    }


//    @Operation(summary = "구글 oauth2(신경 안써도됨)", description = "구글 로그인 버튼 누르면 email,provider(google),name 줄거임")
//    @GetMapping("/oauth2/code/state/{registrationId}")
//    public void googleLogin(@RequestParam String code, @RequestParam String state, @PathVariable String registrationId, HttpServletResponse response) throws IOException {
//        loginService.socialLogin(code,state, registrationId);
//        response.sendRedirect("https://k8b206.p.ssafy.io/login/success");
//    }

//    @Operation(summary = "게스트를 구글계정으로 바꿔주는 거", description = "구글 oauth2누르고 나서 바로 chaining으로 보내줘야 할 것")
//    @ResponseBody
//    @PostMapping("/register")
//    public ResponseEntity<String> registerEmail(@Parameter(name="updateReqDto",description ="email,provider,name,androidId")@RequestBody UpdateReqDto updateReqDto) {
//        return new ResponseEntity<>(loginService.registerMember(updateReqDto), HttpStatus.OK);
//    }


}
