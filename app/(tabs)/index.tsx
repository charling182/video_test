import { StyleSheet, Button, TouchableOpacity } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation'
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { setStatusBarHidden } from 'expo-status-bar'
// import Video from 'react-native-video';
import { ResizeMode } from 'expo-av'
import VideoPlayer from 'expo-video-player'
import React, { useEffect, useRef, useState } from 'react';

export default function TabOneScreen() {
  const videoRef = useRef(null);
  const [inFullscreen2, setInFullsreen2] = useState(false)

  // async function loadAsync() {
  //   try {
  //     console.log('loadAsync-----');

  //     await videoRef.current.loadAsync({
  //       uri: 'https://vip.ffzyread.com/20240301/24303_f0da8c06/index.m3u8',
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  const loadAsync = () => {
    try {
      console.log('loadAsync------');

    } catch (error) {
      console.error(error);
    }
  }
  const onPress = () => {
    console.log('666-----');
    console.log(videoRef);
  }
  const handleErrorCallback = (error) => {
    console.log('error------', error)
  }
  const handlePlaybackCallback = (status) => {
    // console.log('status-------', status)
  }



  return (
    <View style={styles.container}>
      <Text style={styles.title}>修改页面123 </Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>点击</Text>
      </TouchableOpacity>
      {/* <Button
        title="点击"
        onPress={() => console.log('Button pressed')}
        style={styles.button}
        titleStyle={styles.buttonText}
      /> */}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      <VideoPlayer
        activityIndicator={{
          color: 'red',
          size: 'large',
        }}
        playbackCallback={handlePlaybackCallback}
        errorCallback={handleErrorCallback}
        style={{ height: 200 }}
        videoProps={{
          shouldPlay: true,
          resizeMode: ResizeMode.CONTAIN,
          source: {
            uri: 'https://vip.ffzyread.com/20240301/24303_f0da8c06/index.m3u8',
          },
          ref: videoRef,
        }}
        icon={{
          play: <Text style={{ color: '#FFF' }}>PLAY</Text>,
          pause: <Text style={{ color: '#FFF' }}>PAUSE</Text>,
        }}
        fullscreen={{
          inFullscreen: inFullscreen2,
          enterFullscreen: async () => {
            setStatusBarHidden(true, 'fade')
            setInFullsreen2(!inFullscreen2)
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT)
            videoRef.current.setStatusAsync({
              shouldPlay: true,
            })
          },
          exitFullscreen: async () => {
            setStatusBarHidden(false, 'fade')
            setInFullsreen2(!inFullscreen2)
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT)
          },
        }}
      />
      {/* <Video
        ref={setVideoRef}
        useNativeControls
        resizeMode="contain"
        onError={(error) => console.log('Video error', error)}
        style={{ width: '100%', height: 200 }}
        onReadyForDisplay={() => loadAsync()}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#FF00FF',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
