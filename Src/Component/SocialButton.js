import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const SocialButton = ({ name, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.socialBtn}>
            <Ionicons name={name} size={30} color='#3bb385' />
        </TouchableOpacity>

    )
}

export default SocialButton

const styles = StyleSheet.create({
    socialBtn: {
        marginHorizontal: 20
    }
})
