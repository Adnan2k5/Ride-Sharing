package com.ems.ems_server.Utility;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;

import java.time.Instant;

public class JwtUtils {
    private static final String SECRET_KEY = "ridesharing2024javasaling";  
    private static final long EXPIRATION_TIME = 86400L * 10;

    public static String generateToken(String email) {
        return JWT.create()
                .withSubject(email)
                .withIssuer("ride-sharing")
                .withExpiresAt(Instant.now().plusSeconds(EXPIRATION_TIME))
                .sign(Algorithm.HMAC256(SECRET_KEY));
    }

    public static String extractEmail(String token) {
        try {
            JWTVerifier verifier = JWT.require(Algorithm.HMAC256(SECRET_KEY))
                    .build();
            DecodedJWT decodedJWT = verifier.verify(token);
            return decodedJWT.getSubject(); 
        } catch (Exception e) {
            return null; 
        }
    }
    public static boolean isTokenValid(String token) {
        return extractEmail(token) != null;
    }
}
