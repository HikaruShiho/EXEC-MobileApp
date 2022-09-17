import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

const Loading: React.FC = () => {
    return (
        <View style={styles.container}>
            <LottieView
                style={{ width: 140, height: 140 }}
                source={require('../assets/loader.json')}
                autoPlay loop
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.98)",
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 10
    },
});

export default Loading;