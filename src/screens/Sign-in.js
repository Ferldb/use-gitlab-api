import React, { useState, useEffect, useContext } from 'react';
import { Button, Input, } from "react-native-elements";
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import gitlabImage from '../../assets/gitlab-icon.png';
import { AuthContext } from "../context/AuthContext.js";


const HomeScreen = ({ navigation }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { authState, signIn, tryLocalSignIn } = useContext(AuthContext);

    useEffect(() => {
        tryLocalSignIn();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.AppTitle}>Git Lab Explorer</Text>
            <Image
                style={styles.logo}
                source={gitlabImage}
            />
            <Input
                placeholder="Username"
                onChangeText={(value) => setUsername(value)}
                value={username}
            />
            <Input
                placeholder="Password"
                onChangeText={(value) => setPassword(value)}
                value={password}
                secureTextEntry={true}
            />

            <Button
                title="Entrar"
                onPress={() => {
                    signIn({ username, password });
                }}
            />


            {authState.error ? <Text>{authState.error}</Text> : null}

        </View>


    );
}

const styles = StyleSheet.create({
    AppTitle: {
        marginVertical: 50,
        flex: 0,
        fontSize: 30,
        textAlign: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
    },
    logo: {
        width: 90,
        height: 90,
        margin: 10,
    },
    input: {
        color: 'black',
        width: '80%',
        margin: 20,
        padding: 10,
        backgroundColor: 'lightgrey',
    },
    createButton: {
        margin: 20,
        padding: 10,
        alignSelf: 'center',
        alignItems: 'center',
        width: '80%',
        backgroundColor: '#1f75cb',
        borderRadius: 15,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default HomeScreen;