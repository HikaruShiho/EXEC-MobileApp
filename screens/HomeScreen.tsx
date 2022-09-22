import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Button } from 'react-native';
import MachineCard from '../components/reservation/MachineCard';
import ReservedMachine from '../components/reservation/ReservedMachine';
import Loading from '../components/Loading';
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log(loginState);
  console.log(currentGym);
  console.log(reservedInfo);

  useEffect(() => {
    setIsLoading(true);
    getMachineAllAsync();
    getReservedAsync();
    setTimeout(() => setIsLoading(false), 2000)
  }, []);

  /**
   * 通知をタップしたときの処理
   */
  Notifications.addNotificationResponseReceivedListener((response) => {
    navigation.navigate("ReservedStack");
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

  return (
    <View style={styles.container}>
      <ScrollView>
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
      {isLoading && <Loading pattern={"default"} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listMachineWrap: {
    padding: 12,
  },
});

export default HomeScreen;