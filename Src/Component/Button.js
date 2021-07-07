import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const Button = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.textStyle}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#3bb385',
        height: 60,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20
    },
    textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        color: '#fff'
    }
})
