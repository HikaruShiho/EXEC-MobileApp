import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, KeyboardAvoidingView } from 'react-native';
import _Button from '../../components/Button';
import axios from 'axios';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import * as Location from 'expo-location';
import Loading from '../../components/Loading';
import { THEME_COLOR, ACCENT_COLOR, EXEC_API_URL } from 'react-native-dotenv';

import { createUserWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../../firebase/config';

import { useSetRecoilState } from 'recoil';
import { isLoginAtom } from '../../recoil/Atom';

const RegisterScreen: React.FC = ({ navigation }: any) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [expoPushToken, setExpoPushToken] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setIsLoginAtom = useSetRecoilState(isLoginAtom);

  useEffect(() => {
    (async () => {
      await Notifications.requestPermissionsAsync();
      let token = (await Notifications.getExpoPushTokenAsync()).data;
      setExpoPushToken(token);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('位置情報へのアクセス権が拒否されました');
        return;
      }
    })();
    registerForPushNotificationsAsync()
      .then((token) => token && setExpoPushToken(token))
      .catch((error) => console.log(error.message));
  }, []);

  /**
   * 【Firebase】ユーザー新規登録処理
   */
  const handleRegister = async () => {
    setErrorMessage("");
    setIsLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      saveUidApi(user.uid).then((response) => {
        setIsLoginAtom(response.data);
        navigation.navigate("LocationJudge");
      }).catch((error) => console.log(error.message));
    } catch (error) {
      console.log(error.code);
      setErrorMessage(translateErrorMessage(error.code));
    }
    setIsLoading(false);
  }

  /**
   * DBにuidを挿入
   * @param uid - Firebaseから発行されたID
   * @return promise
   */
  const saveUidApi = async (uid: string) => {
    try {
      return await axios.post(`${EXEC_API_URL}/user`, {
        uid: uid,
        push_token: expoPushToken
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * プッシュ通知用トークンを取得
   * @return token プッシュ通知用トークン
   */
  const registerForPushNotificationsAsync = async () => {
    let token: string;
    // 実機であるかどうかチェック
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      // 通知が許可されているかどうかをチェック
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      // 通知が許可されているかどうかをチェック
      if (finalStatus !== 'granted') {
        return;
      }
      //トークンを取得
      try {
        token = (await Notifications.getExpoPushTokenAsync()).data;
        setExpoPushToken(token);
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log('プッシュ通知は、実機端末を使用してください。');
    }
    return token;
  }

  /**
   * エラーメッセージを日本語に変換
   * @param  {message}
   * @return {errorMessage}
   */
  const translateErrorMessage = (message: string): string => {
    let japaneseMessage: string = "";
    switch (message) {
      case 'auth/invalid-email':
        japaneseMessage = "メールアドレスを正しく入力してください";
        break;
      case 'auth/email-already-exists':
        japaneseMessage = "入力したアドレスは既に使用されています";
        break;
      case 'auth/email-already-in-use':
        japaneseMessage = "入力したアドレスは既に使用されています";
        break;
      case 'auth/invalid-password':
        japaneseMessage = "パスワードは6文字以上の文字列を指定する必要があります";
        break;
      case 'auth/weak-password':
        japaneseMessage = "パスワードは6文字以上の文字列を指定する必要があります";
        break;
      case 'auth/internal-error':
        japaneseMessage = "パスワードを入力してください";
        break;
    }
    return japaneseMessage;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <Text style={styles.titleText}>新規登録</Text>
      <TextInput
        style={styles.input}
        textAlign={"left"}
        selectionColor={"#00f"}
        placeholder={"メールアドレス"}
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        textAlign={"left"}
        selectionColor={"#00f"}
        placeholder={"パスワード"}
        autoCapitalize="none"
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
      />
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      <View style={{ paddingTop: 32 }}>
        <_Button
          onPress={handleRegister}
          title={"新規登録"}
          bgColor={THEME_COLOR}
          color={"#fff"}
        />
      </View>
      <View style={styles.transitionBtn}>
        <Button
          onPress={() => navigation.navigate("LogIn")}
          title="ログイン"
          color={THEME_COLOR}
        />
      </View>
      {isLoading && <Loading pattern={"default"} />}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: ACCENT_COLOR,
    padding: 40,
  },
  transitionBtn: {
    fontWeight: "bold",
    position: "absolute",
    top: 20,
    right: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: 18,
    marginTop: 20,
  },
  errorMessage: {
    color: '#f00',
    paddingTop: 32,
    fontSize: 14,
    fontWeight: "bold"
  },
});

export default RegisterScreen;