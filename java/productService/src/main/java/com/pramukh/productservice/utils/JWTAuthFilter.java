package com.pramukh.productservice.utils;

import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
@Slf4j
@Component
public class JWTAuthFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        System.out.println("Filter");
        log.info("Filter");
        // Allow swagger to be accessed without token
        String requestURI = request.getRequestURI();
        if (requestURI.startsWith("/swagger-ui")) {
            chain.doFilter(request, response);
            return;
        }

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {

            response.setStatus(HttpServletResponse.SC_OK);
            chain.doFilter(request, response);
            return;
        }

        // Check if the request has a header in the  token
        System.out.println("JWTAuthFilter invoked");
        String header = request.getHeader("Authorization");

        if (header == null || !header.startsWith("Bearer")) {
            log.error("Authorization header is missing");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authorization header is missing");
            return;
        }
        System.out.println("Header present");
        String token = header.substring(7);
        try {

            // Validate the token using the JWTValidator class
            DecodedJWT jwt = JWTvalidator.validate(token);

            // Check if the user has the required roles to access the endpoint

            List<String> endpointRoles = getRoles(request);
            System.out.println(endpointRoles + "endpointRoles");
            log.info("checking roles");
            if (!endpointRoles.isEmpty()) {
                String[] userRoles = jwt.getClaim("roles").asArray(String.class);
                System.out.println("userroles" + userRoles);
                if (!userHasRequiredRole(endpointRoles, userRoles)) {
                    log.error("User is not authorized to access this endpoint");
                    response.sendError(HttpServletResponse.SC_FORBIDDEN, "You are not authorized to access this endpoint");
                    return;
                }
            }
            chain.doFilter(request, response);

        } catch (Exception e) {
            log.error("Invalid token");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token: " + e.getMessage());
        }

    }

    // Check if the user has the required roles to access the endpoint
    private boolean userHasRequiredRole(List<String> requiredRoles, String[] userRoles) {
        for (String role : userRoles) {
            if (requiredRoles.contains(role)) {
                return true;
            }
        }
        return false;
    }

    // Get the roles required to access the endpoint
    private List<String> getRoles(HttpServletRequest request) {
        String endpoint = request.getRequestURI();

        String method = request.getMethod();
        if (endpoint.contains("/api/products") && method.equals("GET")) {
            return List.of("admin", "user", "order_service");
        }
        if (endpoint.contains("/api/products") && method.equals("POST")) {
            return List.of("admin");
        }

        if (endpoint.contains("/api/products") && method.equals("PUT")) {
            return List.of("admin");
        }
        if (endpoint.contains("/api/products") && method.equals("DELETE")) {
            return List.of("admin");
        }
        return List.of("");
    }
}
