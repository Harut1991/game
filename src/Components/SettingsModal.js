import React from "react";
import { Modal, StyleSheet, View } from "react-native";

export default function SettingsModal({ 
    modalVisible, setModalVisible,
    sound, effect,
    onSound, onEffect
}) {
    return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.settingsModal}>
                    <p onClick={() => setModalVisible(false)}>x</p>
                    <p onClick={onSound}>sound- {sound ? 'on': 'off'}</p>
                    <p onClick={onEffect}>effect - {effect  ? 'on': 'off'}</p>
                </View>
            </Modal>
    );
}

const styles = StyleSheet.create({
    settingsModal: {
        height: 100,
        width: 100,
        backgroundColor: 'red'
    }
});