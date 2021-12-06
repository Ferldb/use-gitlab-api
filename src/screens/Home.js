import React, { useContext, useEffect, useState } from "react";
import { Text, Button, Card, Image } from "react-native-elements";
import {
    StyleSheet,
    ActivityIndicator,
    FlatList,
    View,
} from "react-native";
import gitlab from "../api/gitlab";

const HomeScreen = ({ navigation }) => {
    const [projectsList, setProjectsList] = useState();

    useEffect(() => {
        
        async function projects() {
            const response = await gitlab.get("/projects", {
                params: {
                    owned: true,
                    simple: true,
                },
            });
            setProjectsList(response.data);
        }
        projects();
    }, []);

    return (
        <>
        <Text style={styles.pageTitle}>Repositories: </Text>
            {projectsList ? (
                <FlatList
                    data={projectsList}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.container}>
                                <Text style={styles.Title}>{item.name}</Text>
                            </View>
                        );
                    }}
                />
            ) : (
                <ActivityIndicator size="large" color="#black" style={{ flex: 1 }} />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightgrey',
        borderColor: '#000000',
        borderStyle: 'solid',
        borderWidth: 2,
        margin: 10,
    },
    Title: {
        color: 'black',
        margin: 10,
        fontSize: 16,
    },
    containerItems: {
        flexDirection: "row",
    },
    pageTitle: {
        margin: 10,
        fontSize: 20,
        fontWeight: "bold",
    }
});

export default HomeScreen;