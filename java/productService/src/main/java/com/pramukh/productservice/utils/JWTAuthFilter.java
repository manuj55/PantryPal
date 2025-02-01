package com.pramukh.productservice.utils;

import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JWTAuthFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            // Let the preflight pass through with 200 OK
            response.setStatus(HttpServletResponse.SC_OK);
            chain.doFilter(request, response);
            return;
        }

        System.out.println("JWTAuthFilter invoked");
        String header = request.getHeader("Authorization");
        if (header == null || !header.startsWith("Bearer")) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authorization header is missing");
            return;
        }
        System.out.println("Header present");
        String token = header.substring(7);
        try {

            DecodedJWT jwt = JWTvalidator.validate(token);
            System.out.println(jwt);
            List<String> endpointRoles = getRoles(request);
            System.out.println(endpointRoles + "endpointRoles");
            if (!endpointRoles.isEmpty()) {
                String[] userRoles = jwt.getClaim("roles").asArray(String.class);
                System.out.println("userroles" + userRoles);
                if (!userHasRequiredRole(endpointRoles, userRoles)) {
                    response.sendError(HttpServletResponse.SC_FORBIDDEN,
                            "You are not authorized to access this endpoint");
                    return;
                }
            }

            chain.doFilter(request, response);
            System.out.println("Filter completed execution.");

        } catch (Exception e) {
            System.out.println("Error in filter");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token: " + e.getMessage());
        }

    }

    private boolean userHasRequiredRole(List<String> requiredRoles, String[] userRoles) {
        for (String role : userRoles) {
            if (requiredRoles.contains(role)) {
                return true;
            }
        }
        return false;
    }

    private List<String> getRoles(HttpServletRequest request) {
        String endpoint = request.getRequestURI();
        System.out.println(endpoint);
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
