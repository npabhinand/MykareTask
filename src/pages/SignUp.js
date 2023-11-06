import { View, Text, SafeAreaView, StyleSheet, TextInput, 
TouchableOpacity, Image, ToastAndroid,Alert } from 'react-native';
import React, { useState } from 'react';
import { Avatar, color } from '@rneui/base';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [checked, setChecked] = useState('user');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || !name ) {
      Alert.alert('Error', 'Please fill in all the required fields');
      return; // Exit the function
    }
    const existingAccounts = await AsyncStorage.getItem('userAccounts');
    const accounts = JSON.parse(existingAccounts) || [];

    if (accounts.find(account => account.email === email)) {
      alert('Account with this email already exists.');
    } else {
      // Create a new account
      const newAccount = {
        name,
        email,
        password,
      };
      accounts.push(newAccount);
      await AsyncStorage.setItem('userAccounts', JSON.stringify(accounts));

      setName('');
      setEmail('');
      setPassword('');
      navigation.navigate('Login');
      ToastAndroid.show('Sign-up successful!', ToastAndroid.SHORT);

    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
 
 

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screen}>
        <Text style={styles.font}>Sign Up</Text>
      </View>

     
        
      <View style={styles.form1}>
        <Avatar source={require('../assets/person.png')} containerStyle={{marginLeft:5}}/>
        <TextInput
          placeholder="Enter Name"
          style={{ color: 'black' }} placeholderTextColor="black"
          onChangeText={setName}></TextInput>
      </View>
      <View style={[styles.form1, {marginTop: 20}]}>
        <Avatar
          size={32}
          source={require('../assets/email.png')}
          containerStyle={{marginLeft: 10, marginTop: 5}}
        />
        <TextInput
          placeholder="Enter Email"
          style={{ color: 'black' }} placeholderTextColor="black"
          onChangeText={setEmail}></TextInput>
      </View>
    

      

      <View style={[styles.form1, {marginTop: 20}]}>
        <Avatar
          source={require('../assets/password.png')}
          containerStyle={{marginLeft: 5}}
        />
        <TextInput placeholder="Enter Password" onChangeText={setPassword}  secureTextEntry={!showPassword} style={{ color: 'black' }} placeholderTextColor="black"/>
        <TouchableOpacity
              style={{
                position: "absolute",
                top: 10,
                right: 30,
              }}
              onPress={togglePasswordVisibility}
            >
              <Image
                source={
                  showPassword
                    ? require("../assets/eye.png")
                    : require("../assets/blind.png")
                }
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>
            </View>

      <View style={[styles.Button, {marginTop: 20}]}>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.buttonText}>SignUp</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.signup}>
        <Text style={{color:'black'}}>Already have an account?</Text>
        <Text
          style={styles.textColor}
          onPress={() => navigation.navigate('Login')}>
          {' '}
          Login
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screen: {
    alignItems: 'center',
  },
  font: {
    fontSize: 28,
    fontWeight: '500',
    color: '#333',
    marginBottom: 30,
    color:'black'
  },
  form1: {
    flexDirection: 'row',
    borderColor: '#ccc',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 2,
    width: '95%',
    borderRadius: 10,
    color:'black'
  },
  Button: {
    width: '95%',
    height: 50,
    backgroundColor: '#E01E14',
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10,
    color: 'white',
  },
  textColor: {
    color: '#EB5E52',
  },
  signup: {
    textAlign: 'center',
    flexDirection: 'row',
    marginTop: 50,
  },radio:{ 
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent:'flex-start',
     padding: 10 
    },
    radioText:{ marginRight: 20,
       fontSize: 18 ,
       color:'black'
      }
});
