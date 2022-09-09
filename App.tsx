import { SafeAreaView, StyleSheet, Text } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import AnimatedSplash from "react-native-animated-splash-screen";

import { RecoilRoot } from 'recoil';
import Header from './components/Header';

export default function App() {
  return (
    <RecoilRoot>
      <SafeAreaView style={styles.safeAreaView}>
        <Header />
        <AppNavigator />
      </SafeAreaView>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
});