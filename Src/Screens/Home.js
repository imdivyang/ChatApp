import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import Button from '../Component/Button';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>

            <Image source={require('../Assets/code_alchemy_logo.png')} style={styles.logo} />
            <Text style={styles.title}> ChatApp </Text>
            <Text style={styles.subTitle}>The easiest App to chat with your Friends and Family.</Text>
            <Button
                title='Login'
                onPress={() => navigation.navigate('Login')}
            />
            <Button
                title='Sign up'
                onPress={() => navigation.navigate('SignUp')}
            />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1b2731'
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
    subTitle: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '900',
        letterSpacing: 2,
        textAlign: 'center'
    }
})
