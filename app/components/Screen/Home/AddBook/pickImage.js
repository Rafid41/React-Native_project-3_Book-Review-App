// app\components\Screen\Home\AddBook\pickImage.js
import React from "react";
import { View, Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

const PickImage = (props) => {
    const handleImagePick = async () => {
        try {
            // gallary open hbe: launchImageLibraryAsync
            // camera open hbe: launchCameraAsync
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
                // img k string e convert kore base64
                base64: true,
            });

            if (!result.canceled) {
                // props.setImage(result.assets[0].uri);
                // very large data
                // console.log(result.assets[0].base64);
                // props.setImage(`data:image/jpg;base64,${result.base64}`);
                props.setImage(
                    `data:image/jpg;base64,${result.assets[0].base64}`
                );
            }
        } catch (E) {
            console.log(result.assets[0].uri);
        }
    };
    let showImage = null;
    if (props.image !== "") {
        showImage = (
            <Image
                source={{ uri: props.image }}
                style={{ width: "100%", height: 200, marginBottom: 10 }}
            />
        );
        // console.log(showImage);
    }
    return (
        <View>
            {/* image picker */}
            <View>
                {showImage}
                <Button title="Pick an Image" onPress={handleImagePick} />
            </View>
        </View>
    );
};

export default PickImage;
