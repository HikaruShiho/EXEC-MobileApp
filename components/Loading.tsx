import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LottieView from 'lottie-react-native';

type Props = { pattern: string; }

const Loading: React.FC<Props> = ({ pattern }) => {
    return (
        <View style={styles.container}>
            {pattern === "location" ? (
                <>
                    <LottieView
                        style={{ width: 160, height: 160 }}
                        source={require('../assets/location_loader.json')}
                        autoPlay loop
                    />
                    <Text style={{ fontSize: 20 }}>現在地取得中</Text>
                </>
            ) : (
                <LottieView
                    style={{ width: 140, height: 140 }}
                    source={require('../assets/loader.json')}
                    autoPlay loop
                />
            )}
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