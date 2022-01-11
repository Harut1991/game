import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Game from './src/Containers/Game';
import Start from './src/Containers/Start';

import Header from './src/Components/Header';
import Footer from './src/Components/Footer';
import useStorage from './src/Hooks/useStorage';



export default function App() {
  const {getData} = useStorage();
  
  const [level, setLevel] = useState(1);
  const [effect, setEffect] = useState(false);
  

  console.log(effect)
  const [currentLevel, setCurrentLevel] = useState(0);
  const onStart = useCallback(()=>{
    setCurrentLevel(level);
  }, [setCurrentLevel]);

  const onNext = useCallback(()=>{
    setCurrentLevel(currentLevel+1);
  }, [setCurrentLevel, currentLevel ]);

  useEffect(() => {
    getData('effect').then(t => setEffect(t === 'true'))
  }, []);

  return (
    <View style={styles.gameContainer}>
        <Header level={currentLevel} effect={effect} setEffect={setEffect} />
        <View style={styles.content}>
          {!currentLevel && <Start level={level} onStart={onStart} />}
          {!!currentLevel && <Game effect={effect} onNext={onNext} level={currentLevel}/>}
        </View>
        <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  gameContainer: {
    height: '100vh'
  },
  content: {
    height: '80vh'
  }
});