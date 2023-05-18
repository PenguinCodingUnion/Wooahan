package com.wooahan.back.controller;

import com.wooahan.back.dto.LoginReqDto;
import com.wooahan.back.dto.LoginResDto;
import com.wooahan.back.dto.OauthResDto;
import com.wooahan.back.dto.UpdateReqDto;
import com.wooahan.back.service.LoginService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@RestController
@CrossOrigin("*")
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

    @GetMapping("/test/{id}")
    public void testlogin(@PathVariable String id, HttpServletRequest request){
        HttpSession session = request.getSession();

    }

    //https://accounts.google.com/o/oauth2/auth?client_id=658207955186-n84qpvfhtdi82n6mfvbmh6v99aevulv7.apps.googleusercontent.com&redirect_uri=https://k8b206.p.ssafy.io/api/login/oauth2/code/state/google&response_type=code&state=&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile
    @Operation(summary = "구글 oauth2(신경 안써도됨)", description = "구글 로그인 버튼 누르면 email,provider(google),name 줄거임")
    @GetMapping("/oauth2/code/state/{registrationId}")
    public void googleLogin(@RequestParam String code, @RequestParam String state, @PathVariable String registrationId, HttpServletResponse response) throws IOException {
        loginService.socialLogin(code,state, registrationId);
        System.out.println(state);
//        ObjectMapper om = new ObjectMapper();
//        String cookieValue = om.writeValueAsString(oauthResDto);
//        cookieValue = URLEncoder.encode(cookieValue, StandardCharsets.UTF_8);
//        Cookie cookie = new Cookie("test",cookieValue);

////        cookie.setDomain("https://k8b206.p.ssafy.io");
//        cookie.setPath("/");
//        // 30초간 저장
//        cookie.setMaxAge(60*60*60*24);
//        cookie.setSecure(true);
//        response.addCookie(cookie);
//        response.add
//        response.sendRedirect("https://k8b206.p.ssafy.io/jump?email="+oauthResDto.getEmail()+"&provider="+oauthResDto.getProvider()+"&name="+oauthResDto.getName());
//        redirectAttributes.addAttribute("email",oauthResDto.getEmail());
//        redirectAttributes.addAttribute("provider",oauthResDto.getProvider());
//        redirectAttributes.addAttribute("name",oauthResDto.getName());
//        return state;
    }

    @Operation(summary = "게스트를 구글계정으로 바꿔주는 거", description = "구글 oauth2누르고 나서 바로 chaining으로 보내줘야 할 것")
    @ResponseBody
    @PostMapping("/register")
    public ResponseEntity<String> registerEmail(@Parameter(name="updateReqDto",description ="email,provider,name,androidId")@RequestBody UpdateReqDto updateReqDto) {
        return new ResponseEntity<>(loginService.registerMember(updateReqDto), HttpStatus.OK);
    }


}
