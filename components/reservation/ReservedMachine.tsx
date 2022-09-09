import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const ReservedMachine = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.upperBar}
      onPress={onPress}
    >
      <Text style={styles.messageText}>現在、パワーラック①を予約中です！</Text>
      <AntDesign name="arrowright" size={20} color="#010440" style={styles.iconArrow} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  upperBar: {
    width: "100%",
    padding: 12,
    backgroundColor: "#BFF205",
    position: "relative",
  },
  messageText: {
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
    color: "#010440",
    paddingRight: 24,
  },
  iconArrow: {
    position: "absolute",
    top: "50%",
    right: 12,
    marginTop: 2
  },
});

export default ReservedMachine;