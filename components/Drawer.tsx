// import Animated, {
//   useSharedValue,
//   withSpring,
//   useAnimatedStyle,
//   Easing,
//   withTiming,
// } from 'react-native-reanimated';
// import {Text} from 'react-native';

// const FadeInView = () => {
//   const fadeAnim = useSharedValue(0);

//   const fadeIn = () => {
//     fadeAnim.value = withTiming(1, {
//       duration: 500,
//       easing: Easing.inOut(Easing.ease),
//     });
//   };

//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       opacity: fadeAnim.value,
//       transform: [
//         {
//           translateX: withSpring(fadeAnim.value * 100, {
//             damping: 2,
//             stiffness: 80,
//           }),
//         },
//       ],
//     };
//   });

//   return (
//     <Animated.View style={[styles.fadeInView, animatedStyle]}>
//       <Text style={{color:'white'}}> Hey</Text>
//     </Animated.View>
//   );
// };
// const styles = {
//   fadeInView: {
//     backgroundColor: 'lightgray',
//     padding: 20,
//     margin: 10,
//   },
// };

// export default FadeInView;
