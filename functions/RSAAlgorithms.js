import {AppExports} from '../config/config';
import { Crypt, RSA } from 'hybrid-crypto-js';

const publicKey = AppExports[1].publicKey;
const privateKey = AppExports[1].privateKey;
var entropy = 'Random string, integer or float';
var crypt = new Crypt({
  aesStandard: 'AES-CBC',
  rsaStandard: 'RSA-OAEP',
});
var rsa = new RSA();
const RSAEncrypt = (message)=>{
    var encrypted = crypt.encrypt(publicKey, message);
    return encrypted;
}
const RSADecrypt = (encrypted)=>{
    var decrypted = crypt.decrypt(privateKey, encrypted);
    return decrypted;
}

export {RSAEncrypt,RSADecrypt};