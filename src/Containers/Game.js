import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import GameClass from '../Classes/Game';
import Flask from '../Components/Flask';
import WinModal from '../Components/WinModal';
import jumpBall from '../../assets/jumpBall.wav';
import row from '../../assets/row.wav';
import win from '../../assets/win.wav';
import ReactHowler from 'react-howler';

export default function Game({level, onNext, effect}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [oldCheckedData, setOldCheckedData] =useState({});
    const [clickedBall, setClickedBall] = useState('');
    const [checkedData, setCheckedData] =useState({});
    const [rowFill, setRowFill] = useState(false);
    const [config, setConfig] = useState({});
    const [jump, setJump] = useState(false);
    const [winS, setWinS] = useState(false);
    const [game, setGame] = useState(false);
    const [data, setData] =useState({});
    
    const init = useCallback(()=> {
        setOldCheckedData({});
        setCheckedData({});
        setRowFill(false);
        setClickedBall('');
        setConfig({});
        setJump(false);
        setWinS(false);
        setData({});
        const gameClass = new GameClass();
        gameClass.start(level);
        setGame(gameClass);
        if (gameClass){
            setData(gameClass.data);
            setConfig(gameClass.currentComplications);
        }
        setJump(false);
    }, [level, setGame, setData, setCheckedData,setOldCheckedData, setClickedBall, setConfig, setRowFill, setWinS]);

    const gameHandler = useCallback(()=> {
        if (game){
            setData(game.data);
            setConfig(game.currentComplications);
        }
    }, [game, setData, setConfig]);

    const dataHandler = useCallback(()=> {
        if (data?.mixedData){
            setCheckedData(game.checkWin(data.mixedData, data.flaskTotal));
            setOldCheckedData(checkedData);
        }
    }, [data, setCheckedData, setOldCheckedData, checkedData, game]);

    const onClickFlask = useCallback((index)=>{
        setJump(false);
        setRowFill(false);
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
            return ( 
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                {
                data?.mixedData.map((i, index) => {
                    return <Flask
                        clickedBall={clickedBall === index}
                        isSuccess={checkedData[index]}
                        onClick={() => onClickFlask(index)} 
                        total={data.flaskTotal[index]}
                        key={i.toString() + index} 
                        ball={i}
                        config={config} 
                       />
                })
            }</View>)
            
            
        } else return <ActivityIndicator />;
    }, [data, game, config, onClickFlask, checkedData, clickedBall]);

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

    useEffect(dataHandler, [data?.mixedData]);
    useEffect(winHandler, [checkedData]);
    useEffect(gameHandler, [game]);
    useEffect(init, [level]);

    return (
        <View>
            {effect && (<>
                {jump && <ReactHowler src={jumpBall} playing={jump} volume={0.2}  />}
                {rowFill && <ReactHowler src={row} playing={rowFill}  />}
                {winS && <ReactHowler src={win} playing={winS}  />}
            </>)}
            {modalVisible && <WinModal onClickNext={onClickNext} modalVisible={modalVisible} />}
            {viewData}
        </View>
    );
}
