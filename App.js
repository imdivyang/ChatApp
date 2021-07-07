import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Home from './Src/Screens/Home';
import Login from './Src/Screens/Login';
import SignUp from './Src/Screens/SignUp';
import ChatFeed from './Src/Screens/ChatFeed';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import TabNavigation from './Src/Navigation/TabNavigation';
import EditProfile from './Src/Screens/EditProfile';
import Messages from './Src/Screens/Messages';
import OTP from './Src/Screens/OTP';
import CustomMessages from './Src/Screens/CustomMessages';
import DemoScreen from './Src/Screens/DemoScreen';
import ModalView from "./Src/Component/ModalView";

const Stack = createStackNavigator();

const AuthStack = () => {
  GoogleSignin.configure({
    webClientId: '920828584108-apntc9okgok09brfc4p40sc82s6oc05a.apps.googleusercontent.com',
  });
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={Home}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='Login'
        component={Login}
        options={({ navigation }) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#1b2731',
            shadowColor: '#1b2731',
            elevation: 0,
          },
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <MaterialIcons.Button
                name="arrow-back"
                size={25}
                backgroundColor="#1b2731"
                color="#fff"
                onPress={() => navigation.navigate('SignUp')}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen name='SignUp' component={SignUp}
        options={({ navigation }) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#1b2731',
            shadowColor: '#1b2731',
            elevation: 0,
          },
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <MaterialIcons.Button
                name="arrow-back"
                size={25}
                backgroundColor="#1b2731"
                color="#fff"
                onPress={() => navigation.navigate('Login')}
              />
            </View>
          ),
        })}
      />

      <Stack.Screen name='OTP' component={OTP} />
    </Stack.Navigator>
  )
}

const AppStack = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen name='Tab' component={TabNavigation}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen name='Edit' component={EditProfile}
        options={({ navigation }) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#1b2731',
            shadowColor: '#1b2731',
            elevation: 0,
          },
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <MaterialIcons.Button
                name="arrow-back"
                size={25}
                backgroundColor="#1b2731"
                color="#3bb385"
                onPress={() => navigation.navigate('Profile')}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen name='Messages' component={Messages}
        options={({ route, navigation }) => ({
          title: route.params.userName,
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#1b2731',
          },
          headerTintColor: '#3bb385',
          headerTitleAlign: 'center',
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <Ionicons.Button
                name="camera"
                size={25}
                backgroundColor="#1b2731"
                color="#3bb385"
                onPress={() => { }}
              />
            </View>
          ),
          headerLeft: () => (
            <View style={{ flexDirection: 'row' }}>
              <MaterialIcons.Button
                name="arrow-back"
                size={25}
                backgroundColor="#1b2731"
                color="#3bb385"
                onPress={() => navigation.navigate('Tab')}
              />
              <Image source={{ uri: route.params.userImg }} style={{ height: 40, width: 40, borderRadius: 20, marginRight: 0 }} />
            </View>
          ),

        })}
      />
      <Stack.Screen name='CustomMessages' component={CustomMessages}
        options={({ route, navigation }) => ({
          title: route.params.userName,
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#1b2731',
          },
          headerTintColor: '#3bb385',
          headerTitleAlign: 'center',

          headerLeft: () => (
            <View style={{ flexDirection: 'row' }}>
              <MaterialIcons.Button
                name="arrow-back"
                size={25}
                backgroundColor="#1b2731"
                color="#3bb385"
                onPress={() => navigation.navigate('Tab')}
              />
              <Image source={{ uri: route.params.userImg }} style={{ height: 40, width: 40, borderRadius: 20, marginRight: 0 }} />
            </View>
          ),
        })}
      />

    </Stack.Navigator>
  )
}

const App = () => {
  const [authenticated, setAuthenticated] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (authenticated) setAuthenticated(false)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [])

  if (authenticated) return null
  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})
