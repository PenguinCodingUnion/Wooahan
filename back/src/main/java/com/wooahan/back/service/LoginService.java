package com.wooahan.back.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.wooahan.back.dto.*;
import com.wooahan.back.entity.Member;
import com.wooahan.back.repository.MemberRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.core.env.Environment;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final Environment env;
    private final RestTemplate restTemplate = new RestTemplate();
    private final MemberRepository memberRepository;

//    public String createCookie(HttpServletResponse response) {
////        logger.info("쿠키 생성");
//        Cookie cookie = new Cookie("test","ang~");
//        cookie.setDomain("https://k8b206.p.ssafy.io");
//        cookie.setPath("/");
//        // 30초간 저장
//        cookie.setMaxAge(60*60*60);
//        cookie.setSecure(true);
//        response.addCookie(cookie);
//
//        return "redirect:/";
//    }
    public void socialLogin(String code, String state, String registrationId) {
        String accessToken = getAccessToken(code, registrationId);
        JsonNode userResourceNode = getUserResource(accessToken, registrationId);

        String email = userResourceNode.get("email").asText();
        String nickname = userResourceNode.get("name").asText();
        Member member = memberRepository.findByProvider(state).get();
        member.update(email,state,nickname);
        memberRepository.save(member);
//        return new OauthResDto(email,registrationId,nickname);
    }

    private String getAccessToken(String authorizationCode, String registrationId) {
        String clientId = env.getProperty("oauth2." + registrationId + ".client-id");
        String clientSecret = env.getProperty("oauth2." + registrationId + ".client-secret");
        String redirectUri = env.getProperty("oauth2." + registrationId + ".redirect-uri");
        String tokenUri = env.getProperty("oauth2." + registrationId + ".token-uri");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", authorizationCode);
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("redirect_uri", redirectUri);
        params.add("grant_type", "authorization_code");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity entity = new HttpEntity(params, headers);

        ResponseEntity<JsonNode> responseNode = restTemplate.exchange(tokenUri, HttpMethod.POST, entity, JsonNode.class);
        JsonNode accessTokenNode = responseNode.getBody();
        return accessTokenNode.get("access_token").asText();
    }

    private JsonNode getUserResource(String accessToken, String registrationId) {
        String resourceUri = env.getProperty("oauth2."+registrationId+".resource-uri");

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        HttpEntity entity = new HttpEntity(headers);
        return restTemplate.exchange(resourceUri, HttpMethod.GET, entity, JsonNode.class).getBody();
    }

    public Member createMember(String androidId){
        Member member = Member.builder()
                .name("guest")
                .email(UUID.randomUUID().toString())
                .provider(androidId)
                .isGuest(true)
                .build();
        memberRepository.save(member);
        return member;
    }
    //guest
    public LoginResDto tempLogin(LoginReqDto loginReqDto) {
        Member member =memberRepository.findByEmailOrProvider(loginReqDto.getEmail(),loginReqDto.getAndroidId())
                .orElseGet(()->createMember(loginReqDto.getAndroidId()));
        return LoginResDto.builder()
                .rewards(member.getRewards()
                        .stream()
                        .map(reward -> new SimpleWordInfo(reward.getWord().getName(), reward.getWord().getImgUrl()))
                        .collect(Collectors.toList()))
                .starCount(member.getStarCount())
                .email(member.getEmail())
                .build();
    }

    //guest->google
    public String registerMember(UpdateReqDto updateReqDto) {
        Member member = memberRepository.findByEmailOrProvider(updateReqDto.getEmail(),updateReqDto.getAndroidId()).get();
        member.update(updateReqDto.getEmail(), updateReqDto.getAndroidId(),updateReqDto.getName());
        memberRepository.save(member);
        return member.getEmail();
    }


    public String getToken(KakaoCode kakaoCode) {
        String registrationId= "kakao";
        String clientId = env.getProperty("oauth2." + registrationId + ".client-id");
        String clientSecret = env.getProperty("oauth2." + registrationId + ".client-secret");
        String redirectUri = env.getProperty("oauth2." + registrationId + ".redirect-uri");
        String tokenUri = env.getProperty("oauth2." + registrationId + ".token-uri");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", kakaoCode.getCode());
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("redirect_uri", redirectUri);
        params.add("grant_type", "authorization_code");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity entity = new HttpEntity(params, headers);

        ResponseEntity<JsonNode> responseNode = restTemplate.exchange(tokenUri, HttpMethod.POST, entity, JsonNode.class);
        JsonNode accessTokenNode = responseNode.getBody();
        String token = accessTokenNode.get("access_token").asText();
        ///
        String resourceUri = env.getProperty("oauth2."+registrationId+".resource-uri");
        headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        entity = new HttpEntity(headers);
        JsonNode jsonNode = restTemplate.exchange(resourceUri, HttpMethod.GET, entity, JsonNode.class).getBody();
        System.out.println(jsonNode);
        return jsonNode.get("id").asText();
    }
}
