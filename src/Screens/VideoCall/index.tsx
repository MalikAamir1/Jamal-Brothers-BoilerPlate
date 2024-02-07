import React, {useEffect, useState} from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import {Text} from 'react-native-paper';
import {PermissionsAndroid, Platform, Pressable, View} from 'react-native';

const App = () => {
  const [videoCall, setVideoCall] = useState(false);
  const connectionData = {
    appId: '52106f5b442a4cbb8e7c507b661e33f9',
    channel: 'Video calling',
    token:
      '007eJxTYMj7z/7ceuEthX1BP+6r1E017K37Uy/YudnHw3j3itVll1IUGEyNDA3M0kyTTEyMEk2Sk5IsUs2TTQ3Mk8zMDFONjdMsiwwPpzYEMjJwzCxnYWSAQBCflyEsMyU1XyE5MScnMy+dgQEAzZAjLw==',
  };

  async function requestCameraAndAudioPermission() {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
      if (
        granted['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.CAMERA'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('You can use the cameras & mic');
      } else {
        console.log('Permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(() => {
    requestCameraAndAudioPermission();
  }, []);

  const rtcCallbacks = {
    EndCall: () => setVideoCall(false),
  };
  return videoCall ? (
    <AgoraUIKit connectionData={connectionData} rtcCallbacks={rtcCallbacks} />
  ) : (
    <View
      style={{
        backgroundColor: 'pink',
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Pressable onPress={() => setVideoCall(true)}>
        <Text style={{backgroundColor: 'red', padding: 10, borderRadius: 50}}>
          Start Call
        </Text>
      </Pressable>
    </View>
  );
};

export default App;

// import React, {useRef, useState, useEffect} from 'react';
// import {
//   Pressable,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import {PermissionsAndroid, Platform} from 'react-native';
// import {
//   ClientRoleType,
//   createAgoraRtcEngine,
//   IRtcEngine,
//   RtcSurfaceView,
//   ChannelProfileType,
// } from 'react-native-agora';

// const appId = '52106f5b442a4cbb8e7c507b661e33f9';
// const channelName = 'Video calling';
// const token =
//   '007eJxTYMj7z/7ceuEthX1BP+6r1E017K37Uy/YudnHw3j3itVll1IUGEyNDA3M0kyTTEyMEk2Sk5IsUs2TTQ3Mk8zMDFONjdMsiwwPpzYEMjJwzCxnYWSAQBCflyEsMyU1XyE5MScnMy+dgQEAzZAjLw==';
// const uid = 0;

// const VideoCall = () => {
//   const agoraEngineRef = useRef<IRtcEngine>(); // Agora engine instance
//   const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
//   const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
//   const [message, setMessage] = useState(''); // Message to the user
//   const [muteAudio, setMuteAudio] = useState(false);
//   const [cameraOn, setCameraOn] = useState(true);

//   const getPermission = async () => {
//     if (Platform.OS === 'android') {
//       await PermissionsAndroid.requestMultiple([
//         PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//       ]);
//     }
//   };

//   function showMessage(msg: string) {
//     setMessage(msg);
//   }

//   const setupVideoSDKEngine = async () => {
//     try {
//       // use the helper function to get permissions
//       if (Platform.OS === 'android') {
//         await getPermission();
//       }
//       agoraEngineRef.current = createAgoraRtcEngine();
//       const agoraEngine = agoraEngineRef.current;
//       agoraEngine.registerEventHandler({
//         onJoinChannelSuccess: () => {
//           showMessage('Successfully joined the channel ' + channelName);
//           setIsJoined(true);
//         },
//         onUserJoined: (_connection, Uid) => {
//           showMessage('Remote user joined with uid ' + Uid);
//           setRemoteUid(Uid);
//         },
//         onUserOffline: (_connection, Uid) => {
//           showMessage('Remote user left the channel. uid: ' + Uid);
//           setRemoteUid(0);
//         },
//       });
//       agoraEngine.initialize({
//         appId: appId,
//         channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
//       });
//       agoraEngine.enableVideo();
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   useEffect(() => {
//     // Initialize Agora engine when the app starts
//     setupVideoSDKEngine();
//   });

//   const join = async () => {
//     if (isJoined) {
//       return;
//     }
//     try {
//       agoraEngineRef.current?.setChannelProfile(
//         ChannelProfileType.ChannelProfileCommunication,
//       );
//       agoraEngineRef.current?.startPreview();
//       agoraEngineRef.current?.joinChannel(token, channelName, uid, {
//         clientRoleType: ClientRoleType.ClientRoleBroadcaster,
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const leave = () => {
//     try {
//       agoraEngineRef.current?.leaveChannel();
//       setRemoteUid(0);
//       setIsJoined(false);
//       showMessage('You left the channel');
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const toggleMuteAudio = () => {
//     setMuteAudio(!muteAudio);
//     agoraEngineRef.current?.muteLocalAudioStream(false);
//   };

//   const toggleCamera = () => {
//     setCameraOn(!cameraOn);
//     agoraEngineRef.current?.switchCamera();
//   };

//   return (
//     <SafeAreaView style={styles.main}>
//       <View style={styles.btnContainer}>
//         <Pressable onPress={join}>
//           <Text style={styles.button}>Join</Text>
//         </Pressable>
//         <Pressable onPress={leave}>
//           <Text style={styles.button}>Leave</Text>
//         </Pressable>
//         <Pressable onPress={toggleMuteAudio}>
//           <Text style={styles.button}>{muteAudio ? 'Unmute' : 'Mute'}</Text>
//         </Pressable>
//         <Pressable onPress={toggleCamera}>
//           <Text style={styles.button}>
//             {cameraOn ? 'Camera Back' : 'Camera Front'}
//           </Text>
//         </Pressable>
//       </View>
//       <ScrollView
//         style={styles.scroll}
//         contentContainerStyle={styles.scrollContainer}>
//         {isJoined ? (
//           <React.Fragment key={0}>
//             <RtcSurfaceView canvas={{uid: 0}} style={styles.videoView} />
//             <Text>Local user uid: {uid}</Text>
//           </React.Fragment>
//         ) : (
//           <Text>Join a channel</Text>
//         )}
//         {isJoined && remoteUid !== 0 ? (
//           <React.Fragment key={remoteUid}>
//             <RtcSurfaceView
//               canvas={{uid: remoteUid}}
//               style={styles.videoView}
//             />
//             <Text>Remote user uid: {remoteUid}</Text>
//           </React.Fragment>
//         ) : (
//           <Text>Waiting for a remote user to join</Text>
//         )}
//         <Text style={styles.info}>{message}</Text>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   button: {
//     paddingHorizontal: 25,
//     paddingVertical: 4,
//     fontWeight: 'bold',
//     color: '#ffffff',
//     backgroundColor: '#0055cc',
//     margin: 5,
//   },
//   main: {flex: 1, alignItems: 'center'},
//   scroll: {flex: 1, backgroundColor: '#ddeeff', width: '100%'},
//   scrollContainer: {alignItems: 'center'},
//   videoView: {width: '90%', height: 200},
//   btnContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     flexWrap: 'wrap',
//   },
//   head: {fontSize: 20},
//   info: {backgroundColor: '#ffffe0', color: '#0000ff'},
// });

// export default VideoCall;
