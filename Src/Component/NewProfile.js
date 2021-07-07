import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, Touchable, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Button from '../Component/Button';
import auth, { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/FontAwesome5';

const Profile = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate('Edit')}>
                    <Icon name='edit' size={30} color='#3bb385' />
                </TouchableOpacity>

                <Image
                    // source={{
                    //     uri: 'http://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png'
                    // }}
                    source={require('../Assets/Images/users/user-2.jpg')}
                    style={styles.profileImg}
                />

            </View>
            <View style={styles.contentContainer}>
                <Text style={{ fontSize: 35, color: '#3bb385', marginBottom: 20, textTransform: 'uppercase', letterSpacing: 2 }}>Divyang Parekh</Text>
                <Text style={styles.textStyles}>User Name</Text>
                <Text style={styles.textStyles}>Email</Text>
                <Text style={styles.textStyles}>Mobile no</Text>
                <TouchableOpacity
                    style={styles.LogoutBtn}
                    onPress={async () => {
                        try {
                            auth().signOut()
                        } catch (error) {
                            console.log('Error', error)
                        }
                    }}

                >
                    <AntDesign name='logout' size={40} color='#3bb385' />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#1b2731'
    },
    imageContainer: {
        justifyContent: 'space-between',
        // backgroundColor: 'red',
        flexDirection: 'row',
        height: '55%',
        width: '100%',
    },
    editBtn: {
        marginTop: 20,
        marginLeft: 20,
    },
    contentContainer: {
        height: '45%',
        width: '80%'
    },
    profileImg: {
        height: 400,
        width: 400,
        borderRadius: 200,
        // position:''
        left: 80,
        top: -30
    },

    LogoutBtn: {
        backgroundColor: '#1b2731',
        marginLeft: '85%',
        marginTop: 70,
        justifyContent: 'flex-end'
    },
    textStyles: {
        fontSize: 20,
        marginBottom: 8,
        // color: '#3bb385',
        color: '#c3f7df',
        letterSpacing: 1.8,
    }
})
