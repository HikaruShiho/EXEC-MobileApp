import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
  title: string;
  bgColor: string;
  color: string;
  onPress: () => void;
}

const ReserveButton: React.FC<Props> = ({ title, bgColor, color, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[
        styles.buttonText, {
          color: color,
          backgroundColor: bgColor
        }
      ]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonText: {
    width: "100%",
    lineHeight: 56,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 8,
    overflow: "hidden",
  },
});

export default ReserveButton;