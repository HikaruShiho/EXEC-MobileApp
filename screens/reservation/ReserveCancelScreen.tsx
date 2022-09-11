import React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import ReservationStatus from '../../components/reservation/ReservationStatus';
import Button from '../../components/Button';
import axios from 'axios';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { reservedInfoAtom } from '../../recoil/Atom';

const ReserveCancelScreen: React.FC = ({ navigation }: any) => {
  /**
   * グローバルステート
   * @const {reservedInfo} 予約中マシン情報
   */
  const reservedInfo = useRecoilValue(reservedInfoAtom);
  const setReservedInfoAtom = useSetRecoilState(reservedInfoAtom);

  /**
   * 予約を取り消す押下でアラートを表示
   */
  const confirmCancel = () => {
    Alert.alert(
      'パワーラック①',
      '上記予約を取り消しました',
      [{
        text: '確認',
        onPress: navigation.navigate('Home')
      }]);
  }

  /**
   * 予約キャンセルの処理
   * T_reservationの "is_canceled" を "1" に更新
   */
  const handleReservationCancel = async () => {
    try {
      await axios.put(`http://localhost/api/reservation/cancel/${reservedInfo.id}`);
    } catch (error) {
      console.log(error.message);
    }
    setReservedInfoAtom(null);
    confirmCancel();
  }

  return (
    <View style={styles.container}>
      <ReservationStatus
        machineId={reservedInfo ? reservedInfo.machine.id : null}
        name={reservedInfo ? reservedInfo.machine.name : null}
        image_path={reservedInfo ? reservedInfo.machine.image_path : null}
      />
      <Text style={styles.doneMessege}>上記予約を取消します。{"\n"}取消した予約は復元できません。</Text>

      <View style={styles.buttonWrap}>
        <View style={styles.button}>
          <Button
            onPress={() => navigation.navigate('Reserved')}
            title={"戻る"}
            bgColor={"#010440"}
            color={"#fff"}
          />
        </View>
        <View style={styles.button}>
          <Button
            onPress={handleReservationCancel}
            title={"予約を取り消す"}
            bgColor={"#F64E4E"}
            color={"#fff"}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
  },
  doneMessege: {
    lineHeight: 32,
    color: "#f00",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    backgroundColor: "rgba(246,78, 78, 0.3)",
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 24,
    borderRadius: 8,
    overflow: "hidden",
  },
  buttonWrap: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 24,
  },
  button: {
    width: "50%",
    paddingLeft: 6,
    paddingRight: 6,
  },
});

export default ReserveCancelScreen;