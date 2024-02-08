// app\screens\HomeScreen.js
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Modal,
    SafeAreaView,
    Pressable,
    TouchableOpacity,
} from "react-native";
import styles_file from "../styles/styles";
import { connect } from "react-redux";
import AddBookModal from "./AddBook/AddBookModal";
import ShowBookList from "./ShowBookList/ShowBookList";
import { getAllBooksSortedByTitle } from "../../../redux/actionCreators";

// ============================= stateToProps =======================//
const mapStateToProps = (state) => {
    return {
        user_email: state.user_email,
        name_of_user: state.name_of_user,
        sorted_bookList: state.sorted_bookList,
    };
};

//=============== dispatchToProps ======================//
const mapDispatchToProps = (dispatch) => {
    return {
        getAllBooksSortedByTitle: () => dispatch(getAllBooksSortedByTitle()),
    };
};

// ========================== HomeScreen ==========================//
const Home = (props) => {
    const [modalVisible, setModalVisible] = useState(false);

    // load Acc list
    // const load_acc_List = () => {
    //     console.log(props.user_email);
    //     props.loadAccounts(props.user_email);
    // };

    //========================= useEffect ========================//
    // useEffect() kaj korena, Auth er time e loadAccounts() call/dispatch kora hoise, actionCreators.js theke
    useEffect(() => {
        props.getAllBooksSortedByTitle();
    }, []);

    // =====================================  return =======================//
    return (
        <View style={styles_file.view}>
            <Text
                style={{
                    textAlign: "center",
                    fontSize: 22,
                    fontWeight: "bold",
                }}
            >
                {props.sorted_bookList.length}
            </Text>
            {/* <ListOfAccounts account_List={props.account_List} /> */}
            {/* =========== modal =============== */}
            <Modal
                style={styles_file.modal}
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <AddBookModal />
                <Pressable
                    style={{
                        ...styles_file.actionButton,
                        backgroundColor: "red",
                        minWidth: 100,
                    }}
                    onPress={() => {
                        setModalVisible(false);
                        // load_acc_List();
                    }}
                >
                    <Text style={styles_file.button_text}>close</Text>
                </Pressable>
            </Modal>
            {/* ============== modal open btn ============== */}
            {/* Button == Pressable */}
            <Pressable
                style={styles_file.actionButton}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles_file.button_text}>
                    Add New Book to Review
                </Text>
            </Pressable>
        </View>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
