import React from "react";
import {
    FlatList,
    View,
    Text,
    StyleSheet,
    Pressable,
    TouchableOpacity,
    Image,
} from "react-native";

const ShowBookList = (props) => {
    return (
        <View style={styles.container}>
            <FlatList
                style={styles.flatList}
                data={props.sorted_bookList}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <TouchableOpacity>
                        <Pressable
                            style={({ pressed }) => [
                                styles.itemContainer,
                                {
                                    borderBottomColor:
                                        index < props.sorted_bookList.length - 1
                                            ? "transparent"
                                            : "black",
                                    opacity: pressed ? 0.5 : 1,
                                    backgroundColor: pressed
                                        ? "#0dd9d2"
                                        : "white",
                                },
                            ]}
                        >
                            <View style={styles.itemContent}>
                                <Image
                                    source={{ uri: item.image }}
                                    style={styles.image}
                                />
                                <Text style={styles.itemText}>
                                    {item.bookTitle}
                                </Text>
                            </View>
                        </Pressable>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
    },
    flatList: {
        paddingVertical: 25, // Padding top and bottom
    },
    itemContainer: {
        padding: 12,
        borderWidth: 2,
        borderBottomColor: "transparent",
    },
    itemContent: {
        flexDirection: "row",
        alignItems: "center", // Align items vertically
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    itemText: {
        flex: 1, // Take remaining space
        fontSize: 14,
        color: "#333",
        fontWeight: "bold",
    },
});

export default ShowBookList;
