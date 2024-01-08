import {StyleSheet, Image, View} from 'react-native';
import React from 'react';

const Images = props => {
  return (
    <View>
      {props.tab === 'yes' ? (
        <Image source={{uri: props.source.medium}} style={styles.image} />
      ) : (
        <Image source={{uri: props.source.large2x}} style={styles.image} />
      )}
    </View>
  );
};

export default Images;

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
});
