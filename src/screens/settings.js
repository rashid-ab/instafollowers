import * as React from 'react';
import { View, Text, TouchableOpacity, Alert,Platform } from 'react-native';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector,useDispatch } from 'react-redux';

const Settings = ({ navigation }) => {
  const [input, setInput] = React.useState(true)
  const [loader, setLoader] = React.useState(false)
  const states = useSelector((state) => state);
  const GOOGLE_PACKAGE_NAME = 'com.apps.client.instaboost';
  const APPLE_STORE_ID = 'id284882215';
  const dispatch =useDispatch();
  React.useEffect(() => {
    data();
  }, [input])
  const data = async () => {
    const user = await AsyncStorage.getItem('user')
    
  }
  const logout = async () => {
    const token = await AsyncStorage.getItem('user');
    // return console.log('token',token)
    await AsyncStorage.removeItem('user');
    navigation.replace('Login')
  }
  const rating = () => {
    console.log(states.review)
    if(states.review){
      return alert('You already gave your review');
    }
    Alert.alert(
      'Rate us',
      'Would you like to share your review with us?This will help and motivate us a lot.',
      [
        {text: 'Sure', onPress: () => openStore()},
        {
          text: 'No Thanks!',
          onPress: () => console.log('No Thanks Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  }
  const openStore = () => {
    //This is the main trick
    
    axios.post(states.url+'addreview',
      {
        'username':states.profile.name,
      })
      .then(function (response) {
        console.log(response.data);
        if (Platform.OS != 'ios') {
          Linking.openURL(
            `market://details?id=${GOOGLE_PACKAGE_NAME}`,
          ).catch(
              (err) => alert('Please check for Google Play Store')
          );
        } else {
          Linking.openURL(
            `itms://itunes.apple.com/in/app/apple-store/${APPLE_STORE_ID}`,
          ).catch((err) => alert('Please check for the App Store'));
        }
        dispatch({type:'GETCOINS',payload:states.coins+30});
        alert('30 coins add in your account successfully')
      })
      .catch(function (error) {
        // handle error
        setLoader(false)
        alert('Check your Internet!');
      });
    
  };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#1D1C24' }}>
      <View style={{ height: 70, paddingHorizontal: 10, backgroundColor: '#8959D3', paddingTop: 10, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
        <Text></Text>
        <Text style={{ fontSize: 20, color: 'white' }}>Settings</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 20, color: 'white', marginRight: 5 }}>{states.coins}</Text>
          <FontAwesome5 name="coins" size={24} color='yellow' />
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 20 }}>
        <FontAwesome5 name="coins" size={24} color='yellow' />
        <Text style={{ color: 'white', fontSize: 18, marginHorizontal: 10 }}>Need more coins?</Text>
        <FontAwesome5 name="coins" size={24} color='yellow' />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Coins')} style={{ marginHorizontal: 20, marginVertical: 10, paddingVertical: 10, borderRadius: 10, backgroundColor: '#8959D3', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 16 }}>Get Coins</Text>
      </TouchableOpacity>
      <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, marginHorizontal: 10 }}></View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 20 }}>
        <FontAwesome5 name="coins" size={24} color='yellow' />
        <Text style={{ color: 'white', fontSize: 18, marginHorizontal: 10 }}>Contact us</Text>
        <FontAwesome5 name="coins" size={24} color='yellow' />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={{ marginHorizontal: 20, width: '40%', marginVertical: 10, paddingVertical: 10, borderRadius: 10, backgroundColor: '#8959D3', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 16 }}>Email</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginHorizontal: 20, width: '40%', marginVertical: 10, paddingVertical: 10, borderRadius: 10, backgroundColor: '#8959D3', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 16 }}>Facebook</Text>
        </TouchableOpacity>
      </View>
      <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, marginHorizontal: 10 }}></View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 20 }}>
        <FontAwesome5 name="coins" size={24} color='yellow' />
        <Text style={{ color: 'white', fontSize: 18, marginHorizontal: 10 }}>Help us to improve</Text>
        <FontAwesome5 name="coins" size={24} color='yellow' />
      </View>
      <TouchableOpacity onPress={()=>rating()} style={{ marginHorizontal: 20, marginVertical: 10, paddingVertical: 10, borderRadius: 10, backgroundColor: '#8959D3', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 16 }}>Rate App</Text>
      </TouchableOpacity>
      <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, marginHorizontal: 10 }}></View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 20 }}>
        <FontAwesome5 name="coins" size={24} color='yellow' />
        <Text style={{ color: 'white', fontSize: 18, marginHorizontal: 10 }}>Need more coins?</Text>
        <FontAwesome5 name="coins" size={24} color='yellow' />
      </View>
      <TouchableOpacity onPress={() => logout()} style={{ marginHorizontal: 20, marginVertical: 10, paddingVertical: 10, borderRadius: 10, backgroundColor: '#8959D3', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 16 }}>Logout</Text>
      </TouchableOpacity>
      <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, marginHorizontal: 10 }}></View>


    </ScrollView >
  );
}
export default Settings;