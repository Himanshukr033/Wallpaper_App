import 'react-native-gesture-handler';
import {
  View,
  Text,
  StatusBar,
  Platform,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import React from 'react';
import Home from './screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Search from './components/Search';
import {SafeAreaProvider,useSafeAreaInsets,} from 'react-native-safe-area-context';
import TabsScreen from './components/TabsScreen';
import Image from './components/ImageDisplay';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="black" barStyle="default" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{headerShown: false, contentStyle:{backgroundColor:'black'},}}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{title: 'Overview'}}
          />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Result" component={TabsScreen} />
          <Stack.Screen name="Image" component={Image} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {},
});
