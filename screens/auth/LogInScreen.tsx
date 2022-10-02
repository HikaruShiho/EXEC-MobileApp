import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, KeyboardAvoidingView } from 'react-native';
import _Button from '../../components/Button';
import Loading from '../../components/Loading';
import axios from 'axios';
import { THEME_COLOR, ACCENT_COLOR, EXEC_API_URL } from 'react-native-dotenv';

import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../../firebase/config';

import { useSetRecoilState } from 'recoil';
import { isLoginAtom } from '../../recoil/Atom';

const LogInScreen: React.FC = ({ navigation }: any) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setIsLoginAtom = useSetRecoilState(isLoginAtom);

  /**
   * Firebaseログインの処理
   */
  const handleLogin = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      getLoginUserAsync(user.uid).then((data) => {
        if (data.uid === user.uid) {
          setIsLoginAtom(data);
          navigation.navigate("LocationJudge");
        }
      }).catch((error) => console.log(error.message));
    } catch (error) {
      console.log(error.message);
      setErrorMessage(translateErrorMessage(error.code));
    }
  };

  /**
   * 本人確認処理 - FirebaseのuidとDBのuidが同一であればホーム画面に遷移
   * @param  uid Firebaseから取得したuid
   * @return promise
   */
  const getLoginUserAsync = async (uid: string) => {
    try {
      const { data } = await axios.get(`${EXEC_API_URL}/user/${uid}`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

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
      case 'auth/internal-error':
        japaneseMessage = "パスワードを入力してください";
        break;
      case 'auth/wrong-password':
        japaneseMessage = "パスワードを正しく入力してください";
        break;
      case 'auth/user-not-found':
        japaneseMessage = "ユーザーが見つかりません\nメールアドレス、パスワードを確認してください";
        break;
    }
    return japaneseMessage;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <Text style={styles.titleText}>ログイン</Text>
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
          onPress={handleLogin}
          title={"ログイン"}
          bgColor={THEME_COLOR}
          color={"#fff"}
        />
      </View>
      <View style={styles.transitionBtn}>
        <Button
          onPress={() => navigation.navigate("Register")}
          title="新規登録"
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

export default LogInScreen;