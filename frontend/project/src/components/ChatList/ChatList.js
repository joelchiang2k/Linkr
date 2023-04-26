import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ChatList = ({matchDetails}) => {
    const navigation = useNavigation();
    const [matchedUserInfo, setMatchedUserInfo] = useState(null);
    
    const getMatchedUserInfo = (users, userLoggedInId) => {
        const newUsers = { ...users };
        delete newUsers[userLoggedInId]; // removes my id

        const [id, user] = Object.entries(newUsers).flat() //turns object into 1d array;

        return { id, ...user};
    }

    useEffect(() => {
        setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.id))
    }, [matchDetails, user])



    return (
        <TouchableOpacity 
            style={[styles.cardShadow, styles.container]}
            onPress={() => navigation.navigate('MessageScreen', {
                matchDetails,
            })}
        >
            <Image 
                style={styles.image}
                source={{ uri: matchedUserInfo?.photoURL }}
            />
            <Text style={styles.name}>
                {matchedUserInfo?.displayName}
            </Text>
            <Text>"Say Hi!"</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardShadow:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    image:{
        borderRadius: 9999,
        height: 16,
        width: 16,
        marginRight: 4,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 3,
        paddingHorizontal: 5,
        backgroundColor: 'white',
        marginHorizontal: 3,
        marginVertical: 1,
        borderRadius: 10,
    },
    name:{
        fontSize: 18, // equivalent to text-lg
        fontWeight: '600', // equivalent to font-semibold
    },
});

export default ChatList