import { useState } from 'react';
import { StyleSheet, View, ScrollView, Button } from 'react-native';
import MachineCard from '../components/reservation/MachineCard';
import ReservedMachine from '../components/reservation/ReservedMachine';
import * as Notifications from 'expo-notifications';

import { useRecoilValue } from 'recoil';
import { isLoginAtom } from '../recoil/Atom';
import { useEffect } from 'react';

const HomeScreen = ({ navigation }) => {


  useEffect(() => {
    const status = Notifications.getPermissionsAsync();

    console.log(requestPermissionsAsync());
  });



  /**
   * 通知の権限を許可するホップアップを表示
   * @return {void}
   * @constant {settings} boolean
   */
  const requestPermissionsAsync = async () => {
    const settings = await Notifications.getPermissionsAsync();
    console.log(settings.granted, settings.ios?.status, Notifications.IosAuthorizationStatus.PROVISIONAL);
    return (
      settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
    );
  }

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





  const loginState = useRecoilValue(isLoginAtom);
  const [isReservation, setIsReservation] = useState<Boolean>(true);

  return (
    <ScrollView style={styles.container}>
      {/* <Button
        title='3秒後にプッシュ通知する'
        onPress={scheduleNotificationAsync}
      /> */}
      {isReservation && <ReservedMachine onPress={() => navigation.navigate('Reserved')} />}
      <View style={styles.listMachineWrap}>
        <MachineCard onPress={() => navigation.navigate('ReserveCheck')} />
        <MachineCard onPress={() => navigation.navigate('ReserveCheck')} />
        <MachineCard onPress={() => navigation.navigate('ReserveCheck')} />
        <MachineCard onPress={() => navigation.navigate('ReserveCheck')} />
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