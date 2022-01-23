import React from "react";

import {Modal, StyleSheet, View, Text, Pressable, ImageBackground} from "react-native";
import LineSettingsSVG from "../Icons/LineSettingsSVG";
import Background from "../../assets/settings.png";
import EffectOffSVG from "../Icons/EffectOffSVG";
import EffectOnSVG from "../Icons/EffectOnSVG";
import SoundOffSVG from "../Icons/SoundOffSVG";
import SoundOnSVG from "../Icons/SoundOnSVG";
import CloseSVG from "../Icons/CloseSVG";
import {useFonts} from "expo-font";

export default function SettingsModal({
         modalVisible, setModalVisible,
         sound, effect,
         onSound, onEffect
     }) {
    const [loaded] = useFonts({
        MochiyPopOne: require('../../assets/MochiyPopOne-Regular.ttf'),
    });
    return (
        <Modal
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View
                        style={styles.container}>
                        <Pressable onPress={() => setModalVisible(false)}><CloseSVG /></Pressable>
                    </View>
                    <ImageBackground
                        source={Background} style={styles.img}
                        imageStyle={{resizeMode: 'cover'}}>
                            <View>
                                <View style={styles.imgContainer}>
                                    <Text style={{ paddingTop: 6, marginRight: 7}}><LineSettingsSVG /></Text>
                                    {loaded && <Text style={{ fontSize: 22, fontFamily: "MochiyPopOne", color: '#FCAD51'}}>Settings</Text>}
                                    <Text  style={{ paddingTop: 6, marginLeft: 7}}><LineSettingsSVG /></Text>
                                </View>
                                <View style={{paddingRight: 45, paddingLeft: 45, marginTop: 20}}>
                                    <Pressable onPress={onSound}>
                                        <View style={{backgroundColor: '#FCAD51', borderRadius: 5, paddingLeft: 20, paddingTop: 5, paddingBottom: 6}}>
                                            {loaded && <Text style={{fontSize: 16, fontFamily: "MochiyPopOne", color: 'white'}}>Sound</Text>}
                                            <View style={{position: 'absolute', right: 11, top: 5}}>
                                                {sound ? <SoundOnSVG />: <SoundOffSVG />}
                                            </View>
                                        </View>
                                    </Pressable>

                                    <Pressable onPress={onEffect}>
                                        <View style={{marginTop: 20, backgroundColor: '#FCAD51', borderRadius: 5, paddingLeft: 20, paddingTop: 5, paddingBottom: 6}}>
                                            <Text style={{fontSize: 16, fontFamily: "MochiyPopOne", color: 'white'}}>Effects</Text>
                                            <View style={{position: 'absolute', right: 21, top: 8}}>
                                                {effect ? <EffectOnSVG />: <EffectOffSVG />}
                                            </View>
                                        </View>
                                    </Pressable>
                                </View>
                            </View>
                    </ImageBackground>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    imgContainer: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginTop: 17
    },
    img: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        overflow: 'hidden'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute', right: -10, top: -10, zIndex: 2,
        backgroundColor: '#FCAD51',
        height: 30, width: 30, borderRadius: 50
    },
    centeredView: {
        flex: 1,
        alignItems: "center",
        marginTop: '40%',

    },
    modalView: {
        width: '60%',
        height: 190,
    }
});

