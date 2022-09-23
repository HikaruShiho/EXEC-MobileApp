import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import ReservationStatus from '../../components/reservation/ReservationStatus';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import Cautions from '../../components/Cations';
import axios from 'axios';
import * as Location from 'expo-location';
import { THEME_COLOR, ACCENT_COLOR, EXEC_API_URL } from 'react-native-dotenv';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentGymAtom, isLoginAtom, reservedInfoAtom } from '../../recoil/Atom';

/**
 * @param route.params - machineId, name, image_path
 */
const ReserveCheckScreen: React.FC = ({ route, navigation }: any) => {
  const currentGym = useRecoilValue(currentGymAtom);
  const reservedInfo = useRecoilValue(reservedInfoAtom);
  const isLogin = useRecoilValue(isLoginAtom);
  const setReservedInfo = useSetRecoilState(reservedInfoAtom);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * reservationテーブルにデータを追加
   */
  const reservationAsync = async () => {
    try {
      const { data } = await axios.post(`${EXEC_API_URL}/reservation`, {
        user_id: isLogin.id,
        gym_id: currentGym.id,
        machine_id: route.params.machineId,
      });
      setReservedInfo(data);
      navigation.navigate('ReserveDone');
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
  }

  /**
   * 現在地の緯度経度を取得し、距離によって処理を実行
   */
  const getCurrentLocationAsync = async () => {
    setIsLoading(true);
    try {
      const { coords } = await Location.getCurrentPositionAsync({});
      const distance = calcDistance(coords.latitude, coords.longitude, currentGym.lat, currentGym.long);
      if (distance <= 300 && reservedInfo === null) {
        reservationAsync();
      } else if (distance >= 300) {
        Alert.alert(
          '入店エラー',
          '再度、店舗を選択してください。',
          [{
            text: '確認',
            onPress: () => {
              setIsLoading(false);
              navigation.navigate("LocationJudge");
            }
          }]
        );
      } else {
        Alert.alert(
          '予約できません',
          '現在、予約しているマシンがあります。\n新しく予約を取得する場合は、\n既存の予約をキャンセルしてください。',
          [{
            text: '閉じる',
            onPress: () => {
              setIsLoading(false);
              navigation.navigate("Home");
            }
          }]
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
      <Cautions />
      <View style={{ paddingTop: 24 }}>
        <Button
          onPress={getCurrentLocationAsync}
          title={"予約を確定する"}
          bgColor={ACCENT_COLOR}
          color={THEME_COLOR}
        />
      </View>
      {isLoading && <Loading />}
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
  },
});

export default ReserveCheckScreen;