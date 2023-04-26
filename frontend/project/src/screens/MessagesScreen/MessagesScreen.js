import { View, Text, KeyboardAvoidingView, Keyboard } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import ReceiverMessage from '../../components/ReceiverMessage';
import SenderMessage from '../../components/SenderMessage';

const MessagesScreen = ({matchDetails}) => {
    // const user = useAuth(); //my user
    const { params } = useRoute();
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState("");
    const { matchDetails } = params;
    
    // useEffect(() => {    
        // onSnapshot(query(collection(db, 'matches', matchDetails.id, 'messages'), orderBy
        // ('timestamp', 'desc'), 
        //    (snapshot) => setMessages(snapshot.docs.map(doc => ({
        //         id: doc.id,
        //         ...doc.data()
        //    })))
    // }, [matchDetails, db])

    const sendMessage = () => {
        // addDoc(collection(db, "matches", matchDetails.id, "messages"), {
        //     timestamp: serverTimeStamp(),
        //     userId: users.uid,
        //     displayName: users.displayName,
        //     photoURL: matchDetails.users[users.uid].photoURL,
        //     message: input,
        // })
        // {
        //     timestamp:
        //     userId:
        //     displayName:
        //     photoURL:
        //     message: input
        // }

        // setInput("")
    };
  return (
    <SafeAreaView style={styles.safeView}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboard}   
        keyboardVerticalOffset={10} 
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
              <FlatList 
                data={messages}
                inverted={-1}
                style={styles.list}
                keyExtractor={item => item.id}
                renderItem={({ item: message }) =>
                    messages.userId === users.uid ? (
                        <SenderMessage key={message.id} messages={message} />
                    ) : (
                        <ReceiverMessage key={message.id} message={message} />
                    )  
                }
              />
            </>  
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <View style={styles.view}>
        <TextInput 
            style={styles.text}
            placeholder="Send Message..."
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
        />
        <Button onPress={sendMessage} title='send' color="#FF5864" />
      </View>
       
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    text:{
        height: 10,
        fontSize: 18,
    },
    view:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#CCCCCC',
        paddingHorizontal: 5,
        paddingVertical: 2,
    },
    safeView: {
        flex: 1,
    },
    keyboard: {
        flex: 1,
    },
})
export default MessagesScreen