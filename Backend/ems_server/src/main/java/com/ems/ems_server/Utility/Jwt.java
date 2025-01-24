// package com.ems.ems_server.Utility;
// import io.jsonwebtoken.Claims;
// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.SignatureAlgorithm;
// import javax.crypto.SecretKey;
// import javax.crypto.spec.SecretKeySpec;
// import java.util.Base64;
// import java.util.Date;

// public class Jwt {

//     private static final String SECRET_KEY = "your-256-bit-secret-ride-sharing-application"; // Use a secure key (e.g., generated)
//     private static final long EXPIRATION_TIME = 9600000;

//     // Convert the string secret key to a SecretKey object
//     private static SecretKey getSigningKey() {
//         byte[] keyBytes = Base64.getDecoder().decode(SECRET_KEY);
//         return new SecretKeySpec(keyBytes, SignatureAlgorithm.HS256.getJcaName());
//     }

//     public static String generateToken(String email) {
//         return Jwts.builder()
//                 .setSubject(email)
//                 .setIssuedAt(new Date())
//                 .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
//                 .signWith(getSigningKey(), SignatureAlgorithm.HS256) // Updated usage
//                 .compact();
//     }

//     public static Claims validateToken(String token) {
//         return Jwts.parserBuilder()
//                 .setSigningKey(getSigningKey())
//                 .build()
//                 .parseClaimsJws(token)
//                 .getBody();
//     }    
// }
