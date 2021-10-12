import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
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
        //Get name from home screen and apply it as the title
        const name = this.props.route.params.name;
        this.props.navigation.setOptions({ title: name });
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: `Hello, ${name}!`,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
                {
                    _id: 2,
                    text: `${name} has entered the chat`,
                    createdAt: new Date(),
                    system: true,
                },
            ],
        })
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
    }

    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#000'
                    }
                }}
            />
        )
    }

    render() {
        let { backgroundColor } = this.props.route.params;
        return (
            <View style={{
                flex: 1,
                // justify: "center",
                // alignItems: "center",
                backgroundColor: this.props.route.params.backgroundColor
            }}>
                <Text style={styles.welcome}>Hello, {this.props.route.params.name}!</Text>
                <GiftedChat
                    // renderBubble={this.renderBubble.bind(this)}
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                />
                {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({

    welcome: {
        marginLeft: 150,
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