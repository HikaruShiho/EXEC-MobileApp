import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const ReservedMachine = ({ onPress, machine }) => {
  return (
    <TouchableOpacity
      style={styles.upperBar}
      onPress={onPress}
    >
      <Text style={styles.messageText}>{machine}を予約中！</Text>
      <AntDesign name="arrowright" size={20} color="#fff" style={styles.iconArrow} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  upperBar: {
    width: "100%",
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: "#F64E4E",
    position: "relative",
  },
  messageText: {
    width: "100%",
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    paddingRight: 24,
  },
  iconArrow: {
    position: "absolute",
    top: "50%",
    right: 12,
    marginTop: 8
  },
});

export default ReservedMachine;