import {View, Text, ScrollView} from 'react-native';
import React, { useRef } from 'react';
import Header from '../components/Header';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {tabs} from '../components/Constant';
import TabsScreen from '../components/TabsScreen';

const Tab = createMaterialTopTabNavigator();

const Home = ({navigation, route}) => {

  console.log(route.name);
  return (
    <>
      <Header navigation={navigation} />
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarAndroidRipple: {borderless: false},
          tabBarPressColor: '#ffffff',
          tabBarLabelStyle: {fontSize: 12, fontWeight: 'bold'},
          tabBarItemStyle: {width: 100},
          tabBarStyle: {
            backgroundColor: 'black',
            borderBottomWidth: 2,
            borderBottomColor: '#14503b',
          },
          tabBarActiveTintColor: 'orange',
        }}
        sceneContainerStyle={{ backgroundColor: 'black' }}>
        {tabs.map((tab, index) => (
          <Tab.Screen name={tab} component={TabsScreen} key={index} />
        ))}
      </Tab.Navigator>
    </>
  );
};

export default Home;
