import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
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

const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     isTyping: false,
        //     messages: [],
        //     uid: 0,
        //     loginText: "Authenticating..",
        //     user: {
        //         _id: "",
        //         name: "",
        //         avatar: "",
        //     },
        //     isConnected: false,
        //     dotColor: "",
        //     image: null,
        //     location: null,
        // };

        //Firebase config details
        const firebaseConfig = {
            apiKey: "AIzaSyBlHEgqpqYKgntXMXrI9nDR036QU87yil0",
            authDomain: "chatapp-be1ca.firebaseapp.com",
            projectId: "chatapp-be1ca",
            storageBucket: "chatapp-be1ca.appspot.com",
            messagingSenderId: "63772889694",
        }
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        // Check to see if correct collection name is being used
        this.referenceChatMessages = firebase.firestore().collection('messages');
        this.referenceMessageUser = null;

        this.state = {
            messages: [],
            uid: 0,
            user: {
                _id: '',
                name: '',
            },
            isConnected: false,
            image: null,
            location: null,
        };
    }

    componentDidMount() {
        //Get name from home screen and apply it as the title
        const name = this.props.route.params.name;
        this.props.navigation.setOptions({ title: name });
        // Checks if user is offline
        NetInfo.fetch().then(connection => {
            if (connection.isConnected) {
                this.setState({ isConnected: true });
                console.log('online');

                // listen for authentication events
                this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
                    if (!user) {
                        firebase.auth().signInAnonymously();
                    }
                    // update user state with active user
                    this.setState({
                        uid: user.uid,
                        messages: [],
                        user: {
                            _id: user.uid,
                            name: name,
                        }
                    });
                    //Create ref to active user messages
                    this.referenceMessageUser = firebase.firestore().collection('messages').where('uid', '==', this.state.uid);
                    //listen for collection changes
                    this.unsubscribe = this.referenceChatMessages
                        .orderBy("createdAt", "desc")
                        .onSnapshot(this.onCollectionUpdate);
                });
            } else {
                console.log('offline');
                this.setState({ isConnected: false })
                this.getMessages();
            }
        });
    }

    componentWillUnmount() {
        this.authUnsubscribe();
        this.authUnsubscribe();
    }

    async getMessages() {
        let messages = '';
        try {
            messages = await AsyncStorage.getItem('messages') || [];
            this.setState({
                messages: JSON.parse(messages)
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    async deleteMessages() {
        try {
            await AsyncStorage.removeItem('messages');
            this.setState({
                messages: []
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    //Add messages to db
    addMessages() {
        const message = this.state.messages[0];
        // add new message to collection
        this.referenceChatMessages.add({
            uid: this.state.uid,
            _id: message._id,
            createdAt: message.createdAt,
            text: message.text || null,
            user: message.user,
            image: message.image || null,
            location: message.location || null,
        });
    }

    // Save Messages to local storage
    async saveMessages() {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
        } catch (error) {
            console.log(error.message);
        }
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }),
            () => {
                this.addMessages();
                this.saveMessages();
            })
    }

    onCollectionUpdate = (querySnapshot) => {
        const messages = [];
        // go through each document
        querySnapshot.forEach((doc) => {
            // get the QueryDocumentSnapshot's data
            var data = doc.data();
            messages.push({
                _id: data._id,
                createdAt: data.createdAt.toDate(),
                text: data.text || '',
                user: {
                    _id: data.user._id,
                    name: data.user.name,
                },
                image: data.image || null,
                location: data.location || null,
            });
        });
        this.setState({
            messages,
        });
    };

    // // Attach new message to message status object when user presses send
    // onSend(messages = []) {
    //     this.setState(previousState => ({
    //         messages: GiftedChat.append(previousState.messages, messages),
    //     }));
    // }

    renderInputToolbar(props) {
        if (this.state.isConnected == false) {
        } else {
            return (
                <InputToolbar
                    {...props}
                />
            );
        }
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
        // Get name and background color that user selected
        let { backgroundColor } = this.props.route.params;
        return (
            <View style={{
                flex: 1,
                // justify: "center",
                // alignItems: "center",
                backgroundColor: this.props.route.params.backgroundColor
            }}>
                {/* <Text style={styles.welcome}>Hello, {this.props.route.params.name}!</Text> */}
                <Text>{this.state.loggedInText}</Text>
                <GiftedChat
                    // Change color of chat bubble
                    // renderBubble={this.renderBubble.bind(this)}
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={this.state.user}
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