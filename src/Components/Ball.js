import React from 'react';

import {View, Text, StyleSheet, Dimensions} from "react-native";
const {height} = Dimensions.get('window');
export default function Ball({num, clickedBall, size}) {
    return (
        <View style={{...styles.ball, ...clickedBall? styles.clickedBall: {},
            height: size.ball, width: size.ball,...(num >0 ? {}: {backgroundColor: '#f1b873'})}}>
            <View style={styles.num}>
                <Text style={styles.txt}>{num}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    ball: {
        borderRadius: 7,
        backgroundColor: '#FCAD51',
        flex: 1,
        opacity: 0.93,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginTop: 5
    },
    txt: {
        fontSize: height/45,
        fontWeight: 'bold'
    },
    num: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },
    clickedBall: {
        // backgroundColor: 'black',
        borderColor: '#E1E1E1',
        opacity: 1,
        borderWidth: 2.7,
    }
});
