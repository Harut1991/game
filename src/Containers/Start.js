import {View, Pressable, Text, StyleSheet} from 'react-native';
import {useFonts} from "expo-font";
import React from 'react';

export default function Start({level, onStart}) {
    const [loaded] = useFonts({
        MochiyPopOne: require('../../assets/MochiyPopOne-Regular.ttf'),
    });
    return (
        <View style={styles.container}>
            <View style={styles.start}>
                {level && loaded && <Text style={styles.level}>Level {level} </Text>}
            </View>
            <Pressable onPress={onStart}>
                <View style={styles.txt}>
                    {loaded && <Text style={styles.font}>Start</Text>}
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    start: {
        marginBottom: 55,
        justifyContent: "space-between",
        flexDirection: "row",
    },
    level: {
        fontFamily: "MochiyPopOne",
        color: 'white',
        fontSize: 35,
        textAlign: 'center'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        position: 'relative',
        marginTop: 120
    },
    txt: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        borderRadius: 7,
        height: 70,
        width: 180,
        backgroundColor: '#FCAD51'
    },
    font: {
        fontFamily: "MochiyPopOne",
        fontSize: 20,
        color: 'white'
    }
});
