import React, { useEffect } from "react";
import {
    FlatList,
    View,
    Text,
    StyleSheet,
    Pressable,
    TouchableOpacity,
} from "react-native";
import { getSortedCategories } from "../../../redux/actionCreators";
import { connect } from "react-redux";

// ============================= stateToProps =======================//
const mapStateToProps = (state) => {
    return {
        sorted_categoryList: state.sorted_categoryList,
    };
};

//=============== dispatchToProps ======================//
const mapDispatchToProps = (dispatch) => {
    return {
        getSortedCategories: () => dispatch(getSortedCategories()),
    };
};
// ================ main ===========================//
const Categories = (props) => {
    useEffect(() => {
        props.getSortedCategories();
    }, []);

    return (
        <View style={styles.container}>
            <Text
                style={{
                    textAlign: "center",
                    fontSize: 22,
                    fontWeight: "bold",
                    marginBottom: 5,
                }}
            >
                Categories
            </Text>
            <FlatList
                style={styles.flatList}
                data={props.sorted_categoryList}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <TouchableOpacity>
                        <Pressable
                            style={({ pressed }) => [
                                styles.itemContainer,
                                {
                                    borderBottomColor:
                                        index <
                                        props.sorted_categoryList.length - 1
                                            ? "transparent"
                                            : "black",
                                    opacity: pressed ? 0.5 : 1,
                                    backgroundColor: pressed
                                        ? "#0dd9d2"
                                        : "white",
                                },
                            ]}
                        >
                            <Text style={styles.itemText}>
                                {item.category_name}
                            </Text>
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
        margin: 35,
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

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
