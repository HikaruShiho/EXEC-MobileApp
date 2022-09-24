import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Button from '../components/Button';
import * as Notifications from 'expo-notifications';
import { THEME_COLOR, ACCENT_COLOR } from 'react-native-dotenv';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const OpeningScreen: React.FC = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Image
          style={{ width: 149, height: 40 }}
          source={require('../assets/logo.png')}
        />
      </View>
      <View style={{ paddingTop: 40 }}>
        <Button
          onPress={() => navigation.navigate("Register")}
          title={"新規登録"}
          bgColor={"#fff"}
          color={THEME_COLOR}
        />
      </View>
      <View style={{ paddingTop: 24 }}>
        <Button
          onPress={() => navigation.navigate("LogIn")}
          title={"ログイン"}
          bgColor={THEME_COLOR}
          color={"#fff"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: ACCENT_COLOR,
    padding: 40,
  },
});

export default OpeningScreen;