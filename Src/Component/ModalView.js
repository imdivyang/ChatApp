import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity, Image } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'
const ModalView = ({ openCamera, openLibarary, closeModal, visible, removeProfile }) => {

    return (

        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => closeModal()}
        >
            <TouchableOpacity activeOpacity={3} style={styles.centeredView} onPress={() => closeModal()}>
                <View style={styles.modalView}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.panelTitle}>Upload Photo</Text>
                        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.panelButton}
                        onPress={() => removeProfile()}
                    >
                        <MaterialIcons
                            name="account-remove"
                            size={25}
                            backgroundColor="#1b2731"
                            color="#000"
                        />
                        <Text style={styles.panelButtonTitle}>Remove Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.panelButton}
                        onPress={() => openCamera()}>
                        <Ionicons
                            name="camera"
                            size={25}
                            backgroundColor="#1b2731"
                            color="#000"
                        />
                        <Text style={styles.panelButtonTitle}>Take Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.panelButton}
                        onPress={() => openLibarary()}>
                        <Image source={require('../Assets/Images/gallery.png')} style={{ height: 25, width: 25, }} />
                        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.panelButton}
                        onPress={() => closeModal()}>
                        <MaterialIcons
                            name="cancel"
                            size={25}
                            backgroundColor="#1b2731"
                            color="#000"
                        />
                        <Text style={styles.panelButtonTitle}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>

    )
}

export default ModalView

const styles = StyleSheet.create({
    centeredView: {
        height: '100%',
        width: '100%',
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    modalView: {
        height: 400,
        width: 350,
        margin: 20,
        backgroundColor: "#1b2731",
        borderRadius: 20,
        padding: 30,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    panelTitle: {
        fontSize: 27,
        height: 35,
        color: 'white'
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        flexDirection: 'row',
        width: '100%',
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#3bb385',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 10
    },

})
