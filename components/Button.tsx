import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
  title: string;
  bgColor: string;
  color: string;
  onPress: () => void;
}

const ReserveButton = ({ title, bgColor, color, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[
        styles.buttonText,
        {
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
    lineHeight: 42,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 8,
    overflow: "hidden",
  },
});

export default ReserveButton;