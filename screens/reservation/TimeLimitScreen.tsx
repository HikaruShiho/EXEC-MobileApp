import { StyleSheet, View, Text } from 'react-native';
import ReservationStatus from '../../components/reservation/ReservationStatus';
import Button from '../../components/Button';

const TimeLimitScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.limitText}>残り時間</Text>
      <Text style={styles.timer}>20:00</Text>
      <View style={styles.checkOutButton}>
        <Button
          onPress={() => navigation.navigate('Home')}
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