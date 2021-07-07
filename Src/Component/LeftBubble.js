import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import FastImage from 'react-native-fast-image'
const LeftBubble = ({ userImg, msg, Time, msgImg }) => {

    return (
        <View style={styles.container}>
            <View style={{ width: '15%' }}>
                <Image
                    source={{ uri: userImg }}
                    style={styles.image}
                />
            </View>
            <View style={styles.messageTextContainer}>
                {msg === null ? <FastImage source={{ uri: msgImg }} style={{ height: 150, width: 150, borderRadius: 10, resizeMode: 'contain' }} /> : <Text style={styles.text}>{msg} </Text>}
                <Text style={styles.time}>{Time}</Text>
            </View>
        </View>
    )
}

export default LeftBubble

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '80%',
        paddingLeft: 10,
        marginTop: 10,
    },
    image: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    messageTextContainer: {
        marginLeft: 5,
        backgroundColor: '#1b2731',
        padding: 15,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    text: {
        color: '#fff',
        fontWeight: '700',
    },
    time: {
        color: 'lightgrey',
        fontSize: 10,
        marginLeft: 20,
        alignSelf: 'flex-end',
        marginTop: 2
    }
});
