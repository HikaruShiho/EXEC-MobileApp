import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ReservationStatus from '../../components/reservation/ReservationStatus';
import Button from '../../components/Button';
import axios from 'axios';
import * as Location from 'expo-location';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentGymAtom, reservedInfoAtom } from '../../recoil/Atom';
import ReservedStack from '../../navigation/stack/ReservedStack';

/**
 * @param route.params - machineId, name, image_path
 */
const ReserveCheckScreen: React.FC = ({ route, navigation }: any) => {
  const currentGym = useRecoilValue(currentGymAtom);
  const reservedInfo = useRecoilValue(reservedInfoAtom);
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
      setReservedInfo(data);
      navigation.navigate('ReserveDone');
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * 現在地の緯度経度を取得し、距離によって処理を実行
   */
  const getCurrentLocationAsync = async () => {
    try {
      const { coords } = await Location.getCurrentPositionAsync({});
      const distance = calcDistance(coords.latitude, coords.longitude, currentGym.lat, currentGym.long);
      if (distance <= 300 && reservedInfo === null) {
        reservationAsync();
      } else if (distance >= 300) {
        Alert.alert(
          '入店エラー',
          '選択した店舗との距離が離れ過ぎています。\n再度、店舗を選択してください。',
          [{
            text: '確認',
            onPress: () => navigation.navigate("LocationJudge")
          }]
        );
      } else {
        Alert.alert(
          '予約できません',
          '現在、予約しているマシンがあります。\n新しく予約を取得する場合は、既存の予約をキャンセルしてください。',
          [{ text: '閉じる' }]
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * 現在地とジムの距離を算出
   * @param  myLat   現在地の緯度
   * @param  myLong  現在地の経度
   * @param  gymLat  選択した店舗の緯度
   * @param  gymLong 選択した店舗の経度
   * @return number 距離（m）
   */
  const calcDistance = (myLat: number, myLong: number, gymLat: number, gymLong: number): number => {
    const R = Math.PI / 180;
    myLat *= R;
    myLong *= R;
    gymLat *= R;
    gymLong *= R;
    return (6371 * Math.acos(Math.cos(myLat) * Math.cos(gymLat) * Math.cos(gymLong - myLong) + Math.sin(myLat) * Math.sin(gymLat))) * 1000;
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
          onPress={getCurrentLocationAsync}
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