import React, { useContext, useEffect, useState } from "react";
import { Text, Button, Card, Image } from "react-native-elements";
import {
    StyleSheet,
    ActivityIndicator,
    View,
    FlatList,
    TouchableOpacity,
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
            {projectsList ? (
                <FlatList
                    data={projectsList}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                style={styles.card}
                                onPress={() =>
                                    navigation.navigate("Details", {
                                        id: item.id,
                                    })
                                }
                            >
                                <Card>
                                    <Text h3 style={styles.Title}>{`Repo. name: ` + item.name}</Text>
                                    <Text style={{fontSize:18}}>Contributors:</Text>
                                    <View style={styles.containerItems}>
                                        <Image
                                            source={{
                                                uri: "https://gitlab.com/" + item.namespace.avatar_url,
                                            }}
                                            style={{ width: 25, height: 25, marginRight: 5 }}
                                            PlaceholderContent={<ActivityIndicator />}
                                        />
                                        <Text style={{fontSize:14}}>{item.namespace.full_path}</Text>
                                    </View>
                                </Card>
                            </TouchableOpacity>
                        );
                    }}
                />
            ) : (
                <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1 }} />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    Title: {
        color: 'black',
        margin: 10,
        textAlign: 'center',
        fontWeight: "bold",
    },
    containerItems: {
        flexDirection: "row",
    },
});

export default HomeScreen;