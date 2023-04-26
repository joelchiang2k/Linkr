import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const SenderMessage = ({message}) => {
  return (
    <View style={styles.view}>
      <Text style={styles.message}>{message.message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    view:{
        backgroundColor: '#8B5CF6',
        borderRadius: 10,
        borderTopRightRadius: 0,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginVertical: 5,
        marginHorizontal: 10,
        alignSelf: "flex-start",
        marginLeft: "auto",
    },
    message:{
        color:'white',
    },
})

export default SenderMessage