import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
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
    console.log("ssssss");
    getMachineAllAsync();
    getReservedAsync();
  }, []);

  /**
   * 入店しているジムのマシンを取得
   */
  const getMachineAllAsync = async () => {
    try {
      const { data } = await axios.get(`http://localhost/api/gym/${currentGym.id}`);
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
      const { data } = await axios.get(`http://localhost/api/reservation/${1}/${currentGym.id}`);
      setReservedInfoAtom(data ? data : null);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <ScrollView style={styles.container}>
      {/* <Button
        title='3秒後にプッシュ通知する'
        onPress={scheduleNotificationAsync}
      /> */}
      {reservedInfo &&
        <ReservedMachine onPress={() => navigation.navigate('ReservedStack')} />
      }
      <View style={styles.listMachineWrap}>
        {machines.map((machine) => (
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




  // useEffect(() => {
  //   const status = Notifications.getPermissionsAsync();

  //   console.log(requestPermissionsAsync());
  // });

/**
 * 通知の権限を許可するホップアップを表示
 * @return {void}
 * @constant {settings} boolean
 */
  // const requestPermissionsAsync = async () => {
  //   const settings = await Notifications.getPermissionsAsync();
  //   console.log(settings.granted, settings.ios?.status, Notifications.IosAuthorizationStatus.PROVISIONAL);
  //   return (
  //     settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  //   );
  // }

  // const scheduleNotificationAsync = async () => {
  //   await Notifications.scheduleNotificationAsync({
  //     content: {
  //       body: 'test'
  //     },
  //     trigger: {
  //       seconds: 3,
  //     }
  //   })
  // }