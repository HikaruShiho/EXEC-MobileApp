import { StyleSheet, View } from 'react-native';
import ReservationStatus from '../../components/reservation/ReservationStatus';
import Button from '../../components/Button';

const ReservedScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ReservationStatus />
      <View style={styles.buttonWrap}>
        <View style={styles.checkInButton}>
          <Button
            onPress={() => navigation.navigate('TimeLimit')}
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
            onPress={() => navigation.navigate('ReserveCancel')}
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
    justifyContent:"center",
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