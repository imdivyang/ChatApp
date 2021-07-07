import React, { useEffect, useState } from 'react'
import { StyleSheet, TextInput, View, TouchableOpacity, KeyboardAvoidingView, FlatList } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LeftBubble from '../Component/LeftBubble';
import RightBubble from '../Component/RightBubble';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import MessageImageModal from '../Component/MessageImageModal';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage'
import Loader from '../Component/Loader';




const CustomMessages = ({ route, navigation }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [currentUserProfile, setCurrentUserProfile] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);


    const { selectedUserId, userImg } = route.params;
    const currentUser = auth().currentUser.uid;



    const create_UUID = () => {
        let dt = new Date().getTime();
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                    <Ionicons.Button
                        name="camera"
                        size={25}
                        backgroundColor="#1b2731"
                        color="#3bb385"
                        onPress={() => setModalVisible(true)}
                    />
                </View>
            ),
        })
    })


    useEffect(() => {

        firestore()
            .collection('users')
            .doc(currentUser)
            .get()
            .then((data) => {
                setCurrentUserProfile(data.data().UserImg);
            })


        const docId = selectedUserId > currentUser ? currentUser + "-" + selectedUserId : selectedUserId + "-" + currentUser
        const messageRef = firestore().collection('customMessages')
            .doc(docId)
            .collection('messages')
            .orderBy('createdAt', 'asc')


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

    const onSend = async () => {

        const msgObj = {
            _id: create_UUID(),
            msgImage: null,
            message: message,
            senderId: currentUser,
            receiverId: selectedUserId,
            createdAt: firestore.FieldValue.serverTimestamp()
        }

        const docId = selectedUserId > currentUser ? currentUser + "-" + selectedUserId : selectedUserId + "-" + currentUser
        await firestore()
            .collection('customMessages')
            .doc(docId)
            .collection('messages')
            .add(msgObj)
            .then(() => {
                setMessage('');
            })
            .catch((error) => {
                console.log('error', error);
            })


    }

    const uploadImage = async (uri) => {

        if (uri == null) {
            return null;
        }
        const uploadUri = uri;
        console.log('IMAGE URL WITHOUT TimeStamp:=====', uploadUri);
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        console.log('File Name = ', filename)
        // Add timestamp to File Name
        // const extension = uploadUri.split('.').pop();

        // const name = filename.split('.').slice(0, -1).join('.');

        // console.log('Name::::====', filename.split('.').join('.'));

        // filename = name + Date.now() + '.' + extension;


        // ========> File name is the Same as Current User userId <==========. 
        // const currentUser = auth().currentUser.uid
        // filename = filename + '.' + extension;
        // console.log('Final File Name ======', filename);


        const storageRef = storage().ref(`messages/${filename}`);
        const task = storageRef.putFile(uploadUri);

        setModalVisible(!modalVisible)
        setLoading(false)
        try {
            await task;
            const url = await storageRef.getDownloadURL();
            // console.log('FIRESTORAGE URL:=>>', url);

            setImage(url);
            // return url;

            const msgObj = {
                _id: create_UUID(),
                msgImage: url,
                message: null,
                senderId: currentUser,
                receiverId: selectedUserId,
                createdAt: firestore.FieldValue.serverTimestamp()
            }
            const docId = selectedUserId > currentUser ? currentUser + "-" + selectedUserId : selectedUserId + "-" + currentUser
            await firestore()
                .collection('customMessages')
                .doc(docId)
                .collection('messages')
                .add(msgObj)
                .then(() => {
                    setMessage('');
                })
                .catch((error) => {
                    console.log('error', error);
                })
            setLoading(false)

        } catch (e) {
            console.log('wrrererer', e);
            return null;
        }

    };


    const imageOptions = {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 400,
        didCancel: true,
        quality: 0.5,
        includeBase64: true,
    }

    const choosePhotoFromLibrary = () => {
        launchImageLibrary(imageOptions, ((image) => {
            if (!image || image.didCancel || !image.assets[0].uri) {
                return;
            }
            const imageUri = image.assets[0].uri;
            uploadImage(imageUri);
            setLoading(true)
        }))
    }


    const takePhotoFromCamera = () => {
        launchCamera(imageOptions, ((image) => {
            if (!image || image.didCancel || !image.assets[0].uri) {
                return;
            }
            const imageUri = image.assets[0].uri;
            console.log('imageURICamera:=>', imageUri);
            // setImage(imageUri);
            uploadImage(imageUri)
            //setIsImg(true);
            setLoading(true)
        }))
    }


    return (
        // <KeyboardAvoidingView
        //     behavior={'padding'}
        //     keyboardVerticalOffset={-250}
        //     style={styles.container}
        // >

        //     <View style={styles.msgContainer}>
        //         <FlatList
        //             data={messages}
        //             keyExtractor={item => item._id}
        //             renderItem={({ item }) => {
        //                 return (
        //                     <View >

        //                         {item.senderId == currentUser ? (
        //                             <RightBubble msg={item.message} />

        //                         ) : (
        //                             <LeftBubble msg={item.message} />
        //                         )}
        //                     </View>
        //                 )
        //             }}
        //         />
        //     </View>
        //     <View style={styles.bottomContainer}>
        //         <View style={styles.inputContainer}>
        //             <TextInput
        //                 placeholder={'Type a message'}
        //                 placeholderTextColor='grey'
        //                 style={styles.input}
        //                 onChangeText={text => setMessage(text)}
        //                 value={message}
        //                 underlineColorAndroid={'transparent'}
        //             />
        //             <TouchableOpacity onPress={() => { }} style={{ marginTop: 8 }}>
        //                 <MaterialIcons name='emoji-emotions' size={30} color='#3bb385' />
        //             </TouchableOpacity>
        //         </View>
        //         <TouchableOpacity
        //             activeOpacity={0.7}
        //             onPress={() => onSend()}
        //             style={styles.msgSendContainer}>
        //             <Ionicons
        //                 name='md-send'
        //                 size={30}
        //                 color='#1b2731'
        //             />
        //         </TouchableOpacity>
        //     </View>

        // </KeyboardAvoidingView>
        <KeyboardAvoidingView
            behavior={'padding'}
            keyboardVerticalOffset={-250}
            style={styles.container}
        >
            <View style={{ marginBottom: 60, }}>
                <FlatList
                    extraData={messages.message}
                    data={messages}
                    keyExtractor={item => item._id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <View >
                                {item.senderId == currentUser ? (
                                    <RightBubble
                                        msg={item.message}
                                        selectedUserId={selectedUserId}
                                        Time={moment(item.createdAt).format('LT')}
                                        userImg={currentUserProfile}
                                        msgImg={item.msgImage ? item.msgImage : null}
                                    />
                                ) : (
                                    <LeftBubble
                                        msg={item.message}
                                        selectedUserId={selectedUserId}
                                        userImg={userImg}
                                        Time={moment(item.createdAt).format('LT')}
                                        msgImg={item.msgImage ? item.msgImage : null}
                                    />
                                )}
                            </View>
                        )
                    }}
                />
            </View>


            <View style={styles.bottomContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder={'Type a message'}
                        placeholderTextColor='grey'
                        style={styles.textInput}
                        onChangeText={text => setMessage(text)}
                        value={message}
                        underlineColorAndroid={'transparent'}
                    />
                    <TouchableOpacity onPress={() => { }} style={{ marginRight: 10 }} >
                        <MaterialIcons name='emoji-emotions' size={30} color='#3bb385' />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                        { message != '' ? onSend() : null; }
                    }}
                    // onPress={() => { }}
                    style={styles.sendBtn}>
                    <Ionicons
                        style={{ marginLeft: 3 }}
                        name='md-send'
                        size={30}
                        color='#1b2731'
                    />
                </TouchableOpacity>
            </View>


            {modalVisible && <MessageImageModal
                visible={modalVisible}
                openCamera={() => takePhotoFromCamera()}
                openLibarary={() => choosePhotoFromLibrary()}
                removeProfile={() => removeProfile()}
                showModal={() => setModalVisible(true)}
                closeModal={() => setModalVisible(!modalVisible)}
            />}

            {loading ? <Loader isLoading={loading} /> : null}
        </KeyboardAvoidingView>

    )
}

export default CustomMessages

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     // backgroundColor: 'red'
    // },
    // msgContainer: {
    //     // backgroundColor: 'green',
    //     flex: 1,
    //     // paddingVertical: 80,
    //     justifyContent: 'flex-end',
    //     alignSelf: 'flex-end'
    // },
    // bottomContainer: {
    //     // backgroundColor: 'yellow',
    //     flexDirection: 'row',
    //     position: 'absolute',
    //     bottom: 10,
    //     // paddingHorizontal: 10,
    //     marginHorizontal: 10
    // },
    // inputContainer: {
    //     flexDirection: 'row',
    //     backgroundColor: '#1b2731',
    //     height: 50,
    //     flex: 0.92,
    //     // borderWidth: 1,
    //     borderRadius: 20,
    //     // borderColor: 'black',
    // },
    // input: {
    //     height: 50,
    //     flex: 0.92,
    //     paddingHorizontal: 10,
    //     fontSize: 20,
    //     color: 'white',
    //     marginLeft: 10
    // },
    // msgSendContainer: {
    //     height: 50,
    //     flex: 0.15,
    //     // borderWidth: 1,
    //     borderRadius: 25,
    //     marginLeft: 10,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: '#3bb385',
    //     paddingLeft: 2,
    //     marginRight: 5
    // },
    container: {
        flex: 1,
        backgroundColor: '#DEE9FD'
    },
    bottomContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 5
    },
    inputContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '82%',
        backgroundColor: '#1b2731',
        borderRadius: 20,
        marginLeft: 5
    },
    textInput: {
        marginLeft: 10,
        width: '80%',
        color: 'white',
        fontSize: 16
    },
    sendBtn: {
        backgroundColor: '#3bb385',
        marginLeft: 15,
        padding: 8,
        borderRadius: 30
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
})
