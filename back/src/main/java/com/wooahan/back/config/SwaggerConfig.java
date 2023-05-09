package com.wooahan.back.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Server;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Collections;


@Configuration  //스프링 실행시 설정파일 읽어드리기 위한 어노테이션
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket api() {
        Server serverLocal = new Server("local", "http://localhost:9090", "for local usages", Collections.emptyList(), Collections.emptyList());
        Server testServer = new Server("test", "https://k8b206.p.ssafy.io", "for testing", Collections.emptyList(), Collections.emptyList());
        return new Docket(DocumentationType.OAS_30)
                .servers(serverLocal,testServer)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
                .build();
    }

    public ApiInfo apiInfo(){
        return new ApiInfoBuilder()
                .title("우아한 백입니다")
                .version("0.1")
                .description("우아한 프로토")
                .build();
    }
}