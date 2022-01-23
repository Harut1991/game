import React, {useMemo} from 'react';
import { StyleSheet, View, Text } from "react-native";
import HeartEmptySVG from "../Icons/HeartEmptySVG";
import Heart025SVG from "../Icons/Heart025SVG";
import Heart05SVG from "../Icons/Heart05SVG";
import Heart075SVG from "../Icons/Heart075SVG";
import HeartFullSVG from "../Icons/HeartFullSVG";
import {defaultHeart} from "../Classes/complecations";
const heart = defaultHeart;

export default function Scoring({score}) {
    if (score === 0) {
        return (
            <HeartEmptySVG />
        );
    }
    const scoring = useMemo(() => {
        if (score <= heart || score%heart >0 ) {
            const percent = score <= heart ? score*100/heart:  (score%heart)*100/heart;
            if (percent <= 25){
                return <Heart025SVG/>
            }
            if (percent <= 50){
                return <Heart05SVG />
            }
            if (percent <= 97){
                return <Heart075SVG />
            }

        }
        return  <HeartFullSVG/>
    }, [score, heart]);

    return <View style={styles.container}>
        {score > 0 && <Text style={styles.heart}> {score >0 ? Math.floor(score/heart): 0} </Text>}
        {scoring}
    </View>
}
const styles = StyleSheet.create({
    container: {
        position: 'relative'
    },
    heart: {
        position: 'absolute',
        top: 5,
        left: 2,
        fontSize: 15,
        color: '#FCAD51'
    }
});
