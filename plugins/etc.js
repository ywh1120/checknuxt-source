import crypto from 'crypto';
import Vue from 'vue' 
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
  appId: process.env.FIREBASE_APPID 
};
    
const app = initializeApp(firebaseConfig);
Vue.prototype.$db = getFirestore(app);
Vue.prototype.$auth = getAuth(app);
Vue.prototype.$encryptstr = (string) =>{
  const iv = Buffer.alloc(16,0); // 16비트
  const cipher = crypto.createCipheriv('aes-256-cbc',process.env.CIPHER_KEY,iv);
  let result = cipher.update(string, 'utf8','base64');
  result += cipher.final('base64');
  return result;
}
Vue.prototype.$decryptstr = (string) =>{
  const iv = Buffer.alloc(16,0); // 16비트
  const cipher = crypto.createDecipheriv('aes-256-cbc',process.env.CIPHER_KEY,iv);
  let result = cipher.update(string, 'base64','utf8');
  result += cipher.final('utf8');
  return result;
}