import React, { useCallback, useEffect, useState } from 'react';
import SettingsModal from './SettingsModal';
import useStorage from '../Hooks/useStorage';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import {getComplication} from "../Classes/complecations";
import SettingsSVG from "../Icons/SettingSVG";
import RefreshSVG from "../Icons/RefreshSVG";
import AddRowSVG from "../Icons/AddRowSVG";
import { Audio } from 'expo-av';
import Scoring from "./Scoring";
import {AdMobInterstitial} from "expo-ads-admob";

export default function Header({score, level, effect, setEffect, setAddRow, addRow, setRefresh}) {
    const {getData, storeData} = useStorage();
    const [modalVisible, setModalVisible] = useState(false);
    const [sound, setSound] = useState(false);
    const [music, setMusic] = useState(null);

    const onSound = useCallback(async () => {
        try{
            await storeData('sound', (!sound).toString());
            setSound(!sound);
        }catch (e) {
            console.log(e);
        }
    }, [setSound, sound, storeData]);

    const onEffect = useCallback(async () => {
        try{
            await storeData('effect', (!effect).toString());
            setEffect(!effect);
        }catch (e) {
            console.log(e);
        }
    }, [setEffect, effect, storeData]);

    const soundChangeHandler = useCallback(async ()=> {
        try{
            if (music){
                if (sound){
                    await music.playAsync();
                } else {
                    await music.stopAsync();
                }
            }

        }catch (e) {
            console.log(e)
        }
    }, [sound, music]);

    const initRewardAds = useCallback(async () => {
        try{
            await AdMobInterstitial.requestAdAsync();
            await AdMobInterstitial.showAdAsync();
            setAddRow(true);
        }catch (e) { }
    }, [setAddRow]);

    const init = useCallback(async () => {
        try{
            const { sound } = await Audio.Sound.createAsync(
                require('../../assets/sound.mp3')
            );
            await sound.setVolumeAsync(0.3);
            await sound.setIsLoopingAsync(true);
            setMusic(sound);
            const canS = (await getData('sound')) === 'true';
            setSound(canS);
            await AdMobInterstitial.setAdUnitID("ca-app-pub-1811884588047510/2967038565");
        }catch (e) {
            console.log(e);
        }
    }, [setMusic, sound, getData, setSound]);

    useEffect(soundChangeHandler, [sound, music]);
    useEffect(init, []);

    return (
        <View>
            <View style={styles.header}>
                <View style={styles.flex}>
                    <View>
                        <Pressable onPress={() => setModalVisible(true)}>
                            <SettingsSVG  />
                        </Pressable>
                    </View>
                    <View style={styles.flexRow}>
                        {!!level &&
                            <View style={{marginLeft: 15}}>
                                <Pressable onPress={() => setRefresh(true)}>
                                    <RefreshSVG />
                                </Pressable>
                            </View>
                        }
                        {!!level && !addRow && getComplication(level) && getComplication(level).addRow &&
                            <View style={{marginLeft: 15}}>
                                <Pressable onPress={initRewardAds}>
                                    <AddRowSVG />
                                </Pressable>
                            </View>
                        }
                        <View style={{marginLeft: 15}}>
                            <Scoring score={score} />
                        </View>
                    </View>
                </View>
            </View>

            {modalVisible &&
                <SettingsModal
                    sound={sound}
                    effect={effect}
                    onSound={onSound}
                    onEffect={onEffect}
                    setModalVisible={setModalVisible}
                    modalVisible={modalVisible}
                  />
            }
        </View>
    );
}


const styles = StyleSheet.create({
    header: {
        paddingTop: 50,
        paddingLeft: 20,
        paddingRight: 20
    },
    flex: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    flexRow: {
        flexDirection: "row"
    }
});
