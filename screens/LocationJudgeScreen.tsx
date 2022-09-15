import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import Button from '../components/Button';
import axios from 'axios';

import { useSetRecoilState } from 'recoil';
import { currentGymAtom } from '../recoil/Atom';

type GymData = {
  id: number;
  name: string;
  post_code: string;
  prefecture_id: number;
  city: string;
  block: string;
  building: string;
  lat: number;
  long: number;
  created_at: string;
  updated_at: string;
  prefecture: {
    id: number;
    name: string;
  };
}

const LocationJudgeScreen: React.FC = ({ navigation }: any) => {
  const [searchWord, setSearchWord] = useState<string>("");
  const [gyms, setGyms] = useState<GymData[]>([]);
  const setCurrentGymAtom = useSetRecoilState(currentGymAtom);

  /**
   * 登録している全ジムデータを取得
   */
  useEffect(() => {
    getGymAll();
  }, []);

  const getGymAll = async () => {
    try {
      const { data } = await axios.get(`http://localhost/api/gym`);
      setGyms(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * 店舗一覧ボタンを押下時の処理
   * @param i MachineData[]のインデックス番号
   */
  const handleCurrentGym = (i: number): void => {
    setCurrentGymAtom(gyms[i]);
    navigation.navigate("Home");
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
    </KeyboardAvoidingView>
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