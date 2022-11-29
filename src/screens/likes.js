import * as React from 'react';
import { View, Text,TextInput,TouchableOpacity,Image,ActivityIndicator,Animated } from 'react-native';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-gesture-handler';
import ActionSheet from "react-native-actions-sheet";
import AntDesign from 'react-native-vector-icons/AntDesign'; 
import { useDispatch, useSelector } from 'react-redux';
import { Slider,Icon } from 'react-native-elements';
const Likes= ()=> {
    const [input,setInput] = React.useState(true)
    const [userData,setUserData] = React.useState({})
    const [fromValue, setFromValue] = React.useState(0);
    const [toValue, setToValue] = React.useState(0);
    const [loader, setLoader] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const [type, setType] = React.useState('likes');
    const [value2, setValue2] = React.useState(0);
    const [url, setURL] = React.useState('https://www.instagram.com/p/ClLRo8lObD8/?utm_source=ig_web_copy_link');
    const [pic_url, setPic_url] = React.useState('');
    const actionSheetRef = React.useRef();
    const actionSheetRef2 = React.useRef();
    // const height = Dimensions.win
    const states = useSelector((state)=>state);
    const dispatch = useDispatch();
    React.useEffect(() => {
      console.log(states.requests)
        data();
    },[input])
  const data = async()=>{
    const user = await AsyncStorage.getItem('user')
  }
  const getpost = () =>{
    setLoader(true);
    if(url==''){
      setLoader(false);
      return alert('Put your url!');
    }
    axios.post(states.url+'post',
      {
        'url':url,
      })
      .then(async function (response) {
        console.log(response.data);
        setLoader(false)
        // await AsyncStorage.setItem("user", JSON.stringify(response.data.response));
          setPic_url(response.data.response);
          setLoader(false)
          actionSheetRef.current.show()
      })
      .catch(function (error) {
        // handle error
        setLoader(false)
        alert('Check your Internet!');
      });
  }


  const getFollowers = (types)=>{
    setLoader(true)
    
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
        'coins':types=='followers'?states.likes.followers*value:types=='views'?states.likes.views*value2:types=='likes'?states.likes.likes*value2:states.likes.comments*value2
      })
      .then(function (response) {
        console.log(response.data);
        setLoader(false)
        // await AsyncStorage.setItem("user", JSON.stringify(response.data.response));
          dispatch({type:'GETCOINS',payload:types=='followers'?states.coins - states.likes.followers*value:types=='views'?states.coins - states.likes.views*value2:types=='likes'?states.coins - states.likes.likes*value2:states.coins - states.likes.comments*value2})
          dispatch({type:'GETREQUESTS',payload:states.requests.concat(response.data.response)})
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
  setURL(linkurl);
  actionSheetRef.current.show();
}
  return (
    <ScrollView  style={{ flex: 1,backgroundColor:'#1D1C24' }}>
      <View style={{height:70,paddingHorizontal:10,backgroundColor:'#8959D3',paddingTop:10,justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
        <Text></Text>
        <Text style={{fontSize:20,color:'white'}}>Likes</Text>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:20,color:'white',marginRight:5}}>{states.coins}</Text>
          <FontAwesome5 name="coins" size={24} color='yellow' />
        </View>
      </View>
      <TouchableOpacity onPress={()=>actionSheetRef2.current.show()} style={{marginHorizontal:10,marginTop:20,paddingVertical:10,borderRadius:10,backgroundColor:'#8959D3',alignItems:'center'}}>
          <Text style={{color:'white',fontSize:16}}>My Requests</Text>
      </TouchableOpacity>
      <Text style={{alignSelf:'center',color:'white',fontSize:18,marginTop:20}}>Missing image? Paste the image URL!</Text>
      <View style={{borderBottomColor:'white',borderBottomWidth:1,marginHorizontal:20,paddingTop:20}}>
        <TextInput 
          value={url}
          style={{color:'white'}}
          placeholder='https://www.instagram.com/p/BM3vjZZjdEK/'
          placeholderTextColor={'grey'}
          onChangeText={(text)=>{setURL(text)}}
        />
      </View>
      
      {loader?<TouchableOpacity style={{marginHorizontal:10,marginTop:20,paddingVertical:10,borderRadius:10,backgroundColor:'#8959D3',alignItems:'center'}}>
        <ActivityIndicator size="small" color="white" />
      </TouchableOpacity>
      :<TouchableOpacity onPress={()=>{getpost()}} style={{marginHorizontal:10,marginTop:20,paddingVertical:10,borderRadius:10,backgroundColor:'#8959D3',alignItems:'center'}}>
      <Text style={{color:'white',fontSize:16}}>Boost with URL</Text>
  </TouchableOpacity>}
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
      <TouchableOpacity onPress={()=>setType('commnets')} style={{marginHorizontal:10,width:'28%',marginTop:20,paddingVertical:10,backgroundColor:'#8959D3',borderRadius:10,borderColor:'#8959D3',borderWidth:1,alignItems:'center'}}>
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
    </ScrollView>
  );
}
export default Likes;