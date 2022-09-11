import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ReservationStatus from '../../components/reservation/ReservationStatus';
import Button from '../../components/Button';
import axios from 'axios';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentGymAtom, reservedInfoAtom } from '../../recoil/Atom';

/**
 * @param {object} route.params - machineId, name, image_path
 */
const ReserveCheckScreen: React.FC = ({ route, navigation }: any) => {
  /**
   * グローバルステート
   * @const {currentGym} 入店中ジム情報
   */
  const currentGym = useRecoilValue(currentGymAtom);
  const setReservedInfo = useSetRecoilState(reservedInfoAtom);

  /**
   * reservationテーブルにデータを追加
   */
  const reservationAsync = async () => {
    try {
      const { data } = await axios.post('http://localhost/api/reservation', {
        user_id: 1,
        gym_id: currentGym.id,
        machine_id: route.params.machineId,
      });
      console.log(data);

      setReservedInfo(data);
    } catch (error) {
      console.log(error.message);
    }
    navigation.navigate('ReserveDone');
  }

  return (
    <View style={styles.container}>
      <ReservationStatus
        machineId={route.params.machineId}
        name={route.params.name}
        image_path={route.params.image_path}
      />
      <View style={styles.cationWrap}>
        <View style={styles.cationHead}>
          <FontAwesome name="exclamation-circle" size={22} color="#fff" />
          <Text style={styles.cationTitle}>注意事項</Text>
        </View>
        <View style={styles.cationBody}>
          <Text style={styles.cationText}>・ここに入ります</Text>
          <Text style={styles.cationText}>・ここに入ります</Text>
          <Text style={styles.cationText}>・ここに入ります</Text>
          <Text style={styles.cationText}>・ここに入ります</Text>
        </View>
      </View>
      <View style={{ paddingTop: 24 }}>
        <Button
          onPress={reservationAsync}
          title={"予約を確定する"}
          bgColor={"#BFF205"}
          color={"#010440"}
        />
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
  },
  cationWrap: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#010440",
    marginTop: 16,
  },
  cationHead: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#010440",
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
  },
  cationTitle: {
    width: "100%",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 8,
  },
  cationBody: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 8,
    paddingRight: 8,
  },
  cationText: {
    paddingTop: 4,
    paddingBottom: 4,
  },
});

export default ReserveCheckScreen;