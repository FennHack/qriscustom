import crypto from "crypto";

export function verifySignature(body, signature, publicKey) {

  const verifier = crypto.createVerify("RSA-SHA256");
  verifier.update(body);

  return verifier.verify(publicKey, signature, "base64");
}
