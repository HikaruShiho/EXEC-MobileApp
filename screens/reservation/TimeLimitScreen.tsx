import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import Button from '../../components/Button';
import Timer from '../../components/reservation/Timer';
import axios from 'axios';
import { ACCENT_COLOR, EXEC_API_URL } from 'react-native-dotenv';

import { useRecoilState } from 'recoil';
import { reservedInfoAtom } from '../../recoil/Atom';
import { CommonActions } from '@react-navigation/native';

const TimeLimitScreen: React.FC = ({ navigation }: any) => {
  const [reservedInfo, setReservedInfo] = useRecoilState(reservedInfoAtom);

  /**
   * チェックアウトの処理
   */
  const handleCheckOut = async () => {
    try {
      await axios.put(`${EXEC_API_URL}/reservation/checkout/${reservedInfo.id}`);
    } catch (error) {
      console.log(error.message);
    }
    sendPushNotification();
    confirmCheckOut();
  }

  /**
   * チェックアウトの確認をアラート表示
   */
  const confirmCheckOut = (): void => {
    const resetAction = CommonActions.reset({
      index: 1,
      routes: [
        { name: 'HomeStack' }
      ]
    });
    Alert.alert(
      `チェックアウト完了`,
      'ご利用ありがとうございました',
      [{
        text: 'OK',
        onPress: () => {
          setReservedInfo(null);
          navigation.dispatch(resetAction);
        }
      }]);
  }


  /**
   * 次の予約者にプッシュ通知送信
   */
  const sendPushNotification = async () => {
    const { data } = await axios.get(`${EXEC_API_URL}/reservation/next_reservation_exists/${reservedInfo.id}/${reservedInfo.gym_id}/${reservedInfo.machine_id}`);
    const message = {
      to: data.user.push_token,
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
      <Timer handleCheckOut={handleCheckOut} />
      <View style={styles.checkOutButton}>
        <Button
          onPress={handleCheckOut}
          title={"チェックアウト"}
          bgColor={ACCENT_COLOR}
          color={"#010440"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 40,
  },
  checkOutButton: {
    width: "100%",
    paddingTop: 40,
  },
});

export default TimeLimitScreen;