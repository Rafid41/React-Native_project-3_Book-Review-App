// app\components\Screen\Home\AddBookModal.js
import {
    Alert,
    Text,
    Pressable,
    View,
    TextInput,
    ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles_file from "../../styles/styles";
import React, { useState } from "react";
import { connect } from "react-redux";
import PickImage from "./pickImage";
import { addBook } from "../../../../redux/actionCreators";

// ======= mapStateToProps ==================//
const mapStateToProps = (state) => {
    return {
        isAuth: state.isAuth,
        name_of_user: state.name_of_user,
        sorted_categoryList: state.sorted_categoryList,
    };
};

//=============== dispatchToProps ======================//
const mapDispatchToProps = (dispatch) => {
    return {
        addBook: (book) => dispatch(addBook(book)),
    };
};

// ===================== function start =======================//

const AddBookModal = (props) => {
    const [bookTitle, setBookTitle] = useState("");
    const [image, setImage] = useState("");
    const [bookAuthor, setBookAuthor] = useState("");
    const [bookDescription, setBookDescription] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Default");

    // ================ handle Submit ========================//
    const handleSubmit = () => {
        if (props.isAuth == false) {
            alert("Please Login First");
        } else if (
            bookTitle.trim() === "" ||
            bookAuthor.trim() === "" ||
            image.trim() === ""
        ) {
            alert("Please Fill all the fields");
        } else {
            book = {
                uploader: props.name_of_user,
                bookTitle: bookTitle.trim(),
                image: image.trim(),
                bookAuthor: bookAuthor.trim(),
                bookDescription: bookDescription.trim(),
                bookCategory: selectedCategory,
            };
            props.addBook(book);

            // reset inputBox
            setBookTitle("");
            setBookAuthor("");
            setSelectedCategory("Default");
            setImage("");
            setBookDescription("");
        }
    };

    return (
        <ScrollView>
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
                    {/* Dropdown for selecting category */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 5,
                        }}
                    >
                        <Text style={{ fontSize: 16 }}>Select a Category:</Text>
                        <Picker
                            selectedValue={selectedCategory}
                            style={{ height: 50, width: 180 }}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedCategory(itemValue)
                            }
                        >
                            {props.sorted_categoryList.map(
                                (category, index) => (
                                    <Picker.Item
                                        label={category.category_name}
                                        value={category.category_name}
                                        key={index}
                                    />
                                )
                            )}
                        </Picker>
                    </View>
                    <Pressable
                        style={styles_file.accSubmitBtn}
                        onPress={() => handleSubmit()}
                    >
                        <Text
                            style={{
                                padding: 2,
                                fontSize: 10,
                                fontWeight: "bold",
                            }}
                        >
                            ADD
                        </Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBookModal);
