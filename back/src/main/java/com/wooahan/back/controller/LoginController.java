package com.wooahan.back.controller;

import com.wooahan.back.dto.LoginReqDto;
import com.wooahan.back.dto.LoginResDto;
import com.wooahan.back.dto.OauthResDto;
import com.wooahan.back.dto.UpdateReqDto;
import com.wooahan.back.entity.Member;
import com.wooahan.back.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/login")
public class LoginController {

    private final LoginService loginService;

    @PostMapping("/guest")
    public ResponseEntity<LoginResDto> guestLogin(@RequestBody LoginReqDto loginReqDto) {
        return new ResponseEntity<>(loginService.tempLogin(loginReqDto), HttpStatus.OK);
    }

    //https://accounts.google.com/o/oauth2/auth?client_id=658207955186-n84qpvfhtdi82n6mfvbmh6v99aevulv7.apps.googleusercontent.com&redirect_uri=http://k8b206.p.ssafy.io/api/login/oauth2/code/google&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile
    @GetMapping("/oauth2/code/{registrationId}")
    public ResponseEntity<OauthResDto> googleLogin(@RequestParam String code, @PathVariable String registrationId) {
        return new ResponseEntity<>(loginService.socialLogin(code, registrationId),HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerEmail(@RequestBody UpdateReqDto updateReqDto) {
        return new ResponseEntity<>(loginService.registerMember(updateReqDto), HttpStatus.OK);
    }

}
