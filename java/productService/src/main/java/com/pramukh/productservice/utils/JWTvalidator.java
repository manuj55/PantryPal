package com.pramukh.productservice.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.client.RestTemplate;
import java.security.KeyFactory;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

public class JWTvalidator {

    public static DecodedJWT validate(String token) throws Exception {
        System.out.println("Entered Validator");
        try {
            DecodedJWT jwt = JWT.decode(token);
            System.out.println(jwt);
            String jku = jwt.getHeaderClaim("jku").asString();
            String kid = jwt.getKeyId();
            String alg = jwt.getAlgorithm();
            System.out.println(jku);
            System.out.println(kid);
            System.out.println(alg);

            if (jku == null || kid == null) {
                throw new Exception("Invalid token");
            }
            if (!alg.equals("RS256")) {
                throw new Exception("Invalid algorithm");
            }

            JsonNode keys = fetchKeys(jku);
            System.out.println(keys);
            RSAPublicKey publicKey = getPublicKeyPem(keys, kid);
            System.out.println(publicKey);

            Algorithm algorithm = Algorithm.RSA256(publicKey, null);
            JWTVerifier verifier = JWT.require(algorithm).build();
            verifier.verify(jwt);
            return jwt;

        } catch (Exception e) {
            throw new RuntimeException("Jwt Validation Error " + e.getMessage());
        }
    }

    private static RSAPublicKey getPublicKeyPem(JsonNode keys, String kid) throws Exception {
        for (JsonNode key : keys) {
            if (kid.equals(key.get("kid").asText())) {
                try {
                    String base64X509 = key.get("n").asText().replace("\r", "").replace("\n", "").trim();
                    byte[] derBytes = Base64.getDecoder().decode(base64X509);
                    X509EncodedKeySpec keySpec = new X509EncodedKeySpec(derBytes);
                    KeyFactory keyfactory = KeyFactory.getInstance("RSA");
                    RSAPublicKey publicKey = (RSAPublicKey) keyfactory.generatePublic(keySpec);
                    return publicKey;

                } catch (Exception ex) {
                    throw new Exception("Failed to generate RSAPublicKey", ex);
                }
            }
        }
        throw new Exception("Unable to find a signing key that matches the 'kid'");
    }

    private static JsonNode fetchKeys(String jku) throws Exception {
        RestTemplate restTemplate = new RestTemplate();
        String keys = restTemplate.getForObject(jku, String.class);
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(keys);
        return jsonNode.get("keys");
    }
}
