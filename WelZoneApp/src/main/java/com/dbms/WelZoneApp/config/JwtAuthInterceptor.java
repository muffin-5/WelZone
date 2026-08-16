package com.dbms.WelZoneApp.config;

import com.dbms.WelZoneApp.util.JwtUtil;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class JwtAuthInterceptor implements HandlerInterceptor {

    private final JwtUtil jwtUtil;

    public JwtAuthInterceptor(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // Allow CORS preflight requests
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            return true;
        }

        // Public endpoints (login + registration) do not require a token
        if (isPublicEndpoint(request)) {
            return true;
        }

        String header = request.getHeader("Authorization");
        if (header == null || !header.startsWith("Bearer ")) {
            writeUnauthorized(response, "Missing or malformed Authorization header.");
            return false;
        }

        String token = header.substring(7).trim();
        try {
            if (!jwtUtil.isValid(token)) {
                writeUnauthorized(response, "Invalid token.");
                return false;
            }
            // Attach identity info to the request for downstream use
            request.setAttribute("userId", jwtUtil.getSubject(token));
            request.setAttribute("userRole", jwtUtil.getRole(token));
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            writeUnauthorized(response, "Invalid or expired token.");
            return false;
        }
    }

    private boolean isPublicEndpoint(HttpServletRequest request) {
        String method = request.getMethod();
        String path = request.getRequestURI();
        String contextPath = request.getContextPath();
        String uri = path.substring(contextPath.length());

        if ("POST".equalsIgnoreCase(method)) {
            return uri.equals("/api/users/login")
                    || uri.equals("/api/counselors/login")
                    || uri.equals("/api/users/register")
                    || uri.equals("/api/counselors");
        }
        if ("GET".equalsIgnoreCase(method)) {
            return uri.equals("/") || uri.equals("/error");
        }
        return false;
    }

    private void writeUnauthorized(HttpServletResponse response, String message) throws Exception {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write("{\"message\": \"" + message + "\"}");
    }
}