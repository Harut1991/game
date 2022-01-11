import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ball from './Ball';

export default function Flask({clickedBall, onClick, ball, config, total, isSuccess}) {
    const currentTotal = useMemo(()=>{
        return ball.reduce((a, b) => a + b, 0)
    }, [ball]);
    return (
        <View style={[styles.flask, {width: 25}]} onClick={onClick}>
            <View style={[styles.flaskChild, {width: 25, minHeight: config.ballCount * 34 }]}>
                <View style={styles.flaskAbs}>
                    {ball.map( (i,index)=> <Ball clickedBall={clickedBall && !index} key={i*index} num={i}/>)}
                </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>{currentTotal}</Text> 
                <Text>{!!currentTotal && !!total && '/'}</Text>     
                <Text style={{color: isSuccess ? 'green': 'red'}}>{total}</Text>               
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    flask: {
        marginRight: '10px'
    },
    flaskChild: {
        position: 'relative',
        marginTop: 20,
        padding: 5,
        borderLeftWidth: 1,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderRightWidth: 1
    },
    flaskAbs: {
        position: 'absolute',
        bottom: 0
    }
});