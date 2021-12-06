import React, { useEffect, useState } from "react";
import {
    Text,
    StyleSheet,
    Linking,
    Button,
    View,
    ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import gitlab from "../api/gitlab";

const DetailsScreen = ({ navigation, route }) => {
    const [project, setProject] = useState({});
    const [loading, setLoading] = useState(true);
    const categoryParam = route.params.category;

    async function getProject(id) {
        try {
            const response = await gitlab.get(`/projects/${id}`);
            setProject(response.data);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getProject(route.params.id);
    }, []);

    return (
        <>
            {loading ? (
                <ActivityIndicator />
            ) : (
                <View>
                    <Text style={styles.Title}>{`Project name : ` + project.name}</Text>
                    <Text style={styles.dateText}>{`User: ` + project.namespace.full_path}</Text>

                    <View style={styles.rating}>
                        <Feather
                            style={styles.starIcon}
                            name="star"
                            size={16}
                            color="#d4a017"
                        />
                        <Text style={styles.textRating}>{project.star_count}</Text>
                        <Feather
                            style={styles.starIcon}
                            name="git-pull-request"
                            size={16}
                            color="#4630EB"
                        />
                        <Text style={styles.textPull}>{project.forks_count}</Text>
                        <Feather
                            style={styles.starIcon}
                            name="gitlab"
                            size={16}
                            color="#DD6531"
                        />
                        <Text style={styles.textGitlab}>{project.open_issues_count}</Text>
                    </View>
                    <View>
                        <Text style={styles.overview}>
                            <Text style={styles.bold}>Visibilidade: </Text>
                            {project.visibility}
                        </Text>
                        <Text style={styles.overview}>
                            <Text style={styles.bold}>Branch Principal: </Text>
                            {project.default_branch}
                        </Text>
                    </View>
                    <Text style={styles.overview}>
                        <Text style={styles.bold}>Criado em: </Text>
                        {project.created_at}
                    </Text>

                    <Text style={styles.overview}> {project.description}</Text>
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    Title: {
        margin: 10,
        fontSize: 25,
        fontWeight: "bold",
    },
    overview: {
        marginHorizontal: 10,
        marginVertical: 5,
        fontSize: 15,
    },
    bold: {
        fontWeight: "bold",
        fontSize: 15,
    },
    dateText: {
        fontWeight: "bold",
        marginHorizontal: 10,
        marginBottom: 5,
        fontSize: 20,
        color: "#808080",
    },
    rating: {
        flexDirection: "row",
    },
    starIcon: { marginLeft: 10, marginRight: 5, marginTop: 6 },
    textRating: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#d4a017",
    },
    textPull: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#4630EB",
    },
    textGitlab: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#DD6531",
    },
});

export default DetailsScreen;