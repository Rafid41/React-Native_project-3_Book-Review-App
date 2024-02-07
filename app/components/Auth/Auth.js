// app\components\Auth\Auth.js

import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import { connect } from "react-redux";
import backgroundImage from "../../../assets/images/login_background.jpg";
import { tryAuth, getName } from "../../redux/actionCreators";
// ei hook logout er por input field clear krte help kore
import { useIsFocused } from "@react-navigation/native";

// ========= mapStateToProps =============//
// receives data from redux, page load hole redux er data access kpra jabe
const mapStateToProps = (state) => {
    return {
        isAuth: state.isAuth,
    };
};

// ============= send data to redux actionCreators =================//
const mapDispatchToProps = (dispatch) => {
    return {
        tryAuth: (name, email, password, mode) =>
            dispatch(tryAuth(name, email, password, mode)),
    };
};

const Auth = (props) => {
    // ================ auth state ===================//

    const [authStates, setAuthStates] = useState({
        mode: "login",
        inputs: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const isFocused = useIsFocused();

    // ================= use Effect ========================//
    useEffect(
        () => {
            setAuthStates({
                ...authStates,
                inputs: {
                    email: "",
                    password: "",
                    confirmPassword: "",
                },
            });
        },
        [isFocused]
        // isFocused update hole, ei useEffect er setAuthStates hbe, field khali hbe
        // isFocused update hoa mane user ei page visite korse
    );
    // ================ handle Auth =======================//
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const handleAuth = () => {
        const name = authStates.inputs.name;
        const email = authStates.inputs.email;
        const password = authStates.inputs.password;
        const confirmPassword = authStates.inputs.confirmPassword;

        if (email !== "" && password !== "") {
            if (re.test(email)) {
                // process auth
                if (authStates.mode === "login") {
                    props.tryAuth("", email, password, "login");
                } else {
                    // SignUp
                    if (name == "") {
                        alert("Fill all fields");
                    } else if (password === confirmPassword) {
                        props.tryAuth(name, email, password, "signup");
                    } else {
                        alert("Password Fields doesn't match");
                    }
                }
            } else {
                alert("Invalid Email");
            }
        } else {
            alert("Fill all fields");
        }
    };

    // ======================= switch Views ================//
    const switchViews = () => {
        setAuthStates({
            ...authStates,
            mode: authStates.mode === "login" ? "signup" : "login",
            inputs: {
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            },
        });
    };

    let nameField = null;
    let confirmPassField = null;
    if (authStates.mode === "signup") {
        confirmPassField = (
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={authStates.inputs.confirmPassword}
                onChangeText={(value) => updateInputs(value, "confirmPassword")}
            />
        );

        nameField = (
            <TextInput
                style={styles.input}
                placeholder="Your Name"
                value={authStates.inputs.name}
                onChangeText={(value) => updateInputs(value, "name")}
            />
        );
    }

    // ======================= update Inputs==============//
    const updateInputs = (value, inputFieldName) => {
        setAuthStates({
            ...authStates,
            inputs: {
                ...authStates.inputs,
                // dynamically update submitted field
                [inputFieldName]: value,
            },
        });
    };

    // ======================== return  =====================//
    return (
        <ImageBackground
            source={backgroundImage}
            style={{ width: "100%", flex: 1 }}
            // blur bg image
            blurRadius={8}
        >
            <View style={styles.loginView}>
                {/* ==================== switch Btn ===================== */}
                {/* spread operator diye class er property overwrite kora jabe */}
                <TouchableOpacity
                    style={{
                        ...styles.btnContainer,
                        backgroundColor: "#1167b1",
                        width: "85%",
                    }}
                    onPress={() => switchViews()}
                >
                    <Text style={styles.btnStyle}>
                        {authStates.mode === "login"
                            ? "Switch to Sign Up"
                            : "Switch to Login"}
                    </Text>
                </TouchableOpacity>
                {/* ======================= Text Box ================= */}
                {nameField}
                <TextInput
                    style={styles.input}
                    placeholder="Your Email Address"
                    value={authStates.inputs.email}
                    onChangeText={(value) => updateInputs(value, "email")}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={authStates.inputs.password}
                    onChangeText={(value) => updateInputs(value, "password")}
                />
                {confirmPassField}

                {/*======== submit button using TouchableOpacity ========== */}
                <TouchableOpacity
                    style={styles.btnContainer}
                    onPress={() => {
                        handleAuth();
                    }}
                >
                    <Text style={styles.btnStyle}>
                        {authStates.mode === "login" ? "Login" : "Sign Up"}
                    </Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

// ===================================== styles ==========================//
const styles = StyleSheet.create({
    loginView: {
        // flex: 1 mane full jayga cover korbe
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        width: "85%",
        padding: 5,
        marginTop: 10,
        backgroundColor: "#eee",
        borderWidth: 1,
        borderColor: "#009688",
        borderRadius: 4,
    },
    btnStyle: {
        fontSize: 16,
        color: "#fff",
        alignSelf: "center",
    },
    btnContainer: {
        flexDirection: "row",
        width: 150,
        paddingVertical: 5,
        backgroundColor: "#009688",
        borderRadius: 5,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
