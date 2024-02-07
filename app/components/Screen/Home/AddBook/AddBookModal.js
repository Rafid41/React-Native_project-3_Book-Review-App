// app\components\Screen\Home\AddBookModal.js
import { Alert, Text, Pressable, View, TextInput } from "react-native";
import styles_file from "../../styles/styles";
import React, { useState } from "react";
import { connect } from "react-redux";
import PickImage from "./pickImage";

// ======= mapStateToProps ==================//
const mapStateToProps = (state) => {
    return {
        isAuth: state.isAuth,
        name_of_user: state.name_of_user,
    };
};

// ============= send data to redux actionCreators =================//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         addAccount: (email, acc_name) => dispatch(addAccount(email, acc_name)),
//     };
// };

// ===================== function start =======================//

const AddBookModal = (props) => {
    const [bookTitle, setBookTitle] = useState("");
    const [image, setImage] = useState("");
    const [bookAuthor, setBookAuthor] = useState("");
    const [bookDescription, setBookDescription] = useState("");

    // ================ handle Submit ========================//
    const handleSubmit = () => {
        // if (bookTitle == "") {
        //     Alert.alert("Please enter the Name of the Account ");
        // } else if (props.user_email == null) {
        //     Alert.alert("Please Login first ");
        // } else {
        //     props.addAccount(props.user_email, textInputValue);
        // }
    };

    //console.log(props.user_email);
    return (
        <View style={styles_file.centeredViewForNewBook}>
            <View style={styles_file.modalView}>
                <Text style={{ fontSize: 20, textAlign: "center" }}>
                    Add New Book{"\n"}
                </Text>

                <View style={{ alignItems: "center" }}>
                    <PickImage image={image} setImage={setImage} />
                </View>

                <TextInput
                    placeholder="Book Title"
                    style={{
                        marginTop: 15,
                        width: "100%",
                        borderBottomWidth: 1,
                        borderColor: "black",
                        padding: 7,
                    }}
                    value={bookTitle}
                    onChangeText={(text) => setBookTitle(text)}
                />
                <TextInput
                    placeholder="Book Author"
                    style={{
                        marginTop: 15,
                        width: "100%",
                        borderBottomWidth: 1,
                        borderColor: "black",
                        padding: 7,
                    }}
                    value={bookAuthor}
                    onChangeText={(text) => setBookAuthor(text)}
                />
                <TextInput
                    placeholder="Short Description (optional)"
                    multiline={true}
                    numberOfLines={4}
                    style={{
                        marginTop: 15,
                        width: "100%",
                        borderWidth: 1,
                        borderColor: "black",
                        padding: 7,
                    }}
                    value={bookDescription}
                    onChangeText={(text) => setBookDescription(text)}
                />
                <Pressable
                    style={styles_file.accSubmitBtn}
                    onPress={() => handleSubmit()}
                >
                    <Text
                        style={{ padding: 2, fontSize: 10, fontWeight: "bold" }}
                    >
                        ADD
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

export default connect(mapStateToProps)(AddBookModal);
