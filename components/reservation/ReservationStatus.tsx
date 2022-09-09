import { StyleSheet, View, Text, Image } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const ReservationStatus = () => {
  return (
    <View style={styles.container}>
      {/* マシンタイトル */}
      <Text style={styles.machineName}>パワーラック①</Text>

      {/* ステータス */}
      <View style={styles.reserveStatusWrap}>
        <Image
          style={{ width: 110, height: 110, }}
          source={require('../../assets/power_rack.jpg')}
        />
        <View style={styles.statusWrap}>
          <View style={styles.statusBox}>
            <View style={styles.statusBoxLeft}>
              <Ionicons name="man-outline" size={36} color="#2D3340" />
              <Text style={styles.statusTitle}>現在の{"\n"}待ち人数</Text>
            </View>
            <View style={styles.statusBoxRight}>
              <Text style={styles.statusText}><Text style={styles.statusNumText}>3</Text>人</Text>
            </View>
          </View>
          <View style={styles.statusBox}>
            <View style={styles.statusBoxLeft}>
              <FontAwesome5 name="clock" size={36} color="#2D3340" />
              <Text style={styles.statusTitle}>現在の{"\n"}待ち時間</Text>
            </View>
            <View style={styles.statusBoxRight}>
              <Text style={styles.statusText}>約<Text style={styles.statusNumText}>30</Text>分</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 12,
  },
  machineName: {
    fontSize: 24,
    color: "#010440",
    fontWeight: "bold"
  },
  reserveStatusWrap: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 12,
  },
  statusWrap: {
    flex: 1,
  },
  statusBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 4,
    paddingBottom: 4,
  },
  statusBoxLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusBoxRight: {
  },
  statusText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2D3340",
  },
  statusTitle: {
    fontSize: 16,
    lineHeight: 22,
    paddingLeft: 8,
    color: "#2D3340",
  },
  statusNumText: {
    fontSize: 44,
    fontWeight: "bold",
    color: "#F64E4E",
  },
});

export default ReservationStatus;