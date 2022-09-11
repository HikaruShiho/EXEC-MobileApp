import { StyleSheet, View, Text } from 'react-native';
import ReservationStatus from '../../components/reservation/ReservationStatus';
import Button from '../../components/Button';
import axios from 'axios';

import { useRecoilState } from 'recoil';
import { reservedInfoAtom } from '../../recoil/Atom';

const TimeLimitScreen = ({ navigation }) => {
  /**
   * グローバルステート
   * @const {reservedInfo} 予約中マシン情報
   */
  const [reservedInfo, setReservedInfo] = useRecoilState(reservedInfoAtom);

  /**
   * チェックアウトの処理
   */
  const handleCheckOut = async () => {
    try {
      console.log(reservedInfo.id);
      const { data } = await axios.put(`http://localhost/api/reservation/checkout/${reservedInfo.id}`);
      setReservedInfo(null);
      console.log(data);

      navigation.navigate('Home')
    } catch (error) {
      console.log(error.message);
    }
    console.log(reservedInfo);

  }

  return (
    <View style={styles.container}>
      <Text style={styles.limitText}>残り時間</Text>
      <Text style={styles.timer}>20:00</Text>
      <View style={styles.checkOutButton}>
        <Button
          onPress={handleCheckOut}
          title={"チェックアウト"}
          bgColor={"#BFF205"}
          color={"#010440"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 40,
  },
  limitText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#A5A5A5",
    textAlign: "center"

  },
  timer: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#010440",
    textAlign: "center",
    paddingTop: 12
  },
  // buttonWrap: {
  //   flexDirection: "row",
  //   flexWrap: "wrap",
  //   justifyContent: "center",
  //   paddingTop: 24,
  // },
  checkOutButton: {
    width: "100%",
    paddingTop: 24
  },
});

export default TimeLimitScreen;