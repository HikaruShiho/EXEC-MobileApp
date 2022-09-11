import { StyleSheet, View, Text, Alert } from 'react-native';
import ReservationStatus from '../../components/reservation/ReservationStatus';
import Button from '../../components/Button';

const ReserveCancelScreen = ({ route, navigation }) => {
  const { machine, reservedInfo } = route.params;

  const alert = () => {
    Alert.alert(
      'パワーラック①',
      '上記予約を取り消しました',
      [{
        text: '確認',
        onPress: () => navigation.navigate('Home')
      }]);
  }

  return (
    <View style={styles.container}>
      <ReservationStatus
        machineId={machine.id}
        name={machine.name}
        image_path={machine.image_path}
      />
      <Text style={styles.doneMessege}>上記予約を取消します。{"\n"}取消した予約は復元できません。</Text>

      <View style={styles.buttonWrap}>
        <View style={styles.button}>
          <Button
            onPress={() => navigation.navigate('Reserved', { reservedInfo: reservedInfo })}
            title={"戻る"}
            bgColor={"#010440"}
            color={"#fff"}
          />
        </View>
        <View style={styles.button}>
          <Button
            onPress={alert}
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
  doneMessege: {
    lineHeight: 32,
    color: "#f00",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    backgroundColor: "rgba(246,78, 78, 0.3)",
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 24,
    borderRadius: 8,
    overflow: "hidden",
  },
  buttonWrap: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 24,
  },
  button: {
    width: "50%",
    paddingLeft: 6,
    paddingRight: 6,
  },
});

export default ReserveCancelScreen;