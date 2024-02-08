import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    Modal,
    Pressable,
} from "react-native";
import styles_file from "../styles/styles";
import { getAllBooksSortedByTitle } from "../../../redux/actionCreators";
import Review from "./Review";

// // ============================= stateToProps =======================//
// const mapStateToProps = (state) => {
//     return {
//         isAuth: state.isAuth,
//         name_of_user: state.name_of_user,
//         sorted_bookList: state.sorted_bookList,
//     };
// };

// //=============== dispatchToProps ======================//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         getAllBooksSortedByTitle: () => dispatch(getAllBooksSortedByTitle()),
//     };
// };

// ========================== HomeScreen ==========================//

const BookDetail = ({ route }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const { book } = route.params;

    return (
        <View>
            <ScrollView>
                <View style={styles.container}>
                    <Image source={{ uri: book.image }} style={styles.image} />
                    <View style={styles.detailsContainer}>
                        <Text style={styles.title}>{book.bookTitle}</Text>
                        <Text style={styles.author}>
                            Author:{" "}
                            <Text style={{ color: "blue" }}>
                                {book.bookAuthor}
                            </Text>
                        </Text>
                        <Text style={styles.description}>
                            {book.bookDescription}
                        </Text>
                    </View>
                </View>
                <View style={styles.separator}></View>
                <Review />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 20,
        margin: 10,
        marginBottom: 40,
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
        textAlign: "center",
    },
    author: {
        fontSize: 17,
        marginBottom: 10,
        fontWeight: "bold",
    },
    description: {
        fontSize: 16,
        textAlign: "left",
        margin: 10,
        lineHeight: 24, //inline spacing
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        marginBottom: 20,
    },
});

export default connect(null, null)(BookDetail);
