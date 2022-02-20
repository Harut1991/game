import React from 'react';

import { StyleSheet, ImageBackground, View, Dimensions, Text} from 'react-native';
import {useCallback, useEffect, useState} from "react";
import useStorage from "./src/Hooks/useStorage";
import Header from "./src/Components/Header";
import Footer from "./src/Components/Footer";
import Background from "./assets/back.jpg";
import Start from "./src/Containers/Start";
import Game from "./src/Containers/Game";
import {useFonts} from "expo-font";
import {
    AdMobInterstitial
} from "expo-ads-admob";

const {width, height} = Dimensions.get('window');

export default function App() {
    const {getData, storeData} = useStorage();
    const [score, setScore] = useState(null);
    const [loaded] = useFonts({
        MochiyPopOne: require('./assets/MochiyPopOne-Regular.ttf'),
    });

    const [currentLevel, setCurrentLevel] = useState(0);

    const [onRefresh, setOnRefresh] = useState(0);
    const [effect, setEffect] = useState(false);
    const [restTime, setRestTime] = useState(0);
    const [addRow, setAddRow] = useState(false);
    const [level, setLevel] = useState(null);

    const onStart = useCallback(()=>{
        setCurrentLevel(level);
    }, [setCurrentLevel, level]);

    const onNext = useCallback(()=>{
        setCurrentLevel(currentLevel > 75 ? 1: currentLevel+1);
        const newScore = score + restTime;
        setScore(newScore);
        setAddRow(false);
        setRestTime(0);
    }, [setCurrentLevel, currentLevel, setAddRow, restTime, setRestTime, setScore]);

    const setRefresh = useCallback(() => {
        if (currentLevel) {
            setAddRow(false);
            currentLevel && setOnRefresh(onRefresh+1);
        }
    }, [currentLevel, setOnRefresh, onRefresh, setAddRow    ]);

    const onInit = useCallback(async () => {
        try{
            await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712');
            const sound = await getData('effect');
            const score = await getData('score');
            const lev = await getData('level');
            setEffect(sound === 'true');
            setScore(score ? +score : 0);
            setLevel(lev && lev > 0 ? +lev: 1);
        }catch (e) { }
    }, [setEffect, setScore, setLevel]);

    const currentLevelChangeHandler = useCallback(async () => {
      if (currentLevel && ((currentLevel > 3 && currentLevel%3 === 0) || currentLevel === 4)) {
          try{
              await AdMobInterstitial.requestAdAsync();
              await AdMobInterstitial.showAdAsync();
          }catch (e) { }
      }
      try{
          if(currentLevel){
              await storeData('level', currentLevel.toString());
          }
      }catch (e) {
          console.log(e);
      }
    }, [currentLevel, currentLevel]);

    const scoreChangeHandler = useCallback(async () => {
        if (score !== null && score !==undefined && score >= 0) {
            try{
                await storeData('score', score.toString());
            }catch (e) { }
        }
    }, [score]);

    useEffect(onInit, []);
    useEffect(currentLevelChangeHandler, [currentLevel]);
    useEffect(scoreChangeHandler, [score]);

    return (
      <View style={styles.container}>
          <ImageBackground source={Background} style={styles.imgStyle} imageStyle={{resizeMode: 'repeat'}}>
              <View style={{width: width, height: 100}}>
                  <Header score={score} setRefresh={setRefresh} addRow={addRow} level={currentLevel} setAddRow={setAddRow} effect={effect} setEffect={setEffect} />
              </View>
              <View style={{width: width, height: height - 125, padding: 25}}>
                  {!currentLevel && loaded &&
                      <Start
                          level={level}
                          onStart={onStart}
                      />
                  }
                  {!!currentLevel &&
                      <Game
                          score={score}
                          setScore={setScore}
                          setRestTime={setRestTime}
                          onRefresh={onRefresh}
                          addRow={addRow}
                          effect={effect}
                          onNext={onNext}
                          level={currentLevel}
                      />
                  }
              </View>
              <View style={{ height: 70}}>
                  <Footer />
              </View>
          </ImageBackground>
      </View>
    );
}

const styles = StyleSheet.create({
    imgStyle: {
        width: '100%',
        height: '100%'
    },
    container: {
        flex: 1
    }
});
