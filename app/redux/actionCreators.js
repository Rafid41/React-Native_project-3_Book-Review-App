// app\redux\actionCreators.js
import * as actionTypes from "./actionTypes";
import { navigate } from "../components/Navigation/Navigation_all_helper";
import { Alert } from "react-native";

// ============= SIGN UP and LOGIN ================//
const API = "AIzaSyDm4R7nHhYW0LYNmvidl8uopve6Cdrjl_k";

export const tryAuth =
    (name, email, password, mode) => (dispatch, getState) => {
        if (mode == "signup") {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API}`;
        } else if (mode == "login") {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API}`;
        }

        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true,
            }),
            headers: { "Content-Type": "application/json" },
        })
            .catch((err) => {
                console.log(err);
                alert("Authentication Failed!");
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    alert(data.error.message);
                } else {
                    // ===================== for sign up =============================//
                    if (mode == "signup") {
                        dispatch(dataBase_Credentials_SignUp(email, name));
                        dispatch(tryAuth_helper(data.idToken, email, name));

                        // initially call getAllBooksSortedByTitle
                        // dispatch(getAllBooksSortedByTitle());

                        navigate("Home");
                    }
                    // ======================== for login =============================//
                    // ===================== this extra part only used for retrieving name ============//
                    else if (mode == "login") {
                        // if login => retrieve name
                        let token = data.idToken;
                        fetch(
                            `https://book-review-app-react-native-default-rtdb.asia-southeast1.firebasedatabase.app/Credentials.json?orderBy="email"&equalTo="${email}"&auth=${token}`
                        )
                            .catch((err) => {
                                alert("something went wrong, sorry");
                                console.log(err);
                            })
                            .then((res) => res.json())
                            .then((data_from_firebase) => {
                                name =
                                    Object.values(data_from_firebase)[0].name;
                                dispatch(
                                    tryAuth_helper(data.idToken, email, name)
                                );

                                // initially call getAllBooksSortedByTitle
                                // dispatch(getAllBooksSortedByTitle());
                                navigate("Home");
                            });
                    }
                }
            });
    };
//  invoke reducer
export const tryAuth_helper = (token, email, name) => {
    return {
        type: actionTypes.AUTHENTICATE_USER,
        payload: {
            token: token,
            email: email,
            name: name,
        },
    };
};

const dataBase_Credentials_SignUp = (email, name) => {
    return (dispatch, getState) => {
        let token = getState().token;

        fetch(
            `https://book-review-app-react-native-default-rtdb.asia-southeast1.firebasedatabase.app/Credentials.json?auth=${token}`,
            {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    name: name,
                }),
            }
        )
            .catch((error) => console.log(error))
            // error na hole
            .then((response) => response.json())
            .then((data) => {
                console.log("check data leak dataBase_Credentials_SignUp\n");
            });
    };
};

// ========================== Add new Book =============================//
export const addBook = (book) => {
    // console.log(place);
    // auto state ashe reducer theke, variable(ekhane getState) e store korte hy
    return (dispatch, getState) => {
        let token = getState().token;
        // places table e store
        // link/uri , additional data
        fetch(
            `https://book-review-app-react-native-default-rtdb.asia-southeast1.firebasedatabase.app/Books.json?auth=${token}`,
            {
                method: "POST",
                body: JSON.stringify(book),
            }
        )
            .catch((error) => alert(error))
            // error na hole
            .then((response) => {
                alert("Book Added");
                //response.json();
            })
            .then((data) => {
                // load places  after add
                //dispatch(loadPlaces());
                console.log("check data leak addBook\n");
            });
    };
};

// ============================== get all books ==========================//
export const getAllBooksSortedByTitle = () => {
    return (dispatch, getState) => {
        let token = getState().token;

        fetch(
            `https://book-review-app-react-native-default-rtdb.asia-southeast1.firebasedatabase.app/Books.json?auth=${token}`,
            {
                method: "GET",
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch books");
                }
                return response.json();
            })
            .catch((error) => {
                // Handle errors
                console.error("Error fetching books:", error);
            })
            .then((data) => {
                // data will contain all the books
                // Convert the data object into an array

                const booksArray = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));

                // Sort the array of books by title
                const sortedBooks = booksArray.sort((a, b) => {
                    const titleA = a.bookTitle.toLowerCase();
                    const titleB = b.bookTitle.toLowerCase();
                    if (titleA < titleB) return -1;
                    if (titleA > titleB) return 1;
                    return 0;
                });

                dispatch(getAllBooksSortedByTitle_helper(sortedBooks));
            });
    };
};

//  invoke reducer
export const getAllBooksSortedByTitle_helper = (sortedBooks) => {
    return {
        type: actionTypes.GET_ALL_BOOKS,
        payload: sortedBooks,
    };
};

// ========================== get Categories  =========================//
export const getSortedCategories = () => {
    return (dispatch, getState) => {
        let token = getState().token;

        fetch(
            `https://book-review-app-react-native-default-rtdb.asia-southeast1.firebasedatabase.app/Categories.json?auth=${token}`
        )
            .catch((err) => {
                alert("something went wrong, sorry");
                console.log(err);
            })
            .then((res) => res.json())
            .then((data_from_firebase) => {
                console.log("check data leak==> getSortedCategory\n");
                // console.log(data_from_firebase);
                const filteredData = data_from_firebase.filter(
                    (item) => item !== null
                );
                // sort
                filteredData.sort((a, b) => {
                    const categoryA = a.category_name.toUpperCase();
                    const categoryB = b.category_name.toUpperCase();
                    if (categoryA < categoryB) {
                        return -1;
                    }
                    if (categoryA > categoryB) {
                        return 1;
                    }
                    return 0;
                });

                dispatch(getSortedCategories_helper(filteredData));
            });
    };
};

//  invoke reducer
export const getSortedCategories_helper = (sortedCategory) => {
    return {
        type: actionTypes.GET_SORTED_CATEGORY,
        payload: sortedCategory,
    };
};
