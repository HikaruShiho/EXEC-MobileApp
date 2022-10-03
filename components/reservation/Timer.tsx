import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MAXIMUM_USAGE_TIME } from 'react-native-dotenv';

import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

type Props = {
  handleCheckOut: () => void;
}

const Timer: React.FC<Props> = ({ handleCheckOut }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  /**
   * 秒数を "mm:ss" にフォーマット
   * @param  remainingTime
   * @return mm:ss
   */
  const formatSeconds = (remainingTime: number): string => {
    const minutes = Math.floor(remainingTime / 60)
    const seconds = remainingTime % 60
    return `${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`
  }

  /**
   * タイマーがカウントアップしたらチェックアウト
   */
  const onComplete = (): void => {
    setIsPlaying(false);
    handleCheckOut();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.limitText}>残り時間</Text>
      <View style={styles.timerWrap}>
        <CountdownCircleTimer
          isPlaying={isPlaying}
          duration={MAXIMUM_USAGE_TIME}
          colors={["#010440", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[1200, 800, 400, 0]}
          size={280}
          strokeWidth={14}
          strokeLinecap={"square"}
          onComplete={onComplete}
        >
          {({ remainingTime, color }) => (
            <Text style={{ color, fontSize: 72, fontWeight: "bold" }}>
              {formatSeconds(remainingTime)}
            </Text>
          )}
        </CountdownCircleTimer>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
  },
  limitText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#A5A5A5",
    textAlign: "center"
  },
  timerWrap: {
    alignItems: "center",
    paddingTop: 32,
  },
});

export default Timer;