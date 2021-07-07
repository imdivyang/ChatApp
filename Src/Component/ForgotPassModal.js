import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, TextInput, Touchable, TouchableOpacity } from "react-native";
import FormInput from './FormInput';


const ForgotPassModal = ({ closeModal, visible, onPress }) => {

    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={() => closeModal()}
            >
                <TouchableOpacity activeOpacity={3} style={styles.centeredView} onPress={() => closeModal()}>
                    <View style={styles.modalView}>
                        <Text style={styles.forgotText}>Forgot Password ?</Text>
                        <Image style={styles.userImg} source={require('../Assets/code_alchemy_logo.png')} />
                        <Text style={styles.headText}>Enter the email address or Mobile No Associated with your Account</Text>
                        <Text style={styles.infoText}>we will send you the OTP to your mail or a Mobile No.</Text>

                        <TextInput
                            placeholder='EMAIL or MOBILE No.'
                            placeholderTextColor='#aaaaaa'
                            style={styles.textInput}
                        />

                        <TouchableOpacity
                            style={styles.sendBtn}
                            onPress={() => {
                                onPress()
                            }}>
                            <Text style={styles.textStyle} >Send</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}

export default ForgotPassModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        width: '90%',
        margin: 20,
        backgroundColor: "#1b2731",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10
    },
    forgotText: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
        color: '#3bb385'
    },
    userImg: {
        height: 150,
        width: 150,
        borderRadius: 75
    },
    headText: {
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 20,
        color: '#3bb385'
    },
    infoText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        color: '#aaaaaa'
    },
    textInput: {
        borderBottomWidth: 1,
        borderColor: '#3bb385',
        width: '100%',
        textAlign: 'center',
        marginBottom: 20,
        color: '#fff'
    },
    sendBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 120,
        backgroundColor: '#3bb385',
        borderRadius: 20,
        shadowColor: "#3bb385",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },

    textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        color: '#fff'
    },

});
