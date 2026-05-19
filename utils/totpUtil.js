const speakeasy = require("speakeasy");
const qrcode = require("qrcode");

const generateQRCode = async () => {
  const { base32: secret, otpauth_url } = speakeasy.generateSecret({
    name: "GeekGorGeeks",
  });
  const data = await qrcode.toDataURL(otpauth_url);
//   console.log(secret, data);
  return {secret, data};
};
// console.log(secret,otpauth_url);

// generateQRCode();

const secretCode = "IBFCKXLNLV5TYNSPLZUSKKDUI5TSUVJYPE6EMOKCIIZS4Q3NLZTQ";

const verifyOTP = (token, secret) => {
  return speakeasy.totp.verify({
    encoding: "base32",
    secret,
    token,
  });
};

module.exports = {generateQRCode,verifyOTP}

console.log(verifyOTP(320918 ,secretCode));

