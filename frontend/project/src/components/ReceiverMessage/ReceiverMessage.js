import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const ReceiverMessage = ({message}) => {
  return (
    <View style={styles.view}>
      <Image 
        style={styles.image}
        source={{
            uri: message.photoURL,
        }}
      />
      <Text style={styles.message}>{message.message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    view:{
        backgroundColor: '#EF4444',
        borderRadius: 8,
        borderTopLeftRadius: 0,
        paddingHorizontal: 5,
        paddingVertical: 3,
        marginHorizontal: 3,
        marginVertical: 2,
        marginLeft: 14,
        alignSelf: "flex-start",
    },
    message:{
        color:'white',
    },

    image:{
        height: 12,
        width: 12,
        borderRadius: 24,
        position: "absolute",
        top: 0,
        left: -14
    },
})

export default ReceiverMessage