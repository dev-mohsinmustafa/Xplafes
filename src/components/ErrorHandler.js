import { StyleSheet, Text, View } from 'react-native'
import React from 'react'




const ErrorHandler = (props) => {


    return (
        <View>

            <Text style={styles.errorMessage}>{props.title}</Text>

        </View>
    )
}
const styles = StyleSheet.create({

    errorMessage: {
        marginLeft: 20,
        width:"70%",
        // marginRight: 80,
        color: "red",
        backgroundColor: "white",
        textAlign: 'center',
        borderRadius: 10,
        fontSize: 15
    }
})

export default ErrorHandler;
