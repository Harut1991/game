import React from "react";
import {Modal, StyleSheet, View, Text, Pressable, ImageBackground} from "react-native";
import {useFonts} from "expo-font";
import Background from "../../assets/win.png";
import LineSVG from "../Icons/LineSVG";



export default function WinModal({ onClickNext, modalVisible, level }) {
    const [loaded] = useFonts({
        MochiyPopOne: require('../../assets/MochiyPopOne-Regular.ttf'),
    });
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
                                            {loaded && <Text style={{ fontSize: 24, fontFamily: "MochiyPopOne", color: '#FCAD51'}}>Complate</Text>}
                                            <Text  style={{ paddingTop: 6, marginLeft: 7}}><LineSVG /></Text>
                                        </View>
                                        <View style={styles.c2}>
                                            <Text style={{ fontSize: 20,fontFamily: "MochiyPopOne", color: 'white'}}>Level {level > 75 ? 1: level+1}</Text>
                                            <Pressable onPress={onClickNext}>
                                                <Text style={{ fontSize: 25, fontFamily: "MochiyPopOne", color: '#FCAD51', paddingTop: 40}}>Next</Text>
                                            </Pressable>
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
    c1: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    c2: {
        flex: 1,
        alignItems: 'center',
        position: 'relative',
        paddingTop: 40,
        paddingLeft: 40,
        paddingRight: 40
    },
    main: {
        flex: 1,
        alignItems: 'center',
        position: 'relative',
        paddingLeft: 40,
        paddingRight: 40
    },
    centeredView: {
        flex: 1,
        alignItems: "center",
        marginTop: '40%'
    },
    modalView: {
        width: '70%',
        height: 260,
    },
    button: {
        borderRadius: 20
    }
});

