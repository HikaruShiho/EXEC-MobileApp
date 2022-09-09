/**
 * firebaseは.cjsというファイル拡張子を使用していて、expoやreact nativeではデフォルトでサポートされていません。そのため、それをパースするためにmetro.configを手動で設定する必要があります。
 * 【参考】
 * https://stackoverflow.com/questions/72179070/react-native-bundling-failure-error-message-while-trying-to-resolve-module-i
 */
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDAP1JLkU5Cj24V6P1ohQQJBEIbAV2rdUc",
    authDomain: "react-native-auth-8cfc3.firebaseapp.com",
    projectId: "react-native-auth-8cfc3",
    storageBucket: "react-native-auth-8cfc3.appspot.com",
    messagingSenderId: "277084128067",
    appId: "1:277084128067:web:60c00a94015514819f25f6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);