import React, { useEffect, useState } from 'react'
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert,
    KeyboardAvoidingView,
    ActivityIndicator,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native'
import Button from '../Component/Button';
import auth, { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import FormInput from '../Component/FormInput';
import { useFocusEffect } from '@react-navigation/native';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated, { color } from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import ModalView from '../Component/ModalView';
import Loader from '../Component/Loader';

const EditProfile = ({ navigation }) => {
    const [userData, setUserData] = useState(null);
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [modalVisible, setModalVisible] = useState(false)
    const [isFocused, setFocused] = useState(false);
    const [loading, setLoading] = useState(false);

    const getUser = async () => {
        await firestore()
            .collection('users')
            .doc(auth().currentUser.uid)
            .get()
            .then((result) => {
                if (result.exists) {
                    // console.log('Edit Profile User Data', result.data());
                    setUserData(result.data());
                    setImage(result.data().UserImg)
                    // console.log('User Iamge in Update Functiom=>>>>>>>>', result.data().UserImg);
                    // setImage(result.data().UserImg);
                }
            }).catch((error) => {
                console.log('Something went wrong with data', error)
            })
    }

    // console.log('User Data ->>>>>->>>', userData);


    const handleUpdate = async () => {
        // console.log('Handle Image Upload=>>>>', userData);
        // let imgUrl
        // if (isImg) {
        //     let imageUrl = await uploadImage();
        //     // setImage(imageUrl)
        //     setIsImg(false);
        // } else {
        //     setImage(userData.userImg);
        // }


        // console.log('iMAGE URL:=>>>>', imgUrl);
        // if (userData?.userImg == null) {
        //     imgUrl = await uploadImage();
        // }

        // let imgUrl = await uploadImage();

        // if (imgUrl == null && userData?.userImg) {
        //     imgUrl = userData.userImg;
        // }

        firestore()
            .collection('users')
            .doc(auth().currentUser.uid)
            .update({
                Username: userData.Username ? userData.Username : null,
                Name: userData.Name ? userData.Name : null,
                Email: userData.Email ? userData.Email : null,
                MobileNo: userData.MobileNo ? userData.MobileNo : null,
                UserImg: image ? image : null
            })
            .then(() => {
                getUser()
                console.log('User Updated!');
                Alert.alert(
                    'Profile Updated!',
                    'Your profile has been updated successfully.'
                )
            }).catch((error) => {
                console.log('Something went to wrong', error)
            })


    }

    const uploadImage = async (uri) => {
        if (uri == null) {
            return null;
        }
        const uploadUri = uri;
        // console.log('IMAGE URL WITHOUT TimeStamp:=====', uploadUri);
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        // console.log('File Name = ', filename)
        // Add timestamp to File Name
        const extension = uploadUri.split('.').pop();

        // const name = filename.split('.').slice(0, -1).join('.');

        // console.log('Name::::====', filename.split('.').join('.'));

        // filename = name + Date.now() + '.' + extension;


        // File name is the Same as Current User userId . 
        const currentUser = firebase.auth().currentUser.uid
        filename = currentUser + '.' + extension;
        console.log('Final File Name ======', filename);

        setUploading(true);
        setTransferred(0);

        const storageRef = storage().ref(`photos/${filename}`);
        const task = storageRef.putFile(uploadUri);


        console.log('TASK=>>', task);
        // Set transferred state
        task.on('state_changed', (taskSnapshot) => {
            setTransferred(
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100,
            );
        });

        setModalVisible(!modalVisible)
        setLoading(false)
        try {
            await task;
            const url = await storageRef.getDownloadURL();
            console.log('FIRESTORAGE URL:=>>', url);
            setUploading(false);
            setImage(url);
            // return url;
            setLoading(false)

        } catch (e) {
            console.log('wrrererer', e);
            return null;
        }

    };

    useEffect(() => {
        getUser();
    }, [])

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
            uploadImage(imageUri)
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
            setLoading(true)
        }))
    }

    const removeProfile = async () => {
        const currentUser = firebase.auth().currentUser.uid
        // let filename = currentUser + '.' + extension;
        let filename = image;
        filename = filename.substring(filename.lastIndexOf('/') + 1)
        console.log('Final File Name ======', filename);
        let extension = filename.split('.').pop().split('?')[0]
        console.log('extention File Name ======', extension);

        const storageRef = storage().ref(`photos/${currentUser}.${extension}`);
        console.log('File Name:=>', storageRef.fullPath);

        storageRef
            .delete(storageRef.fullPath)
            .then(() => {
                firestore()
                    .collection('users')
                    .doc(auth().currentUser.uid)
                    .update({
                        UserImg: null
                    })
            }).catch(error => {
                console.error('Something went wrong', error)
            })
        // try {
        //     await task;
        //     firestore()
        //         .collection('users')
        //         .doc(auth().currentUser.uid)
        //         .update({
        //             UserImg: null
        //         })
        //         .then(() => {
        //             getUser()
        //             console.log('User Updated!');
        //             Alert.alert(
        //                 'Profile Updated!',
        //                 'Your profile has been updated successfully.'
        //             )
        //         }).catch((error) => {
        //             console.log('Something went to wrong', error)
        //         })
        // } catch (e) {
        //     console.log('wrrererer', e);
        //     return null;
        // }

    }

    // console.log('IMAGE:', userData.UserImg)
    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>

                    <Image
                        // source={{
                        //     uri: image ? image : userData?.UserImg ?
                        //         userData.UserImg || 'http://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png'
                        //         :
                        //         'http://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png'
                        // }}
                        source={{
                            uri: image ? image :
                                'http://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png'
                        }}
                        style={styles.profileImg}
                    />

                    <MaterialCommunityIcons
                        name="camera"
                        size={20}
                        color="#fff"
                        style={{
                            borderRadius: 50,
                            padding: 7,
                            position: 'absolute',
                            top: 100,
                            left: 85,
                            backgroundColor: '#319688',
                            color: 'white'
                        }}
                    />


                </TouchableOpacity>
            </View>

            <View style={{ marginTop: 50, width: '90%', alignItems: 'center' }}>
                <FormInput
                    title='User Name'
                    text={userData ? userData.Username : ''}
                    onChangeText={(txt) => setUserData({ ...userData, Username: txt })}
                />
                <FormInput
                    title='Enter Name'
                    text={userData ? userData.Name : ''}
                    onChangeText={(txt) => setUserData({ ...userData, Name: txt })}

                />
                <FormInput
                    title='Email'
                    text={userData ? userData.Email : ''}
                    onChangeText={(txt) => setUserData({ ...userData, Email: txt })}
                    keyboardType='email-address'
                />
                <FormInput
                    title='Mobile No.'
                    text={userData ? userData.MobileNo : ''}
                    onChangeText={(txt) => setUserData({ ...userData, MobileNo: txt })}
                    keyboardType='phone-pad'
                />
                {
                    uploading ? (
                        <View style={styles.StatusWrapper}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#319688', marginRight: 10 }}>{transferred}%</Text>
                            <ActivityIndicator size='large' color="##319688" />
                        </View>

                    ) : (
                        <Button
                            title='Save'
                            onPress={() => {

                                handleUpdate()
                            }}
                        />
                    )
                }
            </View>

            {modalVisible && <ModalView
                visible={modalVisible}
                openCamera={() => takePhotoFromCamera()}
                openLibarary={() => choosePhotoFromLibrary()}
                removeProfile={() => removeProfile()}
                showModal={() => setModalVisible(true)}
                closeModal={() => setModalVisible(!modalVisible)}
            />}
            {loading ? <Loader isLoading={loading} /> : null}
        </KeyboardAvoidingView >
    )
}

export default EditProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 20,

        backgroundColor: '#1b2731'
    },
    profileImg: {
        height: 130,
        width: 130,
        borderRadius: 75,
        backgroundColor: 'white',
        // marginTop: 50
    },
    textStyles: {
        fontSize: 22,
        color: 'white',
        letterSpacing: 1.3
    },
    StatusWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
})
