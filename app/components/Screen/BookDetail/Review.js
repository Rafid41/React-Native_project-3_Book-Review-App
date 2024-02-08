import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { AddReview } from "../../../redux/actionCreators";
import { getReviews } from "../../../redux/actionCreators";

// ============================= stateToProps =======================//
const mapStateToProps = (state) => {
    return {
        isAuth: state.isAuth,
        name_of_user: state.name_of_user,
        reviewList: state.reviewList,
    };
};

//=============== dispatchToProps ======================//
const mapDispatchToProps = (dispatch) => {
    return {
        AddReview: (review, name_of_user, bookId) =>
            dispatch(AddReview(review, name_of_user, bookId)),
        getReviews: (bookId) => dispatch(getReviews(bookId)),
    };
};
// ========================= main ==========================//
const Review = (props) => {
    const [review, setReview] = useState("");
    // const [reviewsList, setReviewsList] = useState([]);

    const handleAddReview = () => {
        if (review.trim() === "") {
            alert("Review input box can't be empty");
        } else if (props.isAuth == false) {
            alert("Please Sign in first");
        } else {
            props.AddReview(review, props.name_of_user, props.book.id);
        }
        // setReviewsList((prevReviews) => [...prevReviews, review]);
        setReview("");
        // props.getReviews(props.book.id);
    };

    // ========================= useEffect =========================//
    useEffect(() => {
        props.getReviews(props.book.id);
    });

    return (
        <View style={styles.container}>
            <Text style={styles.reviewHeader}>Reviews</Text>
            <View style={styles.addReviewContainer}>
                <TextInput
                    placeholder="Write your review..."
                    multiline={true}
                    value={review}
                    onChangeText={(text) => setReview(text)}
                    style={styles.input}
                />
                <Pressable onPress={handleAddReview} style={styles.addButton}>
                    <Text style={styles.addButtonText}>Add Review</Text>
                </Pressable>
            </View>
            <View style={styles.reviewsContainer}>
                {props.reviewList.map((review, index) => (
                    <View
                        key={index}
                        style={{
                            ...styles.reviewItem,
                            borderBottomColor:
                                index < props.reviewList.length - 1
                                    ? "transparent"
                                    : "black",
                        }}
                    >
                        <Text style={styles.reviewerName}>
                            {review.name_of_user}:
                        </Text>
                        <Text style={styles.reviewText}>{review.review}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    reviewHeader: {
        textAlign: "center",
        marginBottom: 20,
        fontSize: 17,
        fontWeight: "bold",
        color: "#0820bf",
    },
    addReviewContainer: {
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        minHeight: 100,
    },
    addButton: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    addButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    reviewsContainer: {
        flex: 1,
    },
    reviewItem: {
        padding: 15,
        borderWidth: 1,
    },
    reviewerName: {
        fontWeight: "bold",
        marginBottom: 5,
        color: "blue",
    },
    reviewText: {
        marginLeft: 15,
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Review);
