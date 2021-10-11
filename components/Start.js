import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    KeyboardAvoidingView,
    TouchableOpacity,
    Alert,
    LogBox,
} from 'react-native';


export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isTyping: false,
            messages: [],
            uid: 0,
            loginText: "Loading..",
            user: {
                _id: "",
                name: "",
                avatar: "",
            },
            isConnected: false,
            dotColor: "",
            image: null,
            location: null,
        };
    }

    componentDidMount() {
        const name = this.props.route.params.name;
        this.props.navigation.setOptions({ title: name });
    }
    render() {
        return (
            <View style={{
                flex: 1,
                justify: "center",
                alignItems: "center",
                backgroundColor: this.props.route.params.backgroundColor
            }}>
                <Text style={styles.welcome}>Hello, {this.props.route.params.name}!</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    welcome: {
        color: "#B2B1B9",
        fontSize: 24,
        fontWeight: "500",
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 3
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.70,
        elevation: 4,
    },
})