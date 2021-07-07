import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatFeed from '../Screens/ChatFeed';
import Profile from '../Screens/Profile';
import DemoScreen from '../Screens/DemoScreen';


const Tab = createBottomTabNavigator();
const TabNavigation = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    backgroundColor: '#1b2731',
                    height: 60
                }
            }}

        >
            <Tab.Screen name='Chat' component={ChatFeed}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                source={require('../Assets/Images/chat.png')}
                                style={{ height: 30, width: 30, tintColor: focused ? '#3bb385' : 'white' }}
                            />
                            <Text style={{ color: focused ? '#3bb385' : 'white', fontSize: 10, fontWeight: '700', letterSpacing: 1.5 }}>Home</Text>
                        </View>
                    )
                }}

            />
            <Tab.Screen name='Profile' component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                source={require('../Assets/Images/user.png')}
                                style={{ height: 30, width: 30, tintColor: focused ? '#3bb385' : 'white' }}
                            />
                            <Text style={{ color: focused ? '#3bb385' : 'white', fontSize: 10, fontWeight: '700', letterSpacing: 1.5 }}>Profile</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen name='DemoScreen' component={DemoScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                source={require('../Assets/Images/user.png')}
                                style={{ height: 30, width: 30, tintColor: focused ? '#3bb385' : 'white' }}
                            />
                            <Text style={{ color: focused ? '#3bb385' : 'white', fontSize: 10, fontWeight: '700', letterSpacing: 1.5 }}>Custom Chat</Text>
                        </View>
                    )
                }}
            />

        </Tab.Navigator>
    )
}

export default TabNavigation

const styles = StyleSheet.create({})
