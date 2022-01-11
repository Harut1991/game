import React from 'react';
import { useCallback, useEffect, useState } from 'react/cjs/react.development';
import SettingsModal from './SettingsModal';
import ReactHowler from 'react-howler';
import newSound from '../../assets/sound.mp3';
import useStorage from '../Hooks/useStorage';
import { StyleSheet, View } from 'react-native';


export default function Header({level, effect, setEffect}) {
    const {getData, storeData} = useStorage();

    const [modalVisible, setModalVisible] = useState(false);
    const [sound, setSound] = useState(false);

    const onSound = useCallback(() => {
        storeData('sound', !sound);
        setSound(!sound);
    }, [setSound, sound, storeData]);

    const onEffect = useCallback(() => {
        storeData('effect', !effect);
        setEffect(!effect);
    }, [setEffect, effect, storeData]);

    const soundChangeHandler = useCallback(()=> {
        
    }, [sound]);

    useEffect(soundChangeHandler, [sound]);
    useEffect(() => {
        getData('sound').then(t => setSound(t === 'true'))
      }, []);
      
    return (
        <View>
            {/* <ReactHowler src={newSound} playing={sound} volume={0.5} loop /> */}
            <View style={styles.header}>
                <View onClick={() => setModalVisible(true)}>settings</View>
                <View>{level ? `Level ${level}`: ''}</View>
                <View>x</View>
            </View>
            {modalVisible && <SettingsModal 
                sound={sound}
                effect={effect}
                onSound={onSound}
                onEffect={onEffect} 
                setModalVisible={setModalVisible} 
                modalVisible={modalVisible}
              />}
        </View>
    );
}
const styles = StyleSheet.create({
    header: {
        paddingTop: '4vh',
        height: '8vh',
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        alignContent: "space-between",
    }
});