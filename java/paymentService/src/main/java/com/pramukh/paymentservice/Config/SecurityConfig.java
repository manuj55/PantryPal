package com.pramukh.paymentservice.Config;

import com.pramukh.paymentservice.utils.JWTAuthFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SecurityConfig {
    @Bean
    public FilterRegistrationBean<JWTAuthFilter> jwtAuthFilter() {
        FilterRegistrationBean<JWTAuthFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new JWTAuthFilter());
        registrationBean.addUrlPatterns("/api/*");
        return registrationBean;
    }
}
