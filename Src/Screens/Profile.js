import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import Button from '../Component/Button';
import auth, { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/FontAwesome5';


const Profile = ({ navigation }) => {

    const [userData, setUserData] = useState(null);
    // const [currentUserId, setCurrentUserId] = useState(null);

    // const currentUserId = async () => {
    //     return await firestore()
    //         .collection('users')
    //         .doc(auth().currentUser.uid)
    //         .get()
    //         .then((result) => {
    //             console.log('CURRENT USER ID=====*', result.data().UserId)
    //         })

    // }console.log('CURRENT USER ID=====', currentUserId());


    // useEffect(() => {
    //     if (isFocused) {

    //         const currentUser = firebase.auth().currentUser.uid
    //         getUser(currentUser)
    //         setCurrentUserId(currentUser)
    //     }
    // }, [isFocused])


    // console.log('Current User::::', currentUser);
    // const getUser = async (uid) => {


    // console.log('GET User..', auth().currentUser.uid)
    // console.log('Current User Outter of the Condition',);
    // const user = auth().currentUser
    // if (user) {
    //     console.log('current user  == ', user.uid);
    //     // const ref = await firestore().collection('users').doc(currentUserId)
    // }
    // if (currentUserId != null) {
    // debugger
    // // console.log('Current User Inner of the Condition', currentUserId);
    // const ref = await firestore().collection('users').doc(uid)
    // console.log('Ref====', ref);
    // ref
    //     .get()
    //     .then((result) => {
    //         // console.log('Current User Inside of the Condition', currentUserId);
    //         console.log('REsult', result);
    //         if (result.exists) {
    //             setUserData({ ...result.data() });
    //         }
    //     }).catch((error) => {
    //         console.log('Something Went Wrong====', error)
    //     })
    // // }

    // }

    // useFocusEffect is one type of hook similar like as useEffect only difference is that it will execute when the particular Screen is Focused

    // 


    // useFocusEffect(() => {
    //     {
    //         console.log('Inner', isFocused);

    //         // ? (
    //         //     getUser()
    //         // ) : null
    //     }
    // })


    // useEffect(() => {
    //     if (isFocused && currentUserId) {

    //         getUser();

    //     }
    // }, [isFocused, currentUserId])
    // useEffect(() => {
    //     if (isFocused && currentUserId) {
    //         getUser();
    //     }

    // })


    // console.log('USER DATA::', userData);
    // const userImage = userData.UserImg;
    // console.log(userImage);

    const currentUser = firebase.auth().currentUser.uid



    const getUser = async () => {
        await firestore()
            .collection('users')
            .doc(currentUser)
            .get()
            .then((result) => {
                setUserData({ ...result?.data() })
            })
    }

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            getUser()
        }
    }, [isFocused])

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate('Edit')}>
                    <Icon name='edit' size={30} color='#3bb385' />
                </TouchableOpacity>

                <Image
                    source={{
                        uri: userData?.UserImg ?
                            userData.UserImg || 'http://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png'
                            :
                            'http://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png'
                    }}
                    style={styles.profileImg}
                />

            </View>
            <View style={styles.contentContainer}>
                <Text style={{ fontSize: 35, color: '#3bb385', marginBottom: 20, textTransform: 'uppercase', letterSpacing: 2 }}>{userData?.Name == null ? 'Name' : userData.Name}</Text>
                <Text style={styles.textStyles}>{userData?.Username == null ? 'User Name' : userData.Username}</Text>
                <Text style={styles.textStyles}>{userData?.Email == null ? 'Email' : userData.Email}</Text>
                <Text style={styles.textStyles}>{userData?.MobileNo == null ? 'Mobile no.' : userData.MobileNo}</Text>
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
        // backgroundColor: '#DEE9FD'
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
        color: '#c3f7df',
        letterSpacing: 1.8,
    }
})
