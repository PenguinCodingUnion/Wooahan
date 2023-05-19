package com.wooahan.back.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.wooahan.back.dto.*;
import com.wooahan.back.entity.Member;
import com.wooahan.back.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LoginService{

    private final Environment env;
    private final RestTemplate restTemplate = new RestTemplate();
    private final MemberRepository memberRepository;

    //TODO Oauth 통합필요
    public LoginResDto socialLogin(OauthReqCode oauthReqCode, String registrationId){
        String deviceId= oauthReqCode.getDeviceId();

        String Token = getAccessToken(oauthReqCode.getCode(),registrationId);
        JsonNode userResourceNode = getUserResource(Token, registrationId);

        String oauthId = null;
        String name = null;
        if(registrationId.equals("kakao")) {
            oauthId = userResourceNode.get("id").asText();
            name = userResourceNode.get("properties").get("nickname").asText();
        }else if(registrationId.equals("google")){
            oauthId = userResourceNode.get("email").asText();
            name = userResourceNode.get("name").asText();
        }
        //id로 찾아서 있으면, 그냥 주고, 없으면  deviceid로 찾아서 수정시키게 해줌.
        Member member = memberRepository.findByEmail(oauthId)
                .orElseGet(()-> memberRepository.findByProvider(oauthReqCode.getDeviceId()).get());
        //TODO 추후 수정
        member.update(oauthId,deviceId,name);

        memberRepository.save(member);
        return new LoginResDto(member.getEmail(), member.getStarCount(),member.getName());
    }

//    public void socialLogin(String code, String state, String registrationId) {
//        String accessToken = getAccessToken(code, registrationId);
//        JsonNode userResourceNode = getUserResource(accessToken, registrationId);
//
//        String email = userResourceNode.get("email").asText();
//        String nickname = userResourceNode.get("name").asText();
//
//        Member member = memberRepository.findByEmail(email)
//                .orElseGet(()-> memberRepository.findByProvider(state).get());
//
//        member.update(email,state,nickname);
//        memberRepository.save(member);
//    }

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
        //TODO exception 처리
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
        Member member = memberRepository.findByProvider(loginReqDto.getAndroidId())
                .orElseGet(()->memberRepository.findByEmail(loginReqDto.getEmail())
                        .orElseGet(()->createMember(loginReqDto.getAndroidId())));

        return LoginResDto.builder()
                .starCount(member.getStarCount())
                .email(member.getEmail())
                .name(member.getName())
                .build();
    }
}
