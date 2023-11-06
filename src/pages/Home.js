import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function Home({route, navigation}) {
  const {user} = route.params;
  const [showDetails, setShowDetails] = useState(false);

  const signOut = () => {
    navigation.navigate('Login');
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{width:'100%',height:60,backgroundColor:'white'}}>
        <Text style={[styles.heading,{fontSize:30,marginTop:10}]}>Hello {user.name}</Text>
        </View>
        <Image source={require('../assets/user.jpg')} style={styles.images} />

        <TouchableOpacity
          style={[styles.box, {backgroundColor: '#ff8717'}]}
          onPress={toggleDetails}>
          <Text style={{color: '#FFFFFF', fontSize: 20}}>
            {showDetails ? 'Hide Details' : 'Fetch Details'}
          </Text>
        </TouchableOpacity>

        {showDetails && (
          <>
            <View style={styles.box}>
              <Image
                source={require('../assets/person.png')}
                style={styles.boxImage}
              />
              <Text style={styles.heading}>{user.name}</Text>
            </View>

            <View style={styles.box}>
              <Image
                source={require('../assets/email.png')}
                style={styles.boxImage}
              />
              <Text style={styles.heading}>{user.email}</Text>
            </View>
            <TouchableOpacity
              style={[styles.box, {backgroundColor: '#ff8717'}]}
              onPress={signOut}>
              <Text style={{color: '#FFFFFF', fontSize: 20}}>Logout</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  images: {
    height: 400,
    width: 400,
    alignSelf: 'center',
    marginTop: 30,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'black',
    textAlign:'center'
  },
  box: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: '90%',
    padding: 20,
    paddingBottom: 22,
    borderRadius: 10,
    shadowOpacity: 80,
    elevation: 15,
    marginTop: 40,
    marginBottom: 20,
  },
  boxImage: {
    width: 20,
    height: 20,
    marginTop: 5,
  },
});
