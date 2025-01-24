// package com.ems.ems_server.Utility;
// import org.springframework.stereotype.Service;
// import io.jsonwebtoken.Claims;
// @Service
// public class DecodeToken {
//     public static String getInfo(String token){
//         try {
//             Claims claims = Jwt.validateToken(token);
//             return claims.getSubject();
//         }
//         catch(Exception e){
//             throw new IllegalArgumentException("Invalid token");
//         }
//     }
// }
