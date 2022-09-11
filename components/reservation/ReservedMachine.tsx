import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { useRecoilValue } from 'recoil';
import { reservedInfoAtom } from '../../recoil/Atom';

type Props = {
  onPress: () => void;
}

const ReservedMachine: React.FC<Props> = ({ onPress }) => {
  /**
   * グローバルステート
   * @const {reservedInfo} 予約中マシン情報
   */
  const reservedInfo = useRecoilValue(reservedInfoAtom);

  return (
    <TouchableOpacity
      style={styles.upperBar}
      onPress={onPress}
    >
      <Text style={styles.messageText}>{reservedInfo.machine.name}を予約中！</Text>
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