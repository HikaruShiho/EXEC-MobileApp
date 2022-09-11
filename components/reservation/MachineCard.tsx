import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MachineCard = ({onPress, machine }) => {

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
    >
      <View style={styles.cardInner}>
        {machine.image_path === "power_rack.jpg" &&
          <Image
            style={{ width: 115, height: 115 }}
            source={require('../../assets/power_rack.jpg')}
          />
        }
        {machine.image_path === "half_rack.jpg" &&
          <Image
            style={{ width: 115, height: 115 }}
            source={require('../../assets/half_rack.jpg')}
          />
        }
        {machine.image_path === "smith_machine.jpg" &&
          <Image
            style={{ width: 115, height: 115 }}
            source={require('../../assets/smith_machine.jpg')}
          />
        }
        {machine.image_path === "adjustable_bench.jpg" &&
          <Image
            style={{ width: 115, height: 115 }}
            source={require('../../assets/adjustable_bench.jpg')}
          />
        }
        <Text style={styles.machineName}>{machine.name}</Text>
        <Text style={styles.reseveBtn}>予約状況確認</Text>
      </View>
      <View style={styles.dot} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    marginTop: 8,
    marginBottom: 8,
    position: "relative",
  },
  cardInner: {
    width: "100%",
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    shadowColor: '#000',
    shadowRadius: 4,
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 2,
      height: 2
    }
  },
  machineName: {
    fontSize: 22,
    color: "#2D3340",
    fontWeight: "bold",
    paddingTop: 12,
    paddingBottom: 14,
  },
  reseveBtn: {
    fontSize: 18,
    width: "100%",
    lineHeight: 42,
    color: "#010440",
    fontWeight: "bold",
    backgroundColor: "#BFF205",
    textAlign: "center",
    borderRadius: 8,
    overflow: "hidden",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    overflow: "hidden",
    backgroundColor: "#2FCB52",
    position: "absolute",
    top: 12,
    right: 12,
  },
});

export default MachineCard;