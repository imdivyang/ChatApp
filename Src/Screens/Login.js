import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Touchable } from 'react-native'
import FormInput from '../Component/FormInput';
import Button from '../Component/Button';
import validator from 'validator';
import auth from '@react-native-firebase/auth';
import SocialButton from '../Component/SocialButton';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import Ionicons from 'react-native-vector-icons/Ionicons'
import ForgotPassModal from '../Component/ForgotPassModal';

const validateField = (email, password) => {
    const isValid = {
        email: validator.isEmail(email),
        password: validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })
    };
    return isValid
}

const emailValid = (email) => {
    const isEmail = {
        email: validator.isEmail(email)
    }
    return isEmail.email
}

const passwordValid = (password) => {
    const isPassword = {
        password: validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })
    }
    return isPassword.password
}

const LoginUser = async (email, password) => {
    try {
        await auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('Login')
            })

    } catch (error) {
        console.log(error)
    }
}

const GoogleLogin = async () => {
    try {
        // Get The userID Token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        //Sign In With User Credential

        await auth().signInWithCredential(googleCredential);

    } catch (error) {
        console.log('Google Login', error)
    }
}
const faceBookLogIn = async () => {
    try {
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
        if (result.isCancelled) {
            throw 'User Cancelled the login Process';
        }
        const data = await AccessToken.getCurrentAccessToken();
        if (!data) {
            throw 'Something went wrong obtaining access token';
        }
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
        await auth().signInWithCredential(facebookCredential);
    } catch (error) {
        console.log({ error })
    }
}

const Login = ({ navigation }) => {
    const [email, setEmail] = useState({
        // text: 'Admin@gmail.com',
        text: '',
        errorMessage: ''
    });
    const [password, setPassword] = useState({
        // text: 'Di@84693',
        text: '',
        errorMessage: ''
    });
    const [isSecureText, setSecureText] = useState(true);
    const [modalVisible, setModalVisible] = useState(false)


    return (
        <View style={styles.container}>
            <Image source={require('../Assets/code_alchemy_logo.png')} style={styles.logo} />
            <Text style={styles.title}>Login</Text>
            <FormInput
                title='Email'
                text={email.text}
                onChangeText={(text) => setEmail({ text })}
                errorMessage={email.errorMessage}
                autoCompleteType='email'
                emailValidate={emailValid(email.text)}
            // emailValidate={() => {
            //     const result = setTimeout(emailValid(email.text), 3000);
            //     return result
            // }}
            />
            <FormInput
                title='Password'
                text={password.text}
                onChangeText={(text) => setPassword({ text })}
                errorMessage={password.errorMessage}
                secureTextEntry={isSecureText}
                icon={
                    <TouchableOpacity style={{ marginRight: 10 }}
                        onPress={() => setSecureText(!isSecureText)}>
                        {isSecureText ? (
                            <Ionicons name='eye' size={20} color='#fff' />
                        ) : (
                            <Ionicons name='eye-off' size={20} color='#fff' />
                        )}
                    </TouchableOpacity>
                }
                passwordValidate={passwordValid(password.text)}
            />
            <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: 43, marginTop: 10 }} onPress={() => setModalVisible(true)}>
                <Text style={{ color: '#3bb385', textTransform: 'uppercase', letterSpacing: 1.5 }}>Forgot your password ?</Text>
            </TouchableOpacity>
            <Button
                title='Login'
                onPress={() => {
                    const isValid = validateField(email.text, password.text)
                    let isAllvalid = true;
                    if (!isValid.email || email.text === null) {
                        email.errorMessage = 'Please enter a valid email'
                        setEmail({ ...email })
                        isAllvalid = false;
                    }
                    if (!isValid.password || password.text === null) {
                        password.errorMessage = 'Password must be at least 8 long w/numbers, uppercase, lowercase, and symbol characters'
                        setPassword({ ...password })
                        isAllvalid = false;
                    }

                    if (isValid) {
                        // if (email.text === null) {
                        //     email.errorMessage = 'Please enter a valid email'
                        //     setEmail({ ...email })
                        //     isAllvalid = false;
                        // }
                        // if (password.text === null) {
                        //     password.errorMessage = 'Password must be at least 8 long w/numbers, uppercase, lowercase, and symbol characters'
                        //     setPassword({ ...password })
                        //     isAllvalid = false;
                        // }
                        LoginUser(email.text, password.text)
                    }
                }}
            />
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Text style={{ color: '#fff', letterSpacing: 1.5 }}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={{ color: '#3bb385', letterSpacing: 1.5, fontWeight: 'bold', textTransform: 'uppercase' }}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                <SocialButton
                    name='logo-google'
                    onPress={() => GoogleLogin()}
                />
                <SocialButton
                    name='logo-facebook'
                    onPress={() => faceBookLogIn()}
                />
            </View>
            {modalVisible && <ForgotPassModal
                visible={modalVisible}
                closeModal={() => setModalVisible(!modalVisible)}
                onPress={() => navigation.navigate('OTP')}
            />}
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1b2731',
    },
    logo: {
        height: 150,
        width: 150,
        borderRadius: 100,
    },
    title: {
        fontSize: 20,
        color: '#3bb385',
        fontWeight: 'bold',
        letterSpacing: 2,
        padding: 20
    },
})
