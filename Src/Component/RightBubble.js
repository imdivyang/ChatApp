import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import moment from 'moment';
import FastImage from 'react-native-fast-image'

const RightBubble = ({ msg, Time, userImg, msgImg }) => {

    return (
        <View style={styles.container}>
            <View style={styles.messageTextContainer}>
                {msg === null ? <FastImage source={{ uri: msgImg }} style={{ height: 150, width: 150, borderRadius: 10, resizeMode: 'contain' }} /> : <Text style={styles.text}>{msg} </Text>}
                <Text style={styles.time}>{Time}</Text>
            </View>
            <View>
                <Image
                    source={{ uri: userImg }}
                    style={styles.image}
                />
            </View>
        </View>
    )
}

export default RightBubble

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '80%',
        paddingRight: 10,
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    image: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    messageTextContainer: {
        marginRight: 5,
        backgroundColor: "#3bb385",
        padding: 15,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
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
