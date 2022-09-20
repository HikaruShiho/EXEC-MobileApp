import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Button from '../components/Button';
import * as Notifications from 'expo-notifications';

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
      <MaterialCommunityIcons
        name="human-queue"
        size={56}
        color="#010440"
        style={{ textAlign: "center" }}
      />
      <Text style={styles.titleText}>ExEc</Text>
      <View style={{ paddingTop: 32 }}>
        <Button
          onPress={() => navigation.navigate("Register")}
          title={"新規登録"}
          bgColor={"#fff"}
          color={"#010440"}
        />
      </View>
      <View style={{ paddingTop: 20 }}>
        <Button
          onPress={() => navigation.navigate("LogIn")}
          title={"ログイン"}
          bgColor={"#010440"}
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
    backgroundColor: '#BFF205',
    padding: 40,
  },
  titleText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: 8,
  },
});

export default OpeningScreen;