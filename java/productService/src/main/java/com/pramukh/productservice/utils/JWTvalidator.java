package com.pramukh.productservice.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.client.RestTemplate;
import java.security.KeyFactory;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

@Slf4j
public class JWTvalidator {

    public static DecodedJWT validate(String token) throws Exception {
        System.out.println("Entered Validator");
        try {
            // Decode the token
            DecodedJWT jwt = JWT.decode(token);
            System.out.println(jwt);
            String jku = jwt.getHeaderClaim("jku").asString();
            String kid = jwt.getKeyId();
            String alg = jwt.getAlgorithm();
            System.out.println(jku);
            System.out.println(kid);
            System.out.println(alg);

            // Check if the token has the required fields
            if (jku == null || kid == null) {
                throw new Exception("Invalid token");
            }
            if (!alg.equals("RS256")) {
                throw new Exception("Invalid algorithm");
            }
            // Fetch the keys from the jku endpoint
            JsonNode keys = fetchKeys(jku);
            System.out.println(keys);
            RSAPublicKey publicKey = getPublicKeyPem(keys, kid);
            // Verify the token
            Algorithm algorithm = Algorithm.RSA256(publicKey, null);
            JWTVerifier verifier = JWT.require(algorithm).build();
            verifier.verify(jwt);
            return jwt;

        } catch (Exception e) {
            log.error("Error validating JWT");
            throw new RuntimeException("Jwt Validation Error " + e.getMessage());
        }
    }

    // Get the public key from the keys fetched from the jku endpoint
    private static RSAPublicKey getPublicKeyPem(JsonNode keys, String kid) throws Exception {
        for (JsonNode key : keys) {
            if (kid.equals(key.get("kid").asText())) {
                try {
                    String base64X509 = key.get("n").asText().replace("\r", "").replace("\n", "").trim();
                    byte[] derBytes = Base64.getDecoder().decode(base64X509);
                    X509EncodedKeySpec keySpec = new X509EncodedKeySpec(derBytes);
                    KeyFactory keyfactory = KeyFactory.getInstance("RSA");
                    RSAPublicKey publicKey = (RSAPublicKey) keyfactory.generatePublic(keySpec);
                    System.out.println(publicKey);
                    return publicKey;

                } catch (Exception ex) {
                    log.error("Error generating RSAPublicKey");
                    throw new Exception("Failed to generate RSAPublicKey", ex);
                }
            }
        }
        throw new Exception("Unable to find a signing key that matches the 'kid'");
    }

    // Fetch the keys from the jku endpoint
    private static JsonNode fetchKeys(String jku) throws Exception {
        System.out.println("Entered fetchKeys before fetch keys");

       RestTemplate restTemplate = new RestTemplate();
        System.out.println("before passing it to restTemplate");
        try {
            String keys = restTemplate.getForObject(jku, String.class);
            System.out.println("keys" + keys);
            System.out.println("keys"+keys);
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(keys);
            return jsonNode.get("keys");
        } catch (Exception e) {
            log.error("Error fetching keys from ");
            System.err.println("Error fetching keys from " + jku);
            e.printStackTrace();
            throw new Exception("Failed to fetch keys", e);
        }

    }
}
