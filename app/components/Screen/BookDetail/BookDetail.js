import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";

const BookDetail = ({ book }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{ uri: book.image }} style={styles.image} />
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{book.bookTitle}</Text>
                <Text style={styles.author}>Author: {book.bookAuthor}</Text>
                <Text style={styles.description}>{book.bookDescription}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 20,
    },
    image: {
        width: 200,
        height: 300,
        resizeMode: "cover",
        marginBottom: 20,
    },
    detailsContainer: {
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    author: {
        fontSize: 18,
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        textAlign: "center",
    },
});

export default BookDetail;
