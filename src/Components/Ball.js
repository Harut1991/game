import { StyleSheet, View } from "react-native";

export default function Ball({num, clickedBall}) {
    return (
        <View style={[styles.ball, clickedBall? styles.clickedBall: {} ]}>
           {num}
        </View>
    );
}

const styles = StyleSheet.create({
    ball: {
        borderRadius: 50,
        borderStyle: 'solid',
        borderWidth: 1,
        padding: 3,
    },
    clickedBall: {
        backgroundColor: 'red'
    }
});