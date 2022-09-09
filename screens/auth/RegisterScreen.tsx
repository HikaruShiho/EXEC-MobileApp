import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, KeyboardAvoidingView } from 'react-native';
import _Button from '../../components/Button';

import { createUserWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../../firebase/config';

import { useSetRecoilState } from 'recoil';
import { isLoginAtom } from '../../recoil/Atom';
import React from 'react';

const RegisterScreen: React.FC = ({ navigation }: any) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const setIsLoginAtom = useSetRecoilState(isLoginAtom);

  /**
   * 【Firebase】ユーザー新規登録処理
   * @return {void}
   * @constant {userCredential = Firebase auth object}
   */
  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setIsLoginAtom(userCredential.user);
      navigation.navigate("LocationJudge");
    } catch (error) {
      console.log(error.message);
    }
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
      <View style={{ paddingTop: 32 }}>
        <_Button
          onPress={handleRegister}
          title={"新規登録"}
          bgColor={"#010440"}
          color={"#fff"}
        />
      </View>
      <View style={styles.transitionBtn}>
        <Button
          onPress={() => navigation.navigate("LogIn")}
          title="ログイン"
          color={"#010440"}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: '#BFF205',
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
});

export default RegisterScreen;