import React from "react";
import { ActivityIndicator, StyleSheet, Text, View, Modal } from "react-native";

const Loader = ({ isLoading }) => (
    isLoading ? (
        <Modal
            animationType="fade"
            transparent={true}
            visible
            style={styles.container}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <ActivityIndicator size='large' color='#3bb385' />
                </View>
            </View>
        </Modal>
    ) : (
        null
    )
);

const styles = StyleSheet.create({
    centeredView: {
        height: '100%',
        width: '100%',
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    modalView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        width: 70,
        backgroundColor: "#1b2731",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

    },

})

export default Loader;