package com.wooahan.back.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.wooahan.back.dto.LoginReqDto;
import com.wooahan.back.dto.LoginResDto;
import com.wooahan.back.dto.OauthResDto;
import com.wooahan.back.dto.UpdateReqDto;
import com.wooahan.back.entity.Member;
import com.wooahan.back.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final Environment env;
    private final RestTemplate restTemplate = new RestTemplate();
    private final MemberRepository memberRepository;

    public OauthResDto socialLogin(String code, String registrationId) {
        String accessToken = getAccessToken(code, registrationId);
        JsonNode userResourceNode = getUserResource(accessToken, registrationId);

//        String id = userResourceNode.get("id").asText();
        String email = userResourceNode.get("email").asText();
        String nickname = userResourceNode.get("name").asText();

        return new OauthResDto(email,nickname,registrationId);
    }

    private String getAccessToken(String authorizationCode, String registrationId) {
        System.out.println(registrationId);
        String clientId = env.getProperty("oauth2." + registrationId + ".client-id");
        String clientSecret = env.getProperty("oauth2." + registrationId + ".client-secret");
        String redirectUri = env.getProperty("oauth2." + registrationId + ".redirect-uri");
        String tokenUri = env.getProperty("oauth2." + registrationId + ".token-uri");

        System.out.println(clientId);
        System.out.println(tokenUri);

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

    //TODO userresourcenode 이용
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
        Member member =memberRepository.findByProviderOrEmail(loginReqDto.getEmail(),loginReqDto.getAndroidId())
                //없으면 넌 guest야
                .orElseGet(()->createMember(loginReqDto.getAndroidId()));
        return LoginResDto.builder()
                .rewards(member.getRewards())
                .starCount(member.getStarCount())
                .email(member.getEmail())
                .build();
    }

    //guest->google
    public String registerMember(UpdateReqDto updateReqDto) {
        Member member = memberRepository.findByProviderOrEmail(updateReqDto.getEmail(),updateReqDto.getAndroidId()).get();
        member.update(updateReqDto.getEmail(), updateReqDto.getProvider(),updateReqDto.getName());
        memberRepository.save(member);
        return member.getEmail();
    }
}
