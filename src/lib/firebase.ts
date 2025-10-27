import { initializeApp, getApp, getApps } from 'firebase/app';

const firebaseConfig = {
  "projectId": "studio-4734771129-21aaa",
  "appId": "1:63943109933:web:758b9cef91aefd474d37a4",
  "apiKey": "AIzaSyA3CrnUQRs476SprqjPcbqGzVcLMnomWRc",
  "authDomain": "studio-4734771129-21aaa.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "63943109933"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export { app };
