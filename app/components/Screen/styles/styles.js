import { StyleSheet, Platform } from "react-native";
import Constants from "expo-constants";

const styles_file = StyleSheet.create({
    // ======================= Home.js ===============================//
    view: {
        flex: 1,
        padding: 10,
        // different for android and ios
        paddingTop: Platform.OS == "ios" ? 0 : Constants.statusBarHeight,
    },
    actionButton: {
        position: "absolute",
        bottom: 35,
        right: 20,
        padding: 16,
        borderRadius: 10,
        backgroundColor: "rgb(22, 111, 228)",
        alignItems: "center",
        justifyContent: "center",
    },
    button_text: {
        fontSize: 12,
        fontWeight: "bold",
        color: "white",
    },
});

export default styles_file;
