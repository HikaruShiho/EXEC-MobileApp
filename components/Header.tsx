import { StyleSheet, View, Text } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.headerInner}>
        <Text style={styles.text}>〇〇フィットネス　東京店</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 100,
    backgroundColor: '#010440',
    justifyContent: 'flex-end',
    position: "absolute",
    top: 0,
    right: 0,
  },
  headerInner: {
    padding: 20,
  },
  text: {
    fontSize: 12,
    color: "#fff",
    textAlign: "right",
  },
});

export default Header;