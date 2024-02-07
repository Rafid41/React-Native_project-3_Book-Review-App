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
    const [textInputValue, setTextInputValue] = useState("");
    const [coverImage, setCoverImage] = useState("");

    // ================ handle Submit ========================//
    const handleSubmit = () => {
        if (textInputValue == "") {
            Alert.alert("Please enter the Name of the Account ");
        } else if (props.user_email == null) {
            Alert.alert("Please Login first ");
        } else {
            props.addAccount(props.user_email, textInputValue);
        }
    };

    //console.log(props.user_email);
    return (
        <View style={styles_file.centeredView}>
            <View style={styles_file.modalView}>
                <Text style={{ fontSize: 20 }}>Add New Book{"\n"}</Text>

                <TextInput
                    placeholder="Account Name"
                    style={{
                        width: "100%",
                        borderBottomWidth: 1,
                        borderColor: "black",
                        padding: 7,
                    }}
                    value={textInputValue}
                    onChangeText={(text) => setTextInputValue(text)}
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
