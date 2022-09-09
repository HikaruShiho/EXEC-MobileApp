import { StyleSheet, View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ReservationStatus from '../../components/reservation/ReservationStatus';
import Button from '../../components/Button';

const ReserveScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <ReservationStatus />
      <View style={styles.cationWrap}>
        <View style={styles.cationHead}>
          <FontAwesome name="exclamation-circle" size={22} color="#fff" />
          <Text style={styles.cationTitle}>注意事項</Text>
        </View>
        <View style={styles.cationBody}>
          <Text style={styles.cationText}>・ここに入ります</Text>
          <Text style={styles.cationText}>・ここに入ります</Text>
          <Text style={styles.cationText}>・ここに入ります</Text>
          <Text style={styles.cationText}>・ここに入ります</Text>
        </View>
      </View>
      <View style={{ paddingTop: 24 }}>
        <Button
          onPress={() => navigation.navigate('ReserveDone')}
          title={"予約を確定する"}
          bgColor={"#BFF205"}
          color={"#010440"}
        />
      </View>
      {/* <View style={{ paddingTop: 24, flexDirection: "row" }}>
        <View style={{ width: "50%", paddingRight: 8 }}>
          <Button
            onPress={aaa}
            title={"戻る"}
            bgColor={"#BFF205"}
            color={"#010440"}
          />
        </View>
        <View style={{ width: "50%", paddingLeft: 8 }}>
          <Button
            onPress={aaa}
            title={"予約を取消す"}
            bgColor={"#BFF205"}
            color={"#010440"}
          />
        </View>
      </View> */}
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
  },
  cationWrap: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#010440",
    marginTop: 16,
  },
  cationHead: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#010440",
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
  },
  cationTitle: {
    width: "100%",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 8,
  },
  cationBody: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 8,
    paddingRight: 8,
  },
  cationText: {
    paddingTop: 4,
    paddingBottom: 4,
  },
});

export default ReserveScreen;