import * as React from 'react';
import { View, Text,TouchableOpacity,Image,ActivityIndicator,Animated } from 'react-native';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActionSheet from "react-native-actions-sheet";
import AntDesign  from 'react-native-vector-icons/AntDesign'; 
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; 
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector,useDispatch } from 'react-redux';
import { Slider,Icon } from 'react-native-elements';
const Followers= ({navigation})=> {
     const [input,setInput] = React.useState(true)
     const [userData,setUserData] = React.useState({})
     const [loader, setLoader] = React.useState(false);
     const [value, setValue] = React.useState(0);
     const [url, setUrl] = React.useState('');
     const [pic_url, setPic_url] = React.useState('');
     const [type, setType] = React.useState('likes');
     const [value2, setValue2] = React.useState(0);
     const states = useSelector((state)=>state);
     const actionSheetRef2 = React.useRef();
     const actionSheetRef = React.useRef();
     const dispatch = useDispatch();
    React.useEffect(() => {
        data();
    },[input])
  const data = async()=>{
    const user = await AsyncStorage.getItem('user')
    const currentUser = JSON.parse(user);
    setUserData(currentUser)
  }
  const getFollowers = (types)=>{
    setLoader(true)
    if(types=='follower'){
      if(value==0){
        setLoader(false)
        return alert('Please Select a Value!');
      }
      if(parseInt(states.coins) < states.likes.followers*value){
        setLoader(false)
        return alert('You have Less Coins!');
      }
    }
    if(types=='views'){
      if(value2==0){
        setLoader(false)
        return alert('Please Select a Value!');
      }
      if(parseInt(states.coins) < states.likes.views*value2){
        setLoader(false)
        return alert('You have Less Coins!');
      }
    }
    if(types=='likes'){
      if(value2==0){
        setLoader(false)
        return alert('Please Select a Value!');
      }
      if(parseInt(states.coins) < states.likes.likes*value2){
        setLoader(false)
        return alert('You have Less Coins!');
      }
    }
    if(types=='comments'){
      if(value2==0){
        setLoader(false)
        return alert('Please Select a Value!');
      }
      if(parseInt(states.coins) < states.likes.comments*value2){
        setLoader(false)
        return alert('You have Less Coins!');
      }
    }
    axios.post(states.url+'request',
      {
        'name':states.profile.name,
        'title':url,
        'url':url,
        'type':types.toLowerCase()+'s',
        'image':pic_url,
        'status':'true',
        'coins':types=='follower'?states.likes.followers*value:types=='views'?states.likes.views*value2:types=='likes'?states.likes.likes*value2:states.likes.comments*value2
      })
      .then(function (response) {
        setLoader(false)
        // await AsyncStorage.setItem("user", JSON.stringify(response.data.response));
          dispatch({type:'GETCOINS',payload:types=='follower'?states.coins - states.likes.followers*value:types=='views'?states.coins - states.likes.views*value2:types=='likes'?states.coins - states.likes.likes*value2:states.coins - states.likes.comments*value2})
          types!='follower'&&dispatch({type:'GETREQUESTS',payload:states.requests.concat(response.data.response)})
          setLoader(false)
          actionSheetRef.current.hide();
          alert('Your request will proceed within 24 hours!')
      })
      .catch(function (error) {
        // handle error
        setLoader(false)
        alert('Check your internet or try again');
      });
}
const previousPost = (imageurl,linkurl) =>{
  setPic_url(imageurl);
  setUrl(linkurl);
  actionSheetRef.current.show();
}
  return (
    <ScrollView  style={{ flex: 1,backgroundColor:'#1D1C24' }}>
      <View style={{height:70,paddingHorizontal:10,backgroundColor:'#8959D3',paddingTop:10,justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
        <Text></Text>
        <Text style={{fontSize:20,color:'white'}}>Followers</Text>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:20,color:'white',marginRight:5}}>{states.coins}</Text>
          <FontAwesome5 name="coins" size={24} color='yellow' />
        </View>
      </View>
      <Text style={{alignSelf:'center',marginTop:20,color:'white',fontSize:18}}>@{states.profile.name}</Text>
      <Image source={{uri:states.profile.profile_pic}} style={{borderRadius:10,marginTop:20,width:120,height:120,alignSelf:'center'}}  />
      <View style={{paddingTop:20,justifyContent:'space-around',flexDirection:'row'}}>
        <TouchableOpacity onPress={()=>navigation.navigate('Coins')} style={{width:'40%',paddingVertical:10,borderRadius:10,backgroundColor:'#EB7162',alignItems:'center'}}>
          <Text style={{color:'white',fontSize:16}}>Get Coins</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>states.requests.length>0?actionSheetRef2.current.show():alert('You have no request!')} style={{width:'40%',paddingVertical:10,borderRadius:10,backgroundColor:'#E4E56D',alignItems:'center'}}>
          <Text style={{color:'white',fontSize:16}}>My Request</Text>
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal:20,paddingVertical:15}}>
        <Text style={{color:'white',fontSize:16}}>Select number of followers that you want to recieve.</Text>
        <Text style={{color:'white',fontSize:16,alignSelf:'center'}}>20 Coins = 1 Follower</Text>
      </View>
      <View style={{height:100,marginHorizontal:20}}>
          <Slider
            value={value}
            onValueChange={setValue}
            maximumValue={100}
            minimumValue={0}
            step={1}
            trackStyle={{ height: 10, backgroundColor: 'transparent' }}
            thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
            thumbProps={{
              children: (
                <Icon
                  name="coins"
                  type="font-awesome-5"
                  size={20}
                  reverse
                  containerStyle={{ bottom: 20, right: 20 }}
                  color="#8959D3"
                />
              ),
            }}
          />
      </View>
      {value>0 && <Text style={{color:'white',fontSize:16,marginVertical:10,marginHorizontal:10}}>Followers {value} = {states.likes.followers*value} Coins </Text>}
      {!loader?
        <TouchableOpacity onPress={()=>{getFollowers('follower')}} style={{marginHorizontal:10,paddingVertical:10,borderRadius:10,backgroundColor:'#8959D3',alignItems:'center'}}>
          <Text style={{color:'white',fontSize:16}}>Get {value>0?value:''} Followers</Text>
        </TouchableOpacity>
          :
        <TouchableOpacity style={{marginHorizontal:10,paddingVertical:10,borderRadius:10,backgroundColor:'#8959D3',alignItems:'center'}}>
          <ActivityIndicator size="small" color="white" />
        </TouchableOpacity>
      }
      
      <View style={{alignItems:'center',paddingTop:10}}>
        <Text style={{color:'yellow'}}>ONLY GOLD FOLLOWERS</Text>
        <Text style={{color:'white'}}>100% UNFOLLOW GUARANTEE</Text>
      </View>

      <ActionSheet ref={actionSheetRef2} bounciness={10} bounceOnOpen={true} containerStyle={{
                backgroundColor: '#1D1C24',
                height:'100%',
                elevation: 0,
                shadowOpacity: 0,
            }}>
      
        <View style={{height:70,paddingHorizontal:10,backgroundColor:'#8959D3',paddingTop:10,justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
          <TouchableOpacity onPress={()=>actionSheetRef2.current.hide()}><AntDesign name="left"  size={24} color="white" /></TouchableOpacity>
          <Text style={{fontSize:20,color:'white'}}>Likes</Text>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{fontSize:20,color:'white',marginRight:5}}>{states.coins}</Text>
            <FontAwesome5 name="coins" size={24} color='yellow' />
          </View>
          
        </View>
        <ScrollView  style={{ flex: 1,backgroundColor:'#1D1C24' }}>
        
        {states.requests.map((items,i)=>(
          <TouchableOpacity onPress={()=>previousPost(items.image,items.url)} style={{flexDirection:'row',marginTop:20}}>
            <Image source={{uri:items.image}} style={{height:70,width:70,borderRadius:10,marginHorizontal:10}} />
                <View style={{flexDirection:'row',borderBottomColor:'white',borderBottomWidth:1}}>
                  <Text style={{width:'80%',color:'white',fontSize:18}}>{items.title}</Text>
                  <AntDesign name="right"  size={20} color="white" />
                </View>
          </TouchableOpacity>
          ))
        }
        
      
      </ScrollView>
    </ActionSheet>

    <ActionSheet ref={actionSheetRef} bounciness={10} bounceOnOpen={true} containerStyle={{
                backgroundColor: '#1D1C24',
                height:'100%',
                elevation: 0,
                shadowOpacity: 0,
            }}>
      <View style={{height:70,paddingHorizontal:10,backgroundColor:'#8959D3',paddingTop:10,justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
        <AntDesign name="left" onPress={()=>actionSheetRef.current.hide()} size={24} color="white" />
        <Text style={{fontSize:20,color:'white'}}>Likes</Text>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:20,color:'white',marginRight:5}}>{states.coins}</Text>
          <FontAwesome5 name="coins" size={24} color='yellow' />
        </View>
        
      </View>
      <Text style={{color:'white',fontSize:18,alignSelf:'center',marginVertical:10}}>{url}</Text>
      <Image source={{uri:pic_url}} style={{height:200,width:'100%',borderRadius:10,marginHorizontal:10}} />
      <View style={{flexDirection:'row',justifyContent:'center'}}>
      <TouchableOpacity onPress={()=>setType('likes')} style={{marginHorizontal:10,width:'28%',marginTop:20,backgroundColor:'#8959D3',paddingVertical:10,borderRadius:10,borderColor:'#8959D3',borderWidth:1,alignItems:'center'}}>
          <Text style={{color:'white',fontSize:16}}>Like</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>setType('comments')} style={{marginHorizontal:10,width:'28%',marginTop:20,paddingVertical:10,backgroundColor:'#8959D3',borderRadius:10,borderColor:'#8959D3',borderWidth:1,alignItems:'center'}}>
          <Text style={{color:'white',fontSize:16}}>Comments</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>setType('views')} style={{marginHorizontal:10,width:'28%',marginTop:20,paddingVertical:10,backgroundColor:'#8959D3',borderRadius:10,borderColor:'#8959D3',borderWidth:1,alignItems:'center'}}>
          <Text style={{color:'white',fontSize:16}}>Views</Text>
      </TouchableOpacity>
      </View>
      <Text style={{color:'white',fontSize:18,alignSelf:'center',marginVertical:10}}>4 coins = 1{type}</Text>
      <View style={{height:100,marginHorizontal:20}}>
        <Slider
            value={value2}
            onValueChange={value => setValue2(value)}
            maximumValue={100}
            minimumValue={0}
            step={1}
            trackStyle={{ height: 10, backgroundColor: 'transparent' }}
            thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
            thumbProps={{
              children: (
                <Icon
                  name="coins"
                  type="font-awesome-5"
                  size={20}
                  reverse
                  containerStyle={{ bottom: 20, right: 20 }}
                  color="#8959D3"
                />
              ),
            }}
          />
      </View>
      {value2>0 && <Text style={{color:'white',fontSize:16,marginVertical:10,marginHorizontal:10}}>{type} {value2} = {type=='likes'?states.likes.likes*value2:type=='views'?states.likes.views*value2:states.likes.comments*value2} Coins </Text>}

      {loader?<TouchableOpacity style={{marginHorizontal:10,marginTop:20,paddingVertical:10,borderRadius:10,backgroundColor:'#8959D3',alignItems:'center'}}>
        <ActivityIndicator size="small" color="white" />
      </TouchableOpacity>
      :<TouchableOpacity onPress={()=>getFollowers(type)} style={{marginHorizontal:10,marginTop:20,paddingVertical:10,borderRadius:10,backgroundColor:'#8959D3',alignItems:'center'}}>
          <Text style={{color:'white',fontSize:16}}>Get {value2>0&&value2} {type}s</Text>
      </TouchableOpacity>}
    </ActionSheet>
    </ScrollView >
  );
}
export default Followers;