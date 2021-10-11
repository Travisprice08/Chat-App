import React, { Component } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Pressable,
    ImageBackground,
    Image,
    TouchableOpacity,
} from 'react-native';

export default class Start extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            bgColor: "black",
            border: 0,
        };
    }
    render() {
        return (
            <ImageBackground
                style={styles.imgBackground}
                resizeMode="cover"
                source={require("../assets/startImg.png")}
            >
                {/* Main view defined */}
                <View style={styles.mainContainer}>
                    <Text style={styles.title}>Chat App</Text>
                    {/* <Button
                        title="Go to Screen 2"
                        onPress={() => this.props.navigation.navigate('Screen2')}
                    /> */}
                </View>

                {/*Container for text input and background color selector*/}
                <View style={styles.container}>
                    <View style={styles.textInputCont}>
                        <TextInput style={[styles.textInput,
                        {
                            backgroundColor: this.state.backgroundColor,
                        },
                        ]}
                            onChangeText={(name) => this.setState({ name })}
                            value={this.state.name}
                            palceholder="Your name"
                            placeholderTextColor="rgba(255, 255, 255, 1)"
                        />
                    </View>
                    <View style={styles.colorSelectorCont}>
                        <Text style={styles.selectColor}>Select a Color:</Text>
                        <View style={styles.colorSelector}>
                            {/* Selecting color */}
                            <TouchableOpacity
                                accessible={true}
                                accessibilityLabel="Black Color"
                                accessibilityHint="Allows you to choose black as contrast color in chat."
                                style={[
                                    styles.colors,
                                    styles.black,
                                    { borderWidth: this.state.border },
                                ]}
                                onPress={() => this.setState({ backgroundColor: "#212121" })}
                            ></TouchableOpacity>
                            <TouchableOpacity
                                accessible={true}
                                accessibilityLabel="Blue Color"
                                accessibilityHint="Allows you to choose blue as contrast color in chat."
                                style={[
                                    styles.colors,
                                    styles.blue,
                                    { borderWidth: this.state.border },
                                ]}
                                onPress={() => this.setState({ backgroundColor: "#3D56B2" })}
                            ></TouchableOpacity>
                            <TouchableOpacity
                                accessible={true}
                                accessibilityLabel="Red Color"
                                accessibilityHint="Allows you to choose red as contrast color in chat."
                                style={[
                                    styles.colors,
                                    styles.red,
                                    { borderWidth: this.state.border },
                                ]}
                                onPress={() => this.setState({ backgroundColor: "#FF0000" })}
                            ></TouchableOpacity>
                            <TouchableOpacity
                                accessible={true}
                                accessibilityLabel="Purple Color"
                                accessibilityHint="Allows you to choose purple as contrast color in chat."
                                style={[
                                    styles.colors,
                                    styles.purple,
                                    { borderWidth: this.state.border },
                                ]}
                                onPress={() => this.setState({ backgroundColor: "#610094" })}
                            ></TouchableOpacity>
                        </View>
                    </View>
                    {/* Button to enter chatroom */}
                    <View>
                        <TouchableOpacity
                            style={[
                                styles.enterChat,
                                { backgroundColor: this.state.backgroundColor },
                            ]}
                            onPress={() =>
                                this.props.navigation.navigate("Chat", {
                                    name: this.state.name,
                                    backgroundColor: this.state.backgroundColor,
                                })
                            }
                        >
                            <Text style={styles.btnText}>Enter Chatroom</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    // backgroundColor: {

    // },
    container: {
        width: "88%",
        height: 320,
        marginBottom: 50,
        marginLeft: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.75)",
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.70,
        elevation: 4,
    },
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    imgBackground: {
        width: "100%",
        height: "100%",
        flex: 1,
    },

    textInput: {
        color: "#B2B1B9",
        top: 25,
        height: 60,
        borderWidth: 1,
        fontSize: 16,
        fontWeight: "300",
        paddingLeft: 45,
        borderColor: "#777",
        opacity: .7,

    },

    textInputCont: {
        flex: 1,
        width: "80%",
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 3
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.70,
        elevation: 4,
    },

    title: {
        color: "#343A40",
        fontSize: 38,
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

    colorSelectorCont: {
        position: "absolute",
        flex: 1,
        alignSelf: "center",
        justifyContent: "center",
    },

    selectColor: {
        fontSize: 18,
        fontWeight: "400",
        color: "grey",
        marginLeft: 10,
    },

    colorSelector: {
        flexDirection: "row",
        marginTop: 15,
    },

    colors: {
        width: 50,
        height: 50,
        margin: 8,
        marginTop: 0,
        borderRadius: 50 / 2,
        borderColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 3
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.70,
        elevation: 4,
    },
    black: {
        backgroundColor: "#212121",
    },
    blue: {
        backgroundColor: "#3D56B2",
    },
    red: {
        backgroundColor: "#FF0000",
    },
    purple: {
        backgroundColor: "#610094",
    },

    enterChat: {
        flex: 1,
        position: "absolute",
        bottom: 25,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
        width: "88%",
        height: 60,
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 3
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.70,
        elevation: 4,
        opacity: 0.9,
    },

    btnText: {
        fontSize: 18,
        fontWeight: "400",
        color: "#fff",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        textShadowColor: "#000",
    },

})