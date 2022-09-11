import { StyleSheet, View, Text } from 'react-native';
import ReservationStatus from '../../components/reservation/ReservationStatus';
import Button from '../../components/Button';
import axios from 'axios';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isLoginAtom, currentGymAtom } from '../../recoil/Atom';

const ReservedScreen = ({ route, navigation }) => {
  const { machine, id } = route.params.reservedInfo;

  /**
   * チェックインの処理
   * @param  {viod}
   * @return {viod}
   */
  const handleCheckIn = async () => {
    try {
      await axios.put(`http://localhost/api/reservation/checkin/${id}`);
      navigation.navigate('TimeLimit')
    } catch (error) {
      console.log(error.message);
    }
  }

  const loginState = useRecoilValue(isLoginAtom);
  const setIsLoginAtom = useSetRecoilState(isLoginAtom);


  return (
    <View style={styles.container}>

      <ReservationStatus
        machineId={machine.id}
        name={machine.name}
        image_path={machine.image_path}
      />
      <View style={styles.buttonWrap}>

        <Text onPress={() => setIsLoginAtom(loginState ? false : true)}>
          aaaaaaaaa
        </Text>
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
            onPress={() => navigation.navigate('ReserveCancel', {
              machine: machine,
              reservedInfo: route.params.reservedInfo
            })}
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