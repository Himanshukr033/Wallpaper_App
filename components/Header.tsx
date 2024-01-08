import {StyleSheet,Button, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {MagnifyingGlassIcon, Bars3Icon, InformationCircleIcon} from 'react-native-heroicons/solid';


const Header = ({navigation}) => {
  const infoHandler =()=>{
      alert(
        'You can search images and set them as wallpaper. You can also download high quality Images',
      );
  }
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={infoHandler}
          style={styles.image}>
          <InformationCircleIcon size="25" color="black" />
        </TouchableOpacity>
        
        <Text style={{fontSize: 24, fontWeight: 'bold'}}>Wallpapers</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Search')}
          style={styles.image}>
          <MagnifyingGlassIcon size="25" color="black" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    padding: 10,
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#cafc03',
    width: 40,
    height: 40,
  },
});
