import React, { useContext, useEffect, useState } from "react";
import { Text, Button, Card, Image } from "react-native-elements";
import {
    StyleSheet,
    ActivityIndicator,
    FlatList,
    View,
} from "react-native";
import useGitLab from "../hooks/useGitLab";

const HomeScreen = ({ navigation }) => {

    const [projectsList, setProjectsList] = useState();
    const [results,searchProjects] = useGitLab();

    useEffect(() => {
        searchProjects();
        setProjectsList(results);
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
                null
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