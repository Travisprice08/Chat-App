# Chat-App

![hello-world](/ChatApp.jpeg)

## Description

A mobile chat application built with React Native with a chat feature and the options to share location and images.

The app is written with React Native and used Expo in the development process. Google Firestore Database and Google Firebase authentication were used to authenticate users and to store coversations. Conversations are also stored locally for offline situations.

Images can be uploaded from the users image library once permission has been granted. Users can also grant permission for camera use allowing them to upload photos straight from the camera.

Users can also grant permission for the app to use their location data, this allows the user to  share their location. 

## Technologies

- React Native
- Expo
- Google Firestore Database
- Gifted Chat library

## Key Features

- A component that allows users to enter their name as well as choosing a background color for the chatroom.
- A chatroom component that displays the conversation with an input field and submit button. Conversations are available both online and offline, and input field is available online only.
- The chat is able to send photos and share location data on top of sending and recieving messages.

## Getting Started

### Technical Requirements

- Node.js
- Expo Command Line Interface

```
npm install expo-cli --global
```

- In order to run this app on your mobile device, the Expo app  must be installed first through your device's app store (iOS or Android)
- An Expo account must first be created, which can be done at [Expo.io](https://expo.io)
- Once you are logged into Expo, you will have access to the app.

  - Logging into Expo through the CLI on your machine
  - Logging into Expo on your mobile device in the Expo app

- In order to run the app on your computer using a simulator/emulator, you will need to use an iOS or Android simulator.
  - [iOS Simulator](https://docs.expo.io/workflow/ios-simulator/)
  - [Android Studio](https://docs.expo.io/workflow/android-studio-emulator/)
  

### Installing Dependencies

In the project directory install the application's dependencies.

```
npm install
```

### Running the App

```
expo start
```

#### Running the App on Your Mobile Device

After using the "expo start" command to run the app, you can use your mobile device to scan the provided QR code displayed in the command line interface and it will be opened on your mobile device through your mobile device's Expo app.

#### Running the App with Android Studio or

With the command line interface open after using the 'expo start' command, press 'a' to run the app with an Android emulator, or press 'i' to run the app with iOS simulator.
