import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../screens/login'
import Followers from '../screens/followers'
import Coins from '../screens/coins'
import Settings from '../screens/settings'
import Likes from '../screens/likes'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; 
import EvilIcons from 'react-native-vector-icons/EvilIcons'; 
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown:false,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#4d4c4c',
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight:'bold'
        },
        tabBarStyle: {
              backgroundColor: '#8959D3',
              height:60,
              
          },
      }}
      
    >
      <Tab.Screen name="Followers" component={Followers} options={{
        tabBarIcon: ({focused}) => (<AntDesign name="addusergroup" size={24} color={focused?'white':"#4d4c4c"} />)}}/>
      <Tab.Screen name="Likes" component={Likes} options={{
        tabBarIcon: ({focused}) => (<AntDesign name="like2" size={24} color={focused?'white':"#4d4c4c"} />)}}/>
      <Tab.Screen name="Coins" component={Coins} options={{
        tabBarIcon: ({focused}) => (<FontAwesome5 name="coins" size={24} color={focused?'white':"#4d4c4c"} />)}}/>
      <Tab.Screen name="Settings" component={Settings} options={{
        tabBarIcon: ({focused}) => (<EvilIcons name="user" size={34} color={focused?'white':"#4d4c4c"} />)}}/>
    </Tab.Navigator>
  );
}
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Login'} screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="bottom" component={MyTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
