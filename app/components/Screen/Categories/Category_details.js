// app\components\Screen\Categories\Category_details.js
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
import { navigate } from "../../Navigation/Navigation_all_helper";

const Category_details = ({ route }) => {
    const { sorted_bookList, category } = route.params;
    //console.log(category);
    // Filter the sorted_bookList based on category
    const filteredBooks = sorted_bookList.filter(
        (book) => book.bookCategory === category
    );
    return (
        <View style={styles.container}>
            <Text
                style={{
                    textAlign: "center",
                    fontSize: 19,
                    fontWeight: "bold",
                    marginBottom: 5,
                }}
            >
                Category: {category}
            </Text>
            <FlatList
                style={styles.flatList}
                data={filteredBooks}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <TouchableOpacity>
                        <Pressable
                            style={({ pressed }) => [
                                styles.itemContainer,
                                {
                                    borderBottomColor:
                                        index < filteredBooks.length - 1
                                            ? "transparent"
                                            : "black",
                                    opacity: pressed ? 0.5 : 1,
                                    backgroundColor: pressed
                                        ? "#0dd9d2"
                                        : "white",
                                },
                            ]}
                            onPress={() => {
                                // send params
                                //  key of that category name
                                navigate("Book Details", {
                                    book: item,
                                });
                            }}
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
        margin: 15,
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

export default Category_details;
