package com.wooahan.back.controller;

import com.wooahan.back.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/login")
public class LoginController {

    private final LoginService loginService;

    @GetMapping("/guest/{androidId}")
    //TODO 기기명을 받아야 전환을 하든 받든함
    public ResponseEntity<String> guestLogin(@PathVariable String androidId) {
        return new ResponseEntity<>(loginService.tempLogin(androidId), HttpStatus.OK);
    }

    //https://accounts.google.com/o/oauth2/auth?client_id=658207955186-n84qpvfhtdi82n6mfvbmh6v99aevulv7.apps.googleusercontent.com&redirect_uri=http://localhost:9090/login/oauth2/code/google&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile
    //TODO 만약 게스트였던 녀석이었으면의 로직 작성 필요
    @GetMapping("/oauth2/code/{registrationId}")
    public ResponseEntity<String> googleLogin(@RequestParam String code, @PathVariable String registrationId) {
        return new ResponseEntity<>(loginService.socialLogin(code, registrationId),HttpStatus.OK);
    }

}
