import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, ScrollView, Text, Button } from 'react-native';
import MachineCard from '../components/reservation/MachineCard';
import ReservedMachine from '../components/reservation/ReservedMachine';
import axios from 'axios';
import * as Notifications from 'expo-notifications';

import { useRecoilState, useRecoilValue } from 'recoil';
import { isLoginAtom, currentGymAtom, reservedInfoAtom } from '../recoil/Atom';


type MachineData = {
  id: number;
  name: string;
  image_path: string;
}

const HomeScreen: React.FC = ({ navigation }: any) => {
  const loginState = useRecoilValue(isLoginAtom);
  const currentGym = useRecoilValue(currentGymAtom);
  const [reservedInfo, setReservedInfoAtom] = useRecoilState(reservedInfoAtom);
  const [machines, setMachines] = useState<MachineData[]>([]);

  useEffect(() => {
    getMachineAllAsync();
    getReservedAsync();
  }, []);

  Notifications.addNotificationResponseReceivedListener((response) => {
    navigation.navigate("ReservedStack");
    console.log(response);
  });

  /**
   * 入店しているジムのマシンを取得
   */
  const getMachineAllAsync = async () => {
    try {
      const { data } = await axios.get(`https://12-shiho-lab13.sakura.ne.jp/EXEC-API/api/gym/${currentGym.id}`);
      setMachines(data.machines);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  /**
   * 現在予約中のマシンを取得
   */
  const getReservedAsync = async () => {
    try {
      const { data } = await axios.get(`https://12-shiho-lab13.sakura.ne.jp/EXEC-API/api/reservation/${1}/${currentGym.id}`);
      setReservedInfoAtom(data ? data : null);
    } catch (error) {
      console.log(error.message);
    }
  }

  const sendPushNotification = async () => {
    const message = {
      to: "ExponentPushToken[opXBVGPuAeVjm5O07purhw]",
      title: "おはようさん",
      subtitle: "あああああああああああああ",
      body: "通知ですよ",
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
    <ScrollView style={styles.container}>
      <Button title="押してみ" onPress={sendPushNotification} />
      <Button title="バッジ消す" onPress={sendPushNotification} />
      {reservedInfo &&
        <ReservedMachine onPress={() => navigation.navigate('ReservedStack')} />
      }
      <View style={styles.listMachineWrap}>
        {machines?.map((machine) => (
          <MachineCard
            onPress={() => navigation.navigate('ReserveCheck', {
              machineId: machine.id,
              name: machine.name,
              image_path: machine.image_path,
            })}
            key={machine.id}
            machine={machine}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  listMachineWrap: {
    padding: 12,
  },
});

export default HomeScreen;