import React, { useMemo } from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Ball from './Ball';
import BottomSVG from "../Icons/BottomSVG";
import BottomSmallSVG from "../Icons/BottomSmallSVG";

export default function Flask({size, clickedBall, onClick, ball, config, total, isSuccess, totalRow, ind}) {
    const currentTotal = useMemo(()=>{
        return ball.reduce((a, b) => a + b, 0)
    }, [ball]);

    return (
        <Pressable onPress={onClick} style={{}}>
            <View style={[styles.flask, {width: size.column}]} >
                <View style={[styles.flaskChild, {width: size.column, minHeight: config.ballCount * size.ball }]}>
                    <View style={styles.flaskAbs}>
                        {ball.map( (i,index)=>
                            <Ball
                            size={size}
                            clickedBall={clickedBall && !index}
                            key={i.toString() + index.toString() + ind.toString()}
                            num={i}
                        />)}
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', position: 'relative'}}>
                    {size.ball === 55 ? <BottomSVG isSuccess={isSuccess} />: <BottomSmallSVG isSuccess={isSuccess} />}

                    <Text style={
                        {
                            position: 'absolute',
                            textAlign: 'center',
                            width: '90%',
                            top: size.ball === 55 ? 11: 7,
                            paddingLeft: size.ball === 55 ? 0: 5,
                            fontWeight: 'bold',
                            fontSize: size.ball === 55 ? 18: 16
                        }
                    }>
                            <>
                                {(total >=0 || currentTotal) && <Text style={{color: 'white'}}>{currentTotal}</Text>}
                                {total && <Text style={{color: 'white'}}> /</Text>}
                            </>
                        <Text style={{color: isSuccess ? 'green': 'red'}}>{total}</Text>
                    </Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    flask: {
        marginRight: 1,
        marginBottom: 40
    },
    flaskChild: {
        marginLeft: 13,
        position: 'relative',
    },
    flaskAbs: {
        position: 'absolute',
        bottom: 0
    }
});
