import { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import Button from '../components/Button';

const LocationJudgeScreen = ({ navigation }) => {

  const [searchWord, setSearchWord] = useState<string>("");

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>入店している施設を検索後{"\n"}選択してください。</Text>

      <TextInput
        style={styles.input}
        textAlign={"left"}
        selectionColor={"#00f"}
        placeholder={"店舗名を検索（例：池袋店）"}
        autoCapitalize="none"
        onChangeText={setSearchWord}
        value={searchWord}
      />

      <View style={{ paddingTop: 32 }}>
        <Button
          onPress={() => navigation.navigate("Home")}
          title={"◯◯フィットネス　渋谷店"}
          bgColor={"#010440"}
          color={"#fff"}
        />
      </View>
      <View style={{ paddingTop: 16 }}>
        <Button
          onPress={() => navigation.navigate("Home")}
          title={"◯◯フィットネス　原宿店"}
          bgColor={"#010440"}
          color={"#fff"}
        />
      </View>
      <View style={{ paddingTop: 16 }}>
        <Button
          onPress={() => navigation.navigate("Home")}
          title={"◯◯フィットネス　天王寺店"}
          bgColor={"#010440"}
          color={"#fff"}
        />
      </View>
      <View style={{ paddingTop: 16 }}>
        <Button
          onPress={() => navigation.navigate("Home")}
          title={"◯◯フィットネス　神戸店"}
          bgColor={"#010440"}
          color={"#fff"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: '#BFF205',
    padding: 40,
  },
  titleText: {
    textAlign: "center",
    fontSize: 20,
    lineHeight: 32,
    fontWeight: "bold",
    paddingTop: 16,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: 18,
    marginTop: 32,
  },
});

export default LocationJudgeScreen;