import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Button from '../../components/Button';

const ReserveDoneScreen: React.FC = ({ navigation }: any) => {

  return (
    <View style={styles.container}>
      <FontAwesome
        name="check-circle"
        size={72}
        color="#BFF205"
        style={styles.iconCheck}
      />
      <Text style={styles.iconCheckText}>予約完了</Text>
      <Text style={styles.doneMessege}>ご予約を受付けました。{"\n"}利用開始5分前になりましたら{"\n"}通知が送信されます。</Text>
      <View style={{ paddingTop: 32 }}>
        <Button
          onPress={() => navigation.navigate('Home')}
          title={"ホームに戻る"}
          bgColor={"#010440"}
          color={"#fff"}
        />
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: '#fff',
    padding: 12,
  },
  iconCheck: {
    textAlign: "center",
  },
  iconCheckText: {
    fontSize: 20,
    color: "#2D3340",
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 8,
  },
  doneMessege: {
    lineHeight: 32,
    color: "#2D3340",
    fontSize: 16,
    textAlign: "center",
    backgroundColor: "rgba(191,242, 5, 0.3)",
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 24,
    borderRadius: 8,
    overflow: "hidden",
  },
});

export default ReserveDoneScreen;