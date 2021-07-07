import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import FormInput from '../Component/FormInput';
import Button from '../Component/Button';
import validator from 'validator'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import SocialButton from '../Component/SocialButton';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import Ionicons from 'react-native-vector-icons/Ionicons'

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


const createAccount = async (email, password) => {
    try {
        await auth()
            .createUserWithEmailAndPassword(email, password)
            .then(({ user }) => {
                console.log('Creating User...', user);
                firestore()
                    .collection('users')
                    .doc(auth().currentUser.uid)
                    .set({
                        UserId: auth().currentUser.uid,
                        Username: email,
                        Email: email,
                        Password: password,
                        createdAt: firestore.Timestamp.fromDate(new Date()),
                    })
            }).catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }
                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }
                console.error(error);
            })


    } catch (error) {
        console.log(error)
    }
}

const googleSignUp = async () => {
    try {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        console.log('TOKEN::', idToken);
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        await auth().signInWithCredential(googleCredential)
            // Use it only when user Sign's up, 
            // so create different social signup function
            .then(({ user }) => {
                //Once the user creation has happened successfully, we can add the currentUser into firestore
                //with the appropriate details.
                // console.log('current User', auth().currentUser);
                console.log('Google User Created...', user);
                firestore()
                    .collection('users')
                    .doc(auth().currentUser.uid)
                    .set({
                        UserId: auth().currentUser.uid,
                        Username: auth().currentUser.email,
                        Email: auth().currentUser.email,
                        Password: null,
                        MobileNo: null,
                        createdAt: firestore.Timestamp.fromDate(new Date()),
                    })
                    //ensure we catch any errors at this stage to advise us if something does go wrong
                    .catch(error => {
                        console.log('Something went wrong with added user to firestore: ', error);
                    })
            })
            //we need to catch the whole sign up process if it fails too.
            .catch(error => {
                console.log('Something went wrong with sign up: ', error);
            });
    } catch (error) {
        console.log({ error });
    }
}
const faceBoolSignUp = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
        throw 'User Cancelled the Login Process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
        throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    //Sign-in the user with the credential
    auth().signInWithCredential(facebookCredential)
        .then(() => {
            console.log('current User', auth().currentUser);
            firestore()
                .collection('users')
                .doc(auth().currentUser.uid)
                .set({
                    UserId: auth().currentUser.uid,
                    Username: auth().currentUser.email,
                    Email: auth().currentUser.email,
                    Password: null,
                    MobileNo: null,
                    createdAt: firestore.Timestamp.fromDate(new Date()),
                })
                .catch(error => {
                    console.log('Something went wrong with added user to firestore: ', error)
                })
        })
        .catch(error => {
            console.log('Something went wrong with sign up: ', error)
        })
}

const SignUp = ({ navigation }) => {
    const [email, setEmail] = useState({
        text: '',
        errorMessage: ''
    });
    const [password, setPassword] = useState({
        text: '',
        errorMessage: ''
    });
    const [confirmPassword, setConfirmPassword] = useState({
        text: '',
        errorMessage: ''
    });
    const [isSecurePassword, setSecurePassword] = useState(true);
    const [isSecureConfirmPassword, setSecureConfirmPassword] = useState(true);


    return (
        <View style={styles.container}>
            <Image source={require('../Assets/code_alchemy_logo.png')} style={styles.logo} />
            <Text style={styles.title}>Create Account</Text>
            <FormInput
                title='Email'
                text={email.text}
                onChangeText={(text) => setEmail({ text })}
                errorMessage={email.errorMessage}
                autoCompleteType='email'
                emailValidate={emailValid(email.text)}
            />
            <FormInput
                title='Password'
                text={password.text}
                onChangeText={(text) => setPassword({ text })}
                errorMessage={password.errorMessage}
                secureTextEntry={isSecurePassword}
                icon={
                    <TouchableOpacity style={{ marginRight: 10 }}
                        onPress={() => setSecurePassword(!isSecurePassword)}>
                        {isSecurePassword ? (
                            <Ionicons name='eye' size={20} color='#fff' />
                        ) : (
                            <Ionicons name='eye-off' size={20} color='#fff' />
                        )}
                    </TouchableOpacity>
                }
                passwordValidate={passwordValid(password.text)}
            />
            <FormInput
                title='Confirm Password'
                text={confirmPassword.text}
                onChangeText={(text) => setConfirmPassword({ text })}
                errorMessage={confirmPassword.errorMessage}
                secureTextEntry={isSecureConfirmPassword}
                icon={
                    <TouchableOpacity style={{ marginRight: 10 }}
                        onPress={() => setSecureConfirmPassword(!isSecureConfirmPassword)}>
                        {isSecureConfirmPassword ? (
                            <Ionicons name='eye' size={20} color='#fff' />
                        ) : (
                            <Ionicons name='eye-off' size={20} color='#fff' />
                        )}
                    </TouchableOpacity>
                }
                passwordValidate={passwordValid(confirmPassword.text)}
            />

            <Button
                title='SignUp'
                onPress={() => {
                    const isValid = validateField(email.text, password.text)
                    let isAllvalid = true;
                    if (!isValid.email || email.text == '') {
                        email.errorMessage = 'Please enter a valid email'
                        setEmail({ ...email })
                        isAllvalid = false;
                    }
                    if (!isValid.password || password.text == '') {
                        password.errorMessage = 'Password must be at least 8 long w/numbers, uppercase, lowercase, and symbol characters'
                        setPassword({ ...password })
                        isAllvalid = false;
                    }

                    if (confirmPassword.text != password.text || confirmPassword.text == '') {
                        confirmPassword.errorMessage = 'Password do not match';
                        setConfirmPassword({ ...confirmPassword });
                        isAllvalid = false
                    }
                    if (isValid) {
                        createAccount(email.text, password.text, confirmPassword.text)
                    }

                }}
            />
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Text style={{ color: '#fff', letterSpacing: 1.5 }}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={{ color: '#3bb385', letterSpacing: 1.5, fontWeight: 'bold' }}>LOGIN</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                <SocialButton
                    name='logo-google'
                    onPress={() => googleSignUp()}
                />
                <SocialButton
                    name='logo-facebook'
                    onPress={() => faceBoolSignUp()}
                />
            </View>
        </View>
    )
}

export default SignUp

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
