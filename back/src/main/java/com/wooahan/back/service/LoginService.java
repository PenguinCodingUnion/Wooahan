package com.wooahan.back.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.wooahan.back.entity.Member;
import com.wooahan.back.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final Environment env;
    private final RestTemplate restTemplate = new RestTemplate();
    private final MemberRepository memberRepository;

    public String socialLogin(String code, String registrationId) {
        System.out.println(code+"코드다");
        String accessToken = getAccessToken(code, registrationId);
        JsonNode userResourceNode = getUserResource(accessToken, registrationId);
        System.out.println("userResourceNode = " + userResourceNode);

        String id = userResourceNode.get("id").asText();
        String email = userResourceNode.get("email").asText();
        String nickname = userResourceNode.get("name").asText();
        Member member = Member.builder()
                .name(nickname)
                .email(email)
                .isGuest(false)
                .provider(registrationId)
                .build();
        memberRepository.save(member);

        System.out.println("id = " + id);
        System.out.println("email = " + email);
        System.out.println("nickname = " + nickname);
        return email;
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

    //guestlogin
    public String tempLogin(String androidID) {
        Member member = Member.builder()
                .name("guest")
                .email(UUID.randomUUID().toString())
                .provider(androidID)
                .isGuest(true)
                .build();
        memberRepository.save(member);
        return member.getEmail();
    }
}
