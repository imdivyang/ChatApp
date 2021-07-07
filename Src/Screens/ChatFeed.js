import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Image, Button } from 'react-native';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';

const ChatFeed = ({ navigation }) => {
    const [userData, setUserData] = useState([]);


    const getUser = async () => {

        // const currentUser = auth().currentUser.uid;
        // console.log('Current User id');
        await firestore()
            .collection('users')
            .where("UserId", "!=", auth().currentUser.uid)
            .get()
            .then((result) => {
                const finalData = result.docs.map((data) => {
                    return data.data()

                })
                setUserData([...finalData])

            })

        // .onSnapshot((result) => {
        //     console.log('result', result.docs[0].data());
        // })
    }
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            getUser()
        }
    }, [isFocused])

    return (
        <View style={styles.container}>
            <FlatList
                data={userData}
                keyExtractor={item => item.UserId}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (

                    // ---------- Custom Chat Compponet call-------
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => {
                            navigation.navigate('CustomMessages',
                                { selectedUserId: item.UserId, userName: item.Name ? item.Name : item.Username, userImg: item.UserImg, }
                            )
                        }}
                    >
                        {/* ------- Gifted Chat Call --------- */}
                        {/* <TouchableOpacity
                        style={styles.card}
                        onPress={() => {
                            navigation.navigate('Messages',
                                {
                                    selectedUserId: item.UserId,
                                    userName: item.Name ? item.Name : item.Username,
                                    userImg: item.UserImg,
                                })
                        }}
                    > */}
                        <View style={styles.userInfo}>
                            <View style={styles.userImgWrapper}>
                                <Image style={styles.userImg}
                                    source={{
                                        uri: item?.UserImg ?
                                            item.UserImg || 'http://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png'
                                            :
                                            'http://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png'
                                    }}
                                />
                            </View>
                            <View style={styles.TextSection}>
                                <View style={styles.userInfoText}>
                                    <Text style={styles.userName}>{item.Name ? item.Name : item.Username}</Text>
                                    <Text style={styles.postTime}>{moment(item.createdAt.toDate()).fromNow()}</Text>
                                </View>
                                <Text style={styles.messageText}>Last Messages Text</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />

        </View>
    )
}

export default ChatFeed;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
        backgroundColor: '#1b2731'
        // backgroundColor: '#DEE9FD'
    },
    card: {
        width: '100%',
    },
    userInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    userImgWrapper: {
        paddingVertical: 15
    },
    userImg: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    TextSection: {
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 15,
        paddingLeft: 5,
        marginLeft: 10,
        width: 300,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
    userInfoText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    userName: {
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'OpenSans-Light',
        color: 'white'
    },
    postTime: {
        fontSize: 12,
        color: '#666',
        fontFamily: 'OpenSans-Light'
    },
    messageText: {
        fontSize: 14,
        color: '#e5e4e2'
    }
})
