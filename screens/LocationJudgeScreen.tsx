import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import Button from '../components/Button';
import axios from 'axios';
import * as Location from 'expo-location';
import Loading from '../components/Loading';
import * as Notifications from 'expo-notifications';

import { useSetRecoilState } from 'recoil';
import { currentGymAtom } from '../recoil/Atom';


type GymData = {
  id: number;
  name: string;
  lat: number;
  long: number;
}

type currentLocationData = {
  latitude: number;
  longitude: number;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const LocationJudgeScreen: React.FC = ({ navigation }: any) => {
  const setCurrentGymAtom = useSetRecoilState(currentGymAtom);
  const [searchWord, setSearchWord] = useState<string>("");
  const [gyms, setGyms] = useState<GymData[]>([]);
  const [currentLocation, setCurrentLocation] = useState<currentLocationData>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * 位置情報の権限を許可するかポップアップを表示
   * 現在地の緯度経度を取得しステートに保存
   * DBに登録しているジムデータを取得
   */
  useEffect(() => {
    setIsLoading(true);
    getAllGymAsnc();
    getCurrentLocationAsync();
  }, []);


  /**
   * 全てのジム情報を取得
   */
  const getAllGymAsnc = async () => {
    try {
      const { data } = await axios.get(`https://12-shiho-lab13.sakura.ne.jp/EXEC-API/api/gym`);
      setGyms(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * 現在地の緯度経度を取得しステートに保存
   */
  const getCurrentLocationAsync = async () => {
    try {
      const { coords } = await Location.getCurrentPositionAsync({});
      setCurrentLocation(coords);
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
  }

  /**
   * 店舗一覧ボタンを押下時の処理
   * @param i MachineData[]のインデックス番号
   */
  const handleCurrentGym = (i: number): void => {
    const distance = calcDistance(currentLocation.latitude, currentLocation.longitude, gyms[i].lat, gyms[i].long);
    if (distance <= 300) {
      Alert.alert(
        gyms[i].name,
        'トレーニング頑張りましょう！！',
        [{
          text: '確認',
          onPress: () => {
            setCurrentGymAtom(gyms[i]);
          }
        }]
      );
    } else {
      Alert.alert(
        '入店エラー',
        '選択した店舗との距離が離れ過ぎています。再度、店舗を選択してください。',
        [{ text: '確認' }]
      );
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <Text style={styles.titleText}>入店している施設を検索後{"\n"}選択してください。</Text>
      <TextInput
        style={styles.input}
        textAlign={"left"}
        selectionColor={"#00f"}
        placeholder={"店舗名を検索（例：池袋店）"}
        autoCapitalize="none"
        onChangeText={setSearchWord}
        value={searchWord}
      />
      <ScrollView style={{ paddingTop: 20 }}>
        {gyms.map((gym, i) => (
          <View style={{ paddingTop: 16 }} key={i}>
            <Button
              onPress={() => handleCurrentGym(i)}
              title={gym.name}
              bgColor={"#010440"}
              color={"#fff"}
            />
          </View>
        ))}
      </ScrollView>
      {isLoading && <Loading />}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    backgroundColor: '#BFF205',
    padding: 40,
    position: "absolute",
    zIndex: 2
  },
  titleText: {
    textAlign: "center",
    fontSize: 20,
    lineHeight: 32,
    fontWeight: "bold",
    paddingTop: 16,
  },
  input: {
    backgroundColor: '#fff',
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 8,
    fontSize: 20,
    marginTop: 32,
  },
});

export default LocationJudgeScreen;