import * as React from 'react';
import { View, Text,TextInput,TouchableOpacity,Image,ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements'
import axios from 'axios'
import  LinearGradient  from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector,useDispatch } from 'react-redux';
const HomeScreen=({navigation})=> {
  const dispatch =  useDispatch();

  const init= useSelector((state)=>state)
    const[name,setName]=React.useState('rashidbutt5')
    const[loader,setLoader]=React.useState(false)
    const[authloader,setAuthLoader]=React.useState(true)
    React.useEffect(()=>{
      
      checkToken();
    },[])
  const checkToken = async() =>{
      let user =await AsyncStorage.getItem('user');
      if(user){
        user = JSON.parse(user);
        axios.post(init.url+'getrequest',{'username':user.name})
        .then(async function (response) {
          if(response.data.coins){
            dispatch({type:'GETCOINS',payload:response.data.coins.coins})
          }
            dispatch({type:'GETREQUESTS',payload:response.data.request})
            dispatch({type:'PROFILE',payload:{name:user.name,profile_pic:user.profile_pic}})
            dispatch({type:'LIKES',payload:response.data.likes})
            dispatch({type:'REVIEW',payload:response.data.review})
            navigation.replace('bottom');
            setAuthLoader(false);
        })
        .catch(function (error) {
          // handle error
          setLoader(false)
          alert('Check your internet or try again');
        });
        
      }
      else{
        setAuthLoader(false);
      }
    }
  const clickLogin = () => {
    setLoader(true)
    if(name==''){
      setLoader(false)
      return alert('Enter Username!')
    }
    axios.post(init.url+'profile',{'username':name})
    .then(async function (response) {
      await AsyncStorage.setItem("user", JSON.stringify({name:name,profile_pic:response.data.profile_pic}));
      if(response.data.coins){
        dispatch({type:'GETCOINS',payload:response.data.coins.coins})
      }
        dispatch({type:'GETREQUESTS',payload:response.data.request})
        dispatch({type:'PROFILE',payload:{name:name,profile_pic:response.data.profile_pic}})
        dispatch({type:'LIKES',payload:response.data.likes})
        dispatch({type:'REVIEW',payload:response.data.review})
        navigation.replace('bottom')
        setLoader(false)
    })
    .catch(function (error) {
      // handle error
      setLoader(false)
      alert('Check your internet or try again');
    });
  }
  return (
    authloader?
    <View  style={{ flex: 1,paddingTop:100,backgroundColor:'#1D1C24',alignItems:'center',justifyContent:'center' }}>
      <ActivityIndicator size="large" color="white" />
    </View>
    :
    <View  style={{ flex: 1,paddingTop:100,backgroundColor:'#1D1C24' }}>
     <View style={{alignItems:'center',justifyContent:'center'}}>
        <Image source={require('../assets/follow.png')} style={{width:200,height:200}} />
      </View>
        <View style={{alignItems:'center',justifyContent:'center'}}>
            <Text style={{color:'white',fontSize:18}}>We know how to make you popular!</Text>
        </View>
      <View style={{flexDirection:'row',paddingVertical:10,borderBottomColor:'#8959D3',borderBottomWidth:1,marginHorizontal:20}}>
        <Icon name='ios-logo-instagram' style={{marginTop:15}} type='ionicon' size={24} color='#8959D3' />
        <TextInput
            style={{color:'white',width:'90%',fontSize:18,marginLeft:10}}
            value={name}
            onChangeText={setName}
            placeholder="Instagram user name"
            placeholderTextColor={'#bdbbbb'}
        />
      </View>
      <LinearGradient colors={['#735ce0', '#9f4bbb']} style={{alignSelf:'center',justifyContent:'center',paddingVertical:20,borderRadius:10,marginTop:20,width:'50%',alignItems:'center'}}>
        <TouchableOpacity onPress={()=>clickLogin()} > 
          {loader?<ActivityIndicator size="small" color="white" />:
            <Text style={{fontWeight:'bold',fontSize:16,color:'white'}}>Start using App</Text>}
        </TouchableOpacity>
      </LinearGradient>
      </View>

    );
}
export default HomeScreen;