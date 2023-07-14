import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { firebase } from '../../config/firebase';

const UploadProfileCheck = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      allowsEditing: true,
      aspectRatio: [1, 1],
      quality: 1,
    };

    launchImageLibrary(options, async (response) => {
      if (!response.didCancel) {
        const source = { uri: response.uri };
        setImage(source);

        try {
          const blob = await fetch(response.uri).then((res) => res.blob());

          const filename = response.uri.substring(response.uri.lastIndexOf('/') + 1);
          const uploadTask = firebase.storage().ref().child(filename).put(blob);

          uploadTask.on(
            'state_changed',
            (snapshot) => {
              // Handle progress updates if needed
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
            },
            (error) => {
              // Handle unsuccessful upload
              console.error(error);
            },
            () => {
              // Handle successful upload
              uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
              });
            }
          );
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        imageStyle={{ borderRadius: 30 }}
        style={styles.backgroundImage}
        source={require('../../assets/images/register.png')}
      >
        {image ? (
          <Image style={styles.image} source={image} />
        ) : (
          <Image style={styles.image} source={require('../../assets/images/profile.png')} />
        )}

        <View style={styles.textContainer}>
          <Text style={styles.title}>Choose a profile picture</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.button}>
            <Text style={styles.buttonText}>Take a Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={pickImage} style={styles.button}>
            <Text style={styles.buttonText}>Choose from Library</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleCancel} style={styles.button}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        {loading && <ActivityIndicator size="large" color="red" />}

        <View style={styles.socialMediaContainer}>
          <Image
            style={styles.socialMediaIcon}
            source={require('../../assets/images/google-logo.png')}
          />
          <Image
            style={styles.socialMediaIcon}
            source={require('../../assets/images/fb-logo.png')}
          />
          <Image
            style={styles.socialMediaIcon}
            source={require('../../assets/images/apple-logo.png')}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default UploadProfileCheck;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1110',
    borderRadius: 30,
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    zIndex: -1,
  },
  image: {
    alignSelf: 'center',
    marginTop: 100,
    width: 200,
    height: 200,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  title: {
    color: '#FF3974',
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 25,
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  button: {
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FF3974',
    borderRadius: 30,
  },
  buttonText: {
    color: '#FFF',
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
  },
  socialMediaContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  socialMediaIcon: {
    width: 45,
    height: 45,
    marginHorizontal: 10,
  },
});
