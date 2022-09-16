/**
 * firebaseは.cjsというファイル拡張子を使用していて、expoやreact nativeではデフォルトでサポートされていません。そのため、それをパースするためにmetro.configを手動で設定する必要があります。
 * 【参考】
 * https://stackoverflow.com/questions/72179070/react-native-bundling-failure-error-message-while-trying-to-resolve-module-i
 */
import { API_KEY, AUTH_DMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } from 'react-native-dotenv';
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);