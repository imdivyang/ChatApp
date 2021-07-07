import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, FlatList, ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LeftBubble from '../Component/LeftBubble';
import RightBubble from '../Component/RightBubble';
import InputText from '../Component/InputText';
import Loader from '../Component/Loader';
import EmojiSelector, { Categories } from "react-native-emoji-selector";


const DemoScreen = () => {
    const [isVisible, setVisible] = useState(true)
    const Emojis = () => {
        return (
            <EmojiSelector
                category={Categories.symbols}
                onEmojiSelected={emoji => console.log(emoji)}
            />
        )
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => Emojis()}>
                <Text>Click</Text>
            </TouchableOpacity>
            <EmojiSelector
                category={Categories.symbols}
                onEmojiSelected={emoji => console.log(emoji)}
                showSearchBar={false}
                columns={8}

            // showSectionTitles={false}
            />
        </View>
    )
}

export default DemoScreen

const styles = StyleSheet.create({
    container: {

        position: 'absolute',
        bottom: 0,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 250
    },

})
