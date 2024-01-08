import {
  Button,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Platform,
  NativeModules,
} from 'react-native';
import React, {useState} from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import {
  ArrowDownTrayIcon,
  ArrowLeftCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from 'react-native-heroicons/solid';
import Images from './Images';
import ManageWallpaper, { TYPE } from 'react-native-manage-wallpaper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Image = ({route, navigation}) => {
  const [info, setInfo] = useState(false);
  const desiredHeight = windowHeight * 0.9;
  const aspectRatio = route.params.height / route.params.width;
  const newWidth = desiredHeight / aspectRatio;

  const backHandler = () => {
    navigation.goBack();
  };
  const infoHandler = () => {
    setInfo(!info);
  };
  const checkPermission = async () => {
    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download Photos',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage Permission Granted.');
          downloadImage();
        } else {
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };
  const getExtention = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  const downloadImage = () => {

    let date = new Date();
    let image_URL = route.params.image.large2x;
    let ext = getExtention(image_URL);
    ext = '.' + ext[0];
    const {config, fs} = RNFetchBlob;
    let PictureDir =
      Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.DownloadDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        console.log('res -> ', JSON.stringify(res));
        alert('Image Downloaded Successfully.');
      })
  };

  const callback = res => {
    alert(res.msg);
    console.log('Response: ', res);
  };

  const setWallpaper = () => {
   ManageWallpaper.setWallpaper(
      {
        uri: route.params.image.large2x,
      },
      callback,
      TYPE.HOME,
    );
  };

  return (
    <View>
      {route.params ? (
        <View style={styles.container}>
          <TouchableOpacity onPress={backHandler} style={styles.icon}>
            <ArrowLeftCircleIcon size="25" color="black" />
          </TouchableOpacity>
          <View style={styles.container}>
            <TouchableOpacity onPress={infoHandler} style={styles.icon}>
              <InformationCircleIcon size="25" color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={checkPermission} style={styles.icon}>
              <ArrowDownTrayIcon size="25" color="black" />
            </TouchableOpacity>
          </View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={info}
            onRequestClose={infoHandler}>
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPress={infoHandler}
            />
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={{color: 'black'}}>{route.params.info}</Text>

                <TouchableOpacity
                  onPress={infoHandler}
                  style={styles.closeButton}>
                  <XCircleIcon size="20" color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      ) : null}
      <ScrollView horizontal={true}>
        <View
          style={{
            height: windowHeight * 0.9,
            width: newWidth,
            alignSelf: 'center',
          }}>
          <Images source={route.params.image} tab="no" />
        </View>
      </ScrollView>

      <View style={styles.buttom}>
        <Button title="Set Wallpaper" onPress={setWallpaper} />
      </View>
    </View>
  );
};

export default Image;

const styles = StyleSheet.create({
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#cafc03',
    width: 30,
    height: 30,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  buttom: {
    width: windowWidth * 0.6,
    borderRadius: 200,
    overflow: 'hidden',
    position: 'absolute',
    top: windowHeight * 0.9,
    alignSelf: 'center',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: windowWidth * 0.7,
    position: 'absolute',
    top: windowHeight * 0.1,
    alignSelf: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '100%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    padding: 2,
    backgroundColor: '#cafc03',
    borderRadius: 5,
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
