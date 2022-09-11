import React from 'react';
import { StyleSheet, View } from 'react-native';
import ReservationStatus from '../../components/reservation/ReservationStatus';
import Button from '../../components/Button';
import axios from 'axios';

import { useRecoilValue } from 'recoil';
import { reservedInfoAtom } from '../../recoil/Atom';

const ReservedScreen: React.FC = ({ navigation }: any) => {
  /**
   * グローバルステート
   * @const {reservedInfo} 予約中マシン情報
   */
  const reservedInfo = useRecoilValue(reservedInfoAtom);

  /**
   * チェックインの処理
   */
  const handleCheckIn = async () => {
    try {
      await axios.put(`http://localhost/api/reservation/checkin/${reservedInfo.id}`);
      navigation.navigate('TimeLimit')
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <View style={styles.container}>
      <ReservationStatus
        machineId={reservedInfo ? reservedInfo.machine.id : null}
        name={reservedInfo ? reservedInfo.machine.name : null}
        image_path={reservedInfo ? reservedInfo.machine.image_path: null}
      />
      <View style={styles.buttonWrap}>
        <View style={styles.checkInButton}>
          <Button
            onPress={handleCheckIn}
            title={"チェックイン"}
            bgColor={"#BFF205"}
            color={"#010440"}
          />
        </View>
        <View style={styles.button}>
          <Button
            onPress={() => navigation.navigate('Home')}
            title={"戻る"}
            bgColor={"#010440"}
            color={"#fff"}
          />
        </View>
        <View style={styles.button}>
          <Button
            onPress={() => navigation.navigate('ReserveCancel')}
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
  buttonWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingTop: 24,
  },
  checkInButton: {
    width: "100%",
    padding: 6
  },
  button: {
    width: "50%",
    padding: 6
  },
});

export default ReservedScreen;