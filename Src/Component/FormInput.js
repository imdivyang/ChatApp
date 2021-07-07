import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const FormInput = ({ emailValidate, passwordValidate, title, onChangeText, text, icon, errorMessage, ...inputProps }) => {

    const [isFocused, setIsFocused] = useState(false);


    const handleFocuse = () => {
        setIsFocused(true)
    }

    const handleBlur = () => {
        setIsFocused(false)
    }

    return (
        <View style={styles.container}>
            <View
                style={[styles.textContainer, {
                    borderColor: emailValidate || passwordValidate ? '#3bb385' : 'red',
                }]}
            // style={[styles.textContainer, {
            //     // borderColor: isFocused ? emailValidate || passwordValidate ? '#3bb385' : '' : 'red',
            //     borderColor: isFocused ? '#3bb385' : emailValidate || passwordValidate ? '' : 'red',
            // }]}
            >
                <TextInput
                    style={styles.input}
                    placeholder={title}
                    placeholderTextColor='#fff'
                    value={text}
                    onChangeText={onChangeText}
                    {...inputProps}
                    onBlur={() => {
                        handleBlur()
                    }}
                    onFocus={() => {

                        handleFocuse()
                    }}
                />
                {icon}
            </View>
            <Text style={{ color: 'red' }}>{errorMessage && `* ${errorMessage}`}</Text>
        </View>
    )
}

export default FormInput

const styles = StyleSheet.create({
    container: {
        width: '80%',
        marginBottom: 20,
        height: 80,
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // justifyContent: 'center',
        alignItems: 'center',
        // borderColor: '#3bb385',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 8,


    },
    input: {
        marginLeft: 20,
        height: 60,
        fontSize: 18,
        color: '#fff',
        // borderColor: '#fff'
        // width: '80%',
        // borderWidth: 1,
        // borderRadius: 8,
    }
})
