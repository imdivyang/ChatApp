import React from "react";
import { TextInput, View, Text, Dimensions } from "react-native";


const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;



class InputText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocused: false,
        };
        this.inputs = {};
    }

    render() {
        const { label, value, onChangeText, placeholder, secureTextEntry } =
            this.props;
        const { isFocused } = this.state;
        return (
            <View style={styles.containerStyle}>

                <TextInput
                    ref={(input) => (this.textInput = input)}
                    secureTextEntry={secureTextEntry}
                    placeholder={placeholder}
                    placeholderTextColor='#000'
                    autoCorrect={false}
                    style={[
                        styles.editTextStyle,
                        {
                            borderColor: isFocused ? "#ffc4a7" : "#a3a3a3",
                        },
                    ]}
                    value={value}
                    onChangeText={onChangeText}
                    // onSubmitEditing={this.onSubmitEditing.bind(this)}
                    underlineColorAndroid="transparent"
                    onFocus={() => {
                        this.setState({
                            isFocused: true,
                        });
                    }}
                    onBlur={() => {
                        this.setState({
                            isFocused: false
                        })
                    }}
                />
            </View>
        );
    }
}
const styles = {
    inputStyle: {
        color: "#000",
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2,
    },
    editTextStyle: {
        fontSize: 16,
        color: "#545454",
        marginBottom: 5,
        height: 45,
        width: WIDTH - 40,
        borderColor: "#ffc4a7",
        borderWidth: 1,
        borderRadius: 6,
        marginTop: 5,
        padding: 8,
    },
    labelStyle: {
        fontSize: 18,
        flex: 1,
    },
    containerStyle: {
        // height: 40,
        flex: 1,
        // flexDirection: "row",
        // alignItems: "center",
    },
};
export default InputText;


















