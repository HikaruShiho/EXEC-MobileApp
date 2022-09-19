import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Cautions: React.FC = () => {
    return (
        <View style={styles.cationWrap}>
            <View style={styles.cationHead}>
                <FontAwesome name="exclamation-circle" size={22} color="#fff" />
                <Text style={styles.cationTitle}>注意事項</Text>
            </View>
            <View style={styles.cationBody}>
                <Text style={styles.cationText}>・ここに入ります</Text>
                <Text style={styles.cationText}>・ここに入ります</Text>
                <Text style={styles.cationText}>・ここに入ります</Text>
                <Text style={styles.cationText}>・ここに入ります</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cationWrap: {
        width: "100%",
        borderWidth: 2,
        borderColor: "#010440",
        marginTop: 16,
    },
    cationHead: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#010440",
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 12,
        paddingRight: 12,
    },
    cationTitle: {
        width: "100%",
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        paddingLeft: 8,
    },
    cationBody: {
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 8,
        paddingRight: 8,
    },
    cationText: {
        paddingTop: 4,
        paddingBottom: 4,
    },

});

export default Cautions;