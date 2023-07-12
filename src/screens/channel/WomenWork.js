import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from '../../components/header/Header'

const WomenWork = () => {
    return (
        <View style={styles.container}>
            <Header title="Women at Work 💼" marginLeft={31} marginLeft1={27}
                image1={require("../../assets/images/arrow-left.png")}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFECD0",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
})
export default WomenWork;