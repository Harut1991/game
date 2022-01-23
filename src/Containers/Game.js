import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {ActivityIndicator, Dimensions, View, Text, StyleSheet} from 'react-native';
import FailModal from "../Components/FailModal";
import WinModal from '../Components/WinModal';
import GameClass from '../Classes/Game';
import Flask from '../Components/Flask';
import {sizes} from "../Classes/sizes";
import {Audio} from "expo-av";
import Timer from "../Components/Timer";

const {width, height} = Dimensions.get('window');

export default function Game({level, onNext, effect, addRow, totalRow, onRefresh, setRestTime, score, setScore}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [oldCheckedData, setOldCheckedData] =useState({});
    const [clickedBall, setClickedBall] = useState('');
    const [checkedData, setCheckedData] =useState({});
    const [rowFill, setRowFill] = useState(false);
    const [time, setTime] = useState({time: 0});
    const [config, setConfig] = useState({});
    const [jumpM, setJumpM] = useState(null);
    const [jump, setJump] = useState(false);
    const [fail, setFail] = useState(false);
    const [winS, setWinS] = useState(false);
    const [game, setGame] = useState(false);
    const [winM, setWinM] = useState(null);
    const [failM, setFailM] = useState(null);
    const [rowM, setRowM] = useState(null);
    const [data, setData] =useState({});

    const addRowHandler = useCallback(() => {
        addRow && game &&  setData(JSON.parse(JSON.stringify(game.addRow())));
    }, [addRow, game, setData]);

    const setWinSMusicHandler = useCallback(async () => {
        try{
            await winM.stopAsync();
            if (winS && effect && rowM)
                    await winM.playAsync();
        } catch (e) {}
    }, [effect, winS, winM, rowM]);

    const setJumpMusicHandler = useCallback(async () => {
        try{
            await jumpM.stopAsync();
            if (jump && effect && jumpM)
                    await jumpM.playAsync();
        } catch (e) { }
    }, [jump, effect, jumpM]);

    const setFailMusicHandler = useCallback(async () => {
        try{
            await failM.stopAsync();
            if (fail && effect && failM)
                await failM.playAsync();
        } catch (e) { }
    }, [failM, effect, fail]);

    const setRowFillMusicHandler = useCallback(async () => {
        try {
            await rowM.stopAsync();
            if (rowFill && effect && rowM)
                await rowM.playAsync();
        } catch (e) { }
    }, [rowFill, effect, rowM]);
    
    const init = useCallback(()=> {
        setOldCheckedData({});
        setCheckedData({});
        setClickedBall('');
        setRowFill(false);
        setJump(false);
        setWinS(false);
        setConfig({});
        setData({});

        const gameClass = new GameClass();
        gameClass.start(level);
        setGame(gameClass);
        if (gameClass){
            setData(gameClass.data);
            setConfig(gameClass.currentComplications);
            setTime({time: gameClass.currentComplications.time});
        }
        setJump(false);
    }, [level, setGame, setData, setCheckedData,setOldCheckedData,
        setClickedBall, setConfig, setRowFill, setWinS, setTime
    ]);

    const gameHandler = useCallback(()=> {
        if (game){
            setData(game.data);
            setConfig(game.currentComplications);
        }
    }, [game, setData, setConfig, game]);

    const dataHandler = useCallback(()=> {
        if (data?.mixedData){
            setCheckedData(game.checkWin(data.mixedData, data.flaskTotal));
            setOldCheckedData(checkedData);
        }
    }, [data, setCheckedData, setOldCheckedData, checkedData, game]);

    const onClickFlask = useCallback( (index)=>{
        setRowFill(false);
        setJump(false);

        if (clickedBall === '' && data.mixedData[index].length){
            setClickedBall(index);
        } else if(clickedBall !== '' && clickedBall === index){
            setClickedBall('');
        } else if (clickedBall !== '' && game.canSet(index)){
            setJump(effect && true);
            game.changeData(clickedBall, index);
            setData(JSON.parse(JSON.stringify(game.data)));
            setClickedBall('');
        }
    }, [clickedBall, data, setClickedBall, setData, game, effect, setJump, setRowFill]);

    const viewData = useMemo(()=> {
        if (data?.mixedData){
            const size = sizes(game?.data.mixedData.length, game.currentComplications.ballCount, width, height);
            if (size){
                const flor = Math.floor(width/size.column);
                const arrs = Array.from(Array(Math.ceil(data?.mixedData.length/Math.floor(width/size.column))).keys());
                return arrs.map(j => (
                    <View key={j} style={{flexDirection: 'row', justifyContent: 'flex-start', ...modalVisible ? {opacity: 0.5}: {}}}>
                        {
                            data?.mixedData.slice(j === 0 ? j: flor , (j+1)*flor >= data?.mixedData.length ? data?.mixedData.length : flor)
                                .map((i, ind) => {
                                    const index =  j === 0 ? ind : flor*j + ind;
                                    return <Flask
                                            size={size}
                                            clickedBall={clickedBall === index}
                                            isSuccess={checkedData[index]}
                                            onClick={() => onClickFlask(index)}
                                            total={data.flaskTotal[index]}
                                            key={index.toString() + j + ind}
                                            ind={index}
                                            totalRow={totalRow}
                                            ball={i}
                                            config={config}
                                        />
                            })
                        }</View>
                ));
            }
        } else return <ActivityIndicator />;
    }, [data, game, config, onClickFlask, checkedData, clickedBall, totalRow]);

    const winHandler = useCallback(()=> {
        setRowFill(false);
        setWinS(false);
        const values = Object.values(checkedData);
        const oldValues = Object.values(oldCheckedData);
        if (values.length){
            if (values.every(i=> i === true)) {
                setJump(false);
                setWinS(effect);
                setModalVisible(true);
            } else {
                const rowFilled = values.some((i, index) => i !== oldValues[index] && i);
                if (rowFilled){
                    setRowFill(effect);
                }
            }
        }
    }, [checkedData, setModalVisible, oldCheckedData,setRowFill, effect, setJump, setWinS]);
    
    const onClickNext = useCallback(()=>{
        setModalVisible(false);
        onNext();
    }, [setModalVisible, onNext]);

    const handleOnRefresh = useCallback(()=>{
        if (onRefresh || fail){
            setFail(false);
            init();
        }
    }, [onRefresh, init, setFail, fail]);

    const soundHandler = useCallback(async () => {
        try{
            const { sound } = await Audio.Sound.createAsync(
                require('../../assets/win.wav')
            );
            setWinM(sound);
        } catch (e) { }

        try{
            const { sound } = await Audio.Sound.createAsync(
                require('../../assets/failEf.mp3')
            );
            setFailM(sound);
        } catch (e) { }

        try{
            const { sound } = await Audio.Sound.createAsync(
                require('../../assets/jumpBall.wav')
            );
            setJumpM(sound);
        } catch (e) { }
        try{
            const { sound } = await Audio.Sound.createAsync(
                require('../../assets/row.wav')
            );
            setRowM(sound);
        } catch (e) { }
    }, [setWinM, setRowM, setJumpM]);

    const onFailHandler = useCallback(() => {
        setFail(true);
    }, [setFail]);

    const onContinue = useCallback(() => {
        setFail(false);
        setTime({time: game.currentComplications.time});
    }, [setFail, setTime, game]);

    useEffect(setRowFillMusicHandler, [rowFill]);
    useEffect(dataHandler, [data?.mixedData]);
    useEffect(handleOnRefresh, [onRefresh]);
    useEffect(setWinSMusicHandler, [winS]);
    useEffect(setJumpMusicHandler, [jump]);
    useEffect(setFailMusicHandler, [fail]);
    useEffect(winHandler, [checkedData]);
    useEffect(addRowHandler, [addRow]);
    useEffect(gameHandler, [game]);
    useEffect(soundHandler, []);
    useEffect(init, [level]);

    return (
        <View>
            <View style={styles.main}>
                <View style={{width: '20%'}}></View>
                <View style={{width: '60%'}}>
                    <Text style={styles.container}>Level {level} </Text>
                </View>
                <View style={{width: '20%', marginTop: 12}}>
                    <Text style={styles.container}>
                        <Timer setRestTime={setRestTime} win={modalVisible} time={time} onFailHandler={onFailHandler} />
                    </Text>
                </View>
            </View>
             {viewData}
            {modalVisible && <WinModal onClickNext={onClickNext} level={level} modalVisible={modalVisible} />}
            {fail && <FailModal onContinue={onContinue} failRefreshHandler={handleOnRefresh} modalVisible={fail} score={score} setScore={setScore} />}
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        marginBottom: 60,
        justifyContent: "space-between",
        flexDirection: "row",
    },
    container: {
        fontFamily: "MochiyPopOne",
        color: 'white',
        fontSize: 35,
        textAlign: 'center'
    }
});
