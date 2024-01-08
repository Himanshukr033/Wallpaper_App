import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import { check } from './Constant';

import {
  ArrowLeftCircleIcon,
  BackspaceIcon,
} from 'react-native-heroicons/solid';

const windowWidth = Dimensions.get('window').width;

const Search = ({route, navigation}) => {
  const [searchWord, setSearchWord] = useState('');
  console.log(route.name);

  const BackHandler = () => {
    navigation.navigate('Home');
  };

  const deleteHandler = () => {
    setSearchWord('');
  };

  const selectHandler = word => {
    console.log(word);
    navigation.navigate('Result', {Word: word});
  };

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity onPress={BackHandler} style={styles.image}>
          <ArrowLeftCircleIcon size="35" color="black" />
        </TouchableOpacity>
        <TextInput
          placeholder="Search"
          onChange={event => {
            setSearchWord(event.nativeEvent.text);
          }}
          value={searchWord}
          autoFocus={true}
          style={styles.Input}
          onSubmitEditing={event => selectHandler(event.nativeEvent.text)}
        />
        <TouchableOpacity onPress={deleteHandler} style={styles.image}>
          <BackspaceIcon size="30" color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.suggestions}>
        {check.map((word, index) => (
          <TouchableOpacity
            style={styles.search}
            key={index}
            onPress={() => selectHandler(word)}>
            <Text style={{color: 'white', fontSize: 16, fontWeight: '500'}}>
              {word}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#cafc03',
    width: 40,
    height: 40,
  },
  Input: {
    width: windowWidth * 0.6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#34303b',
  },
  search: {
    backgroundColor: 'black',
    alignSelf: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius:15,
    marginVertical:5,
    marginHorizontal:2,
  },
  suggestions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal:10,
  },
});
