import {StyleSheet,View,Text,Button} from 'react-native';
import React ,{useState}from 'react';
const RNMd5 =  require('react-native-md5')

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 20,
        fontWeight: '600',
      },
      titleStyle: {
        fontSize: 16,
        fontWeight: '500',
      },
      consta:{ backgroundColor: '#F5FCFF' },
});
export function Md5TestExample() {
    
    const [hmd5,set_hmd5] = useState('123');
    const [bmd5,set_bmd5] = useState('456');
    const [smd5,set_smd5] = useState('789');
    
    const [hmd5_h,set_hmd5_h] = useState('123');
    const [bmd5_h,set_bmd5_h] = useState('456');
    const [smd5_h,set_smd5_h] = useState('789');

    const [hmd5_h_key,set_hmd5_h_key] = useState('qwer');
    const [bmd5_h_key,set_bmd5_h_key] = useState('qwer');
    const [smd5_h_key,set_smd5_h_key] = useState('qwer');
    function generateRandomString(length:number) {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters[randomIndex];
        }
        return result;
    }
    
    return(
        <View  style = {styles.consta}>
            <Text style={styles.titleStyle}>{'\nhex_md5方法:'}</Text>
            <Text>明文:{hmd5} 密文:{RNMd5.hex_md5(hmd5)} <Button title = "随机明文" onPress={() => { set_hmd5(generateRandomString(10)) }}></Button></Text>
            <Text style={styles.titleStyle}>{'\nb64_md5方法:'}</Text>
            <Text>明文:{bmd5} 密文:{RNMd5.b64_md5(bmd5)} <Button title = "随机明文" onPress={() => { set_bmd5(generateRandomString(10)) }}></Button></Text>
            <Text style={styles.titleStyle}>{'\nstr_md5方法:'}</Text>
            <Text>明文:{smd5} 密文:{RNMd5.str_md5(smd5)} <Button title = "随机明文" onPress={() => { set_smd5(generateRandomString(10)) }}></Button></Text>
            <Text style={styles.titleStyle}>{'\nhex_md5方法:'}</Text>
            <Text>明文:{hmd5_h} key:{hmd5_h_key} 密文:{RNMd5.hex_hmac_md5(hmd5_h,hmd5_h_key)} <Button title = "随机明文" onPress={() => { set_hmd5_h(generateRandomString(10));set_hmd5_h_key(generateRandomString(10)) }}></Button></Text>
            <Text style={styles.titleStyle}>{'\nb64_hmac_md5方法:'}</Text>
            <Text>明文:{bmd5_h} key:{bmd5_h_key} 密文:{RNMd5.b64_hmac_md5(bmd5_h,bmd5_h_key)} <Button title = "随机明文" onPress={() => { set_bmd5_h(generateRandomString(10));set_bmd5_h_key(generateRandomString(10)) }}></Button></Text>
            <Text style={styles.titleStyle}>{'\nstr_hmac_md5方法:'}</Text>
            <Text>明文:{smd5_h} key:{smd5_h_key} 密文:{RNMd5.str_hmac_md5(smd5_h,smd5_h_key)} <Button title = "随机明文" onPress={() => { set_smd5_h(generateRandomString(10));set_smd5_h_key(generateRandomString(10)) }}></Button></Text>  
        </View>
    );
}