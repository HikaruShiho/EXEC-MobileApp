import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';

import { useRecoilValue } from 'recoil';
import { currentGymAtom } from '../../recoil/Atom';
import { useState } from 'react';

type Props = {
  machineId: number | null;
  name: string | null;
  image_path: string | null;
}

const ReservationStatus: React.FC<Props> = ({ machineId, name, image_path }) => {
  const currentGym = useRecoilValue(currentGymAtom);
  const [waitingPeople, setWaitingPeople] = useState<number>(0);

  /**
   * 待ち人数・待ち時間を取得
   */
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`https://12-shiho-lab13.sakura.ne.jp/EXEC-API/api/reservation/status/${currentGym.id}/${machineId}`);
        setWaitingPeople(data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.machineName}>{name}</Text>
      <View style={styles.reserveStatusWrap}>
        {image_path === "power_rack.jpg" &&
          <Image
            style={{ width: 110, height: 110 }}
            source={require('../../assets/power_rack.jpg')}
          />
        }
        {image_path === "half_rack.jpg" &&
          <Image
            style={{ width: 110, height: 110 }}
            source={require('../../assets/half_rack.jpg')}
          />
        }
        {image_path === "smith_machine.jpg" &&
          <Image
            style={{ width: 110, height: 110 }}
            source={require('../../assets/smith_machine.jpg')}
          />
        }
        {image_path === "adjustable_bench.jpg" &&
          <Image
            style={{ width: 110, height: 110 }}
            source={require('../../assets/adjustable_bench.jpg')}
          />
        }
        <View style={styles.statusWrap}>
          <View style={styles.statusBox}>
            <View style={styles.statusBoxLeft}>
              <Ionicons name="man-outline" size={36} color="#2D3340" />
              <Text style={styles.statusTitle}>現在の{"\n"}待ち人数</Text>
            </View>
            <View style={styles.statusBoxRight}>
              <Text style={styles.statusText}><Text style={styles.statusNumText}>{waitingPeople}</Text>人</Text>
            </View>
          </View>
          <View style={styles.statusBox}>
            <View style={styles.statusBoxLeft}>
              <FontAwesome5 name="clock" size={36} color="#2D3340" />
              <Text style={styles.statusTitle}>現在の{"\n"}待ち時間</Text>
            </View>
            <View style={styles.statusBoxRight}>
              <Text style={styles.statusText}>約<Text style={styles.statusNumText}>{waitingPeople * 20}</Text>分</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 12,
  },
  machineName: {
    fontSize: 24,
    color: "#010440",
    fontWeight: "bold"
  },
  reserveStatusWrap: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 12,
  },
  statusWrap: {
    flex: 1,
  },
  statusBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 4,
    paddingBottom: 4,
  },
  statusBoxLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusBoxRight: {
  },
  statusText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2D3340",
  },
  statusTitle: {
    fontSize: 16,
    lineHeight: 22,
    paddingLeft: 8,
    color: "#2D3340",
  },
  statusNumText: {
    fontSize: 44,
    fontWeight: "bold",
    color: "#F64E4E",
  },
});

export default ReservationStatus;