// app\components\Navigation\Navigation_all_helper.js
import React from "react";

//================ for all page navigation =================//
export const navigationRef = React.createRef();

export const navigate = (name, params) => {
    navigationRef.current && navigationRef.current.navigate(name, params);
};
