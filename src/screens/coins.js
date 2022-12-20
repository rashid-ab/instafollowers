import * as React from 'react';
import { View, Text,TextInput,TouchableOpacity,ActivityIndicator, Platform, Alert } from 'react-native';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; 
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector,useDispatch } from 'react-redux';
import * as RNIap from 'react-native-iap';
const Coins= ()=> {
    const [input,setInput] = React.useState(true)
    const [datas,setData] = React.useState([])
    const [fromValue, setFromValue] = React.useState(0);
     const [toValue, setToValue] = React.useState(0);
     const [value, setValue] = React.useState(0);
     const [loader,setLoader] = React.useState(true)
     const [item,setItems] = React.useState('')
     const [coins,setCoins] = React.useState(useSelector((state)=>state.coins))
     const desipatch = useDispatch();
     const states = useSelector((state)=>state);

    React.useEffect(() => {
      console.log(RNIap.getProducts)
      // RNIap.initConnection().then(async () => {
      //   alert('connected')
      //   const itemSkus = Platform.select({
      //     ios: ['com.instaboost.firstproduct'],
      //     android:['com.instaboost.firstproduct']
      //   });
      //   RNIap.getProducts(['com.instaboost.firstproduct']).then(async res=>{
      //     console.log('res',res)
      //     setItems(res.productId)
          
      //   }).catch(e=>{
      //     alert(e+'aaaaaaaaaa')
      //   })
      // }).catch((e) => {
      //   alert(e+'asdasd')
      // })
      // async ()=>{
        console.log('RNIap','products')
      //  RNIap.prepare();
      const products =  RNIap.getProducts(['firstproduct']);
      console.log('RNIap',products)
    // }
        data();
        // const purchaseUpdatedListener = RNIap.purchaseUpdatedListener(purchase=>{
        //   try {
        //     if(purchase){
        //       const reciept =purchase?.transactionReceipt
        //       ? purchase?.transactionReceipt
        //       : purchase?.originalJson
        //       if(reciept){
        //         const ackResult = RNIap.finishTransaction(purchase);
        //         Alert.alert("Result"+ JSON.stringify(ackResult))
        //       }
        //     }
        //   } catch (error) {
        //     Alert.alert("purchaseUpdatedListener"+ error)
        //   }
        // })
        // const purchaseErrorListener = RNIap.purchaseErrorListener(error=>{
        //   Alert.alrt("urchaseErrorListner"+ error)
        // })
        // return ()=>{
        //   purchaseUpdatedListener.remove();
        //   purchaseErrorListener.remove();
        // }
    },[input])
  const data = async()=>{
    
    const user = await AsyncStorage.getItem('user')
    axios.post(states.url+'getcoins',{platform:Platform.OS})
    .then(async function (response) {
      const itemSkus = Platform.select({
        ios: response.data.mycoins,
        android:response.data.mycoins
      });
      console.log('hjhjhjhj',itemSkus);
      
      setData(response.data.response);
      setLoader(false)
    })
    .catch(function (error) {
      setLoader(false)
      alert('Check your Internet');
    });
    
  }
  const getcoins = (coins)=>{
    alert(a);
      desipatch({type:'GETCOINS',payload:coins})
  }
  const prepareAsync=async(product)=> {
    
    try {
      const result=await RNIap.requestPurchase('com.apps.client.instaboost.first_coin');
      alert(result)
    } catch (error) {
      alert(error.message)
    }
  }
  return (
    datas.length>0?
      <ScrollView  style={{ flex: 1,backgroundColor:'#1D1C24' }}>

      <View style={{height:70,paddingHorizontal:10,backgroundColor:'#8959D3',paddingTop:10,justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
        <Text></Text>
        <Text style={{fontSize:20,color:'white'}}>Coins</Text>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:20,color:'white',marginRight:5}}>{states.coins}</Text>
          <FontAwesome5 name="coins" size={24} color='yellow' />
        </View>
      </View>
      {datas.map((items,i)=>(
        <TouchableOpacity onPress={()=>prepareAsync(items)} style={{marginHorizontal:10,marginTop:20,paddingVertical:10,borderRadius:10,backgroundColor:items.colors,alignItems:'center'}}>
            <Text style={{color:'white',fontSize:16}}>{items.coins} coins for {items.currency} {items.price}</Text>
        </TouchableOpacity>
      ))
      }
      {datas.length>0?
        <Text style={{color:'white',fontSize:16,marginHorizontal:10,marginTop:10}}>In case of issues regarding coins,please contact us via example@gmail.com</Text>
        :
        <Text style={{color:'white',fontSize:20,marginHorizontal:10,marginTop:10,alignSelf:'center'}}>No Data Found</Text>
      }
    </ScrollView >
    :
    <View style={{ flex: 1,backgroundColor:'#1D1C24' }}>
      <View style={{height:70,paddingHorizontal:10,backgroundColor:'#8959D3',paddingTop:10,justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
        <Text></Text>
        <Text style={{fontSize:20,color:'white'}}>Coins</Text>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:20,color:'white',marginRight:5}}>{states.coins}</Text>
          <FontAwesome5 name="coins" size={24} color='yellow' />
        </View>
      </View>
     
      <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
      { loader?
        <ActivityIndicator size="large" color="white" />
        :
        <Text style={{color:'white',fontSize:18}}>No Data Found</Text>
      }
      </View>
    </View>
    


 );
}
export default Coins;