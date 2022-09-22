import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import Button from '../../components/Button';
import Timer from '../../components/reservation/Timer';
import axios from 'axios';

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
      await axios.put(`https://12-shiho-lab13.sakura.ne.jp/EXEC-API/api/reservation/checkout/${reservedInfo.id}`);
      setReservedInfo(null);
    } catch (error) {
      console.log(error.message);
    }
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
        onPress: navigation.dispatch(resetAction)
      }]);
  }

  return (
    <View style={styles.container}>
      <Timer handleCheckOut={handleCheckOut} />
      <View style={styles.checkOutButton}>
        <Button
          onPress={handleCheckOut}
          title={"チェックアウト"}
          bgColor={"#BFF205"}
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