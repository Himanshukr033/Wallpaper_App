import { Animated, Easing, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import LottieView from 'lottie-react-native'

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);
const Splash = () => {
  const animationProgress = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, []);
  return (
    <AnimatedLottieView
      source={require('../assets/loader.json')}
      progress={animationProgress.current}
    />
  );
}

export default Splash

const styles = StyleSheet.create({})