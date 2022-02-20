import React, {useCallback, useEffect, useState} from "react";
import {Modal, StyleSheet, View, Text, Pressable, ImageBackground} from "react-native";
import {useFonts} from "expo-font";
import Background from "../../assets/fail.png";
import LineSVG from "../Icons/LineSVG";
import RefreshSVG from "../Icons/RefreshSVG";
import VideoSVG from "../Icons/VideoSVG";
import Scoring from "./Scoring";
import {defaultHeart} from "../Classes/complecations";
import {AdMobRewarded} from "expo-ads-admob";

export default function FailModal({ modalVisible, failRefreshHandler, onContinue, score, setScore}) {
    const [loaded] = useFonts({
        MochiyPopOne: require('../../assets/MochiyPopOne-Regular.ttf'),
    });

    const onScore = useCallback(() => {
        if (score >= defaultHeart){
            setScore(score - defaultHeart);
            onContinue();
        }
    }, [score, setScore, onContinue]);

    const initRewardAds = async () => {
        try{
            await AdMobRewarded.requestAdAsync();
            await AdMobRewarded.showAdAsync();
        }catch (e) { }
    };

    const init = useCallback(async () => {
        try{
            await AdMobRewarded.setAdUnitID("ca-app-pub-1811884588047510/5018486836");
        }catch (e) {
        }

        AdMobRewarded.addEventListener("rewardedVideoUserDidEarnReward", () =>{
            onContinue();
        });
    }, [onContinue]);

    const clearStates = useCallback(() => () => {
        AdMobRewarded.removeAllListeners();
    }, []);

    useEffect(init, []);
    useEffect(clearStates, []);

    return (
        <View>
            <Modal
                // animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <ImageBackground source={Background} style={{width: '100%', height: '100%', borderRadius: 10, overflow: 'hidden'}} imageStyle={{resizeMode: 'cover'}}>
                            <View style={styles.main}>
                                    <View style={{paddingTop: 30}}>
                                        <View style={styles.c1}>
                                            <Text style={{ paddingTop: 6, marginRight: 7}}><LineSVG /></Text>
                                            {loaded && <Text style={{ fontSize: 24, fontFamily: "MochiyPopOne", color: '#FCAD51'}}>You Lost</Text>}
                                            <Text  style={{ paddingTop: 6, marginLeft: 7}}><LineSVG /></Text>
                                        </View>
                                        <View style={styles.c2}>
                                            <View>
                                                <Pressable onPress={failRefreshHandler}>
                                                    <RefreshSVG />
                                                </Pressable>
                                            </View>
                                            <View>
                                                <Pressable onPress={initRewardAds}>
                                                    <VideoSVG />
                                                </Pressable>
                                            </View>
                                            <View>
                                                <Pressable onPress={onScore}>
                                                    <Scoring score={score} />
                                                </Pressable>
                                            </View>
                                        </View>
                                    </View>
                            </View>
                        </ImageBackground>
                    </View>
                </View>
            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({
    main:{
        flex: 1,
        alignItems: 'center',
        position: 'relative',
        paddingLeft: 40,
        paddingRight: 40
    },
    c1: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    c2: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'relative',
        paddingTop: 20
    },
    centeredView: {
        flex: 1,
        alignItems: "center",
        marginTop: '40%'
    },
    modalView: {
        width: '70%',
        height: 200,
    },
    button: {
        borderRadius: 20
    }
});

