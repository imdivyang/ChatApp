import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import { Send, Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import EmojiSelector, { Categories } from 'react-native-emoji-selector';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Messages = ({ route }) => {
    const [messages, setMessages] = useState([]);
    const { selectedUserId, userImg, userData } = route.params;
    const currentUser = auth().currentUser.uid;

    // const getAllMessage = async () => {
    //     const docId = selectedUserId > currentUser ? currentUser + "-" + selectedUserId : selectedUserId + "-" + currentUser
    //     const querySnapShot = await firestore()
    //         .collection('chatroom')
    //         .doc(docId)
    //         .collection('messages')
    //         .orderBy('createdAt', 'desc')
    //         .get()
    //     const AllMsg = querySnapShot.docs.map(docSnap => {
    //         return {
    //             ...docSnap.data(),
    //             createdAt: docSnap.data().createdAt.toDate()
    //         }
    //     })
    //     setMessages(AllMsg);
    // }

    useEffect(() => {

        const docId = selectedUserId > currentUser ? currentUser + "-" + selectedUserId : selectedUserId + "-" + currentUser
        const messageRef = firestore().collection('chatrooms')
            .doc(docId)
            .collection('messages')
            .orderBy('createdAt', 'desc')


        const unSubscribe = messageRef.onSnapshot((querySnap) => {
            const allmsg = querySnap.docs.map(docSanp => {
                const data = docSanp.data()
                if (data.createdAt) {
                    return {
                        ...docSanp.data(),
                        createdAt: docSanp.data().createdAt.toDate()
                    }
                } else {
                    return {
                        ...docSanp.data(),
                        createdAt: new Date()
                    }
                }
            })
            setMessages(allmsg)

        })
        return () => {
            unSubscribe()
        }

    }, [])


    const onSend = (messageArray) => {
        const msg = messageArray[0]
        const mymsg = {
            ...msg,
            senderId: currentUser,
            receiverId: selectedUserId,
            createdAt: new Date()
        }
        setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg))

        const docId = selectedUserId > currentUser ? currentUser + "-" + selectedUserId : selectedUserId + "-" + currentUser

        firestore().collection('chatrooms')
            .doc(docId)
            .collection('messages')
            .add({ ...mymsg, createdAt: firestore.FieldValue.serverTimestamp() })
            .then((data) => {
                console.log('====DaTa====', data);
            })

        // console.log('=====Message====', messages)
    }

    const scrollToBottomComponent = () => {
        return (
            <FontAwesome name='angle-double-down' size={22} color='#333' />
        )
    }

    const Emojis = () => {
        return (
            <EmojiSelector
                category={Categories.symbols}
                onEmojiSelected={emoji => console.log(emoji)}
            />
        )
    }

    const renderSend = (props) => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                <TouchableOpacity onPress={() => Emojis()}>
                    <MaterialIcons name='emoji-emotions' size={30} color='#3bb385' />
                </TouchableOpacity>
                <Send {...props}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 10, marginBottom: 5 }}>
                        <Icon name='send-circle' size={40} color='#3bb385' />
                    </View>
                </Send>
            </View>
        )
    }

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#3bb385',

                    },
                    left: {
                        backgroundColor: '#1b2731',

                    }
                }}
                textStyle={{
                    right: {
                        color: '#fff'
                    },
                    left: {
                        color: '#fff'
                    }
                }}
            />
        )
    }

    const customInputToolbar = props => {
        return (
            <InputToolbar
                {...props}
                containerStyle={{
                    backgroundColor: '#1b2731',
                    borderRadius: 20,
                    height: 50,
                    paddingLeft: 20,
                    // margin: 5
                }}
                textInputStyle={{ color: "#fff", }}

            />

        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <GiftedChat
                messages={messages}
                onSend={text => onSend(text)}
                user={{
                    _id: currentUser,
                }}
                renderBubble={renderBubble}
                alwaysShowSend
                renderSend={renderSend}
                scrollToBottom
                scrollToBottomComponent={scrollToBottomComponent}
                renderInputToolbar={props => customInputToolbar(props)}

            />
        </View>
    )
}

export default Messages

const styles = StyleSheet.create({})
