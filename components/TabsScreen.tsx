import { StyleSheet, Text, Image,View,ScrollView,TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import DrawerExample from './Drawer';
import { ArrowLeftCircleIcon } from 'react-native-heroicons/solid';
import {API_KEY} from '@env';
import Images from './Images';
import axios from 'react-native-axios';
import Splash from '../screens/Splash';


const windowHeight = Dimensions.get('screen').height;
const windowWidth = Dimensions.get('screen').width;

console.log(windowHeight);
console.log(windowWidth);

const TabsScreen = ({route, navigation}) => {
  const searchWord = route.params ? route.params : route.name;
  // console.log(API_KEY);
  
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  
  const viewHandler = (links, alt, width, height) => {
    navigation.navigate('Image', {image: links, info: alt, width:width, height: height});
  };

  const backHandler = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('https://api.pexels.com/v1/search', {
          headers: {
            Authorization: API_KEY, 
          },
          params: {
            query: searchWord,
            page: currentPage,
            per_page: 40,
          },
        });
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
        const newPhotos = response.data.photos;
        setPhotos(newPhotos);
        // setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        alert(error.message);
        console.error('Error fetching photos:', error.message);
      }
    };

    fetchPhotos();
  }, [currentPage]);
  return (
    <View style={{backgroundColor: 'black'}}>
      {route.params ? (
        <View style={styles.container}>
          <TouchableOpacity onPress={backHandler} style={styles.icon}>
            <ArrowLeftCircleIcon size="35" color="black" />
          </TouchableOpacity>
          <Text style={{paddingLeft: '25%', fontSize: 20, fontWeight: 'bold'}}>
            {route.params.Word}
          </Text>
        </View>
      ) : null}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
          <Text>Loading...</Text>
        </View>
      ) : (
        <View style={{backgroundColor: '#0e021a'}}>
          <ScrollView contentContainerStyle={styles.imageContainer}>
            {photos?.map((photo, index) => (
              <TouchableOpacity
                onPress={() =>
                  viewHandler(photo.src, photo.alt, photo.width, photo.height)
                }
                key={index}
                style={styles.image}>
                <Images source={photo.src} tab="yes" />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

export default TabsScreen

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#55555550',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#cafc03',
    width: 40,
    height: 40,
  },
  loadingContainer: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: windowWidth * 0.46,
    height: windowHeight * 0.25,
    marginVertical:5,
  },
  imageContainer: {
    display: 'flex',
    flexDirection:'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal:10,
    marginBottom:10,
  },
});