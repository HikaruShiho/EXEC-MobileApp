import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Button from '../../components/Button';
import axios from 'axios';
import * as Notifications from 'expo-notifications';
import { THEME_COLOR, ACCENT_COLOR, EXEC_API_URL } from 'react-native-dotenv';

import { useRecoilValue } from 'recoil';
import { isLoginAtom, reservedInfoAtom } from '../../recoil/Atom';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const ReserveDoneScreen: React.FC = ({ navigation }: any) => {
  const reservedInfo = useRecoilValue(reservedInfoAtom);
  const loginState = useRecoilValue(isLoginAtom);

  useEffect(() => {
    previousReservationCountAsync()
      .then(response => {
        response.data === 0 && sendPushNotification();
      })
      .catch(e => console.log(e.message));
  });

  /**
   * 待ちがあるか確認
   * @return promise - reservationテーブルのレコード数
   */
  const previousReservationCountAsync = async () => {
    try {
      return await axios.get(`${EXEC_API_URL}/reservation/previous_reservation_count/${reservedInfo.id}/${reservedInfo.gym_id}/${reservedInfo.machine.id}`);
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * プッシュ通知送信
   */
  const sendPushNotification = async () => {
    const message = {
      to: loginState.push_token,
      title: "マシン利用開始",
      subtitle: "5分以内にチェックインしてください",
      body: "",
      sound: 'default'
    };
    try {
      await fetch(`https://exp.host/--/api/v2/push/send`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <FontAwesome
        name="check-circle"
        size={72}
        color={ACCENT_COLOR}
        style={styles.iconCheck}
      />
      <Text style={styles.iconCheckText}>予約完了</Text>
      <Text style={styles.doneMessege}>ご予約を受付けました。{"\n"}利用開始5分前になりましたら{"\n"}通知が送信されます。</Text>
      <View style={{ paddingTop: 32 }}>
        <Button
          onPress={() => navigation.navigate('Home')}
          title={"ホームに戻る"}
          bgColor={THEME_COLOR}
          color={"#fff"}
        />
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: '#fff',
    padding: 12,
  },
  iconCheck: {
    textAlign: "center",
  },
  iconCheckText: {
    fontSize: 20,
    color: "#2D3340",
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 8,
  },
  doneMessege: {
    lineHeight: 32,
    color: "#2D3340",
    fontSize: 16,
    textAlign: "center",
    backgroundColor: "rgba(191,242, 5, 0.3)",
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 24,
    borderRadius: 8,
    overflow: "hidden",
  },
});

export default ReserveDoneScreen;