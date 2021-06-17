import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {colors, fonts, IconPlus} from '../../assets';

const AddPicture = ({text, image, openLibrary}) => {
  const [data, setData] = useState({});

  const [pertama, setPertama] = useState({});
  // const [image, setImage] = useState({});
  // const openLibrary = () => {
  //   const options = {
  //     includeBase64: true,
  //   };

  //   launchImageLibrary(options, response => {
  //     console.log('response: ', response);
  //     setImage(response);
  //     // console.log('setData: ', data.assets);
  //   });
  // };
  // console.log('image di add Picture: ', image.assets);
  setPertama(image.assets);
  // console.log('Pertama: ', pertama);
  if (image.assets) {
    // setPertama(image.assets);
    return (
      <View>
        <TouchableOpacity
          style={styles.addPicture}
          // onPress={() => openLibrary()}>
          onPress={openLibrary}>
          <Image source={image.assets} style={{width: 100, height: 100}} />
          {/* <IconPlus style={styles.iconPlus} />
          <Text style={styles.addPictureText}>{text}</Text> */}
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View>
        <TouchableOpacity
          style={styles.addPicture}
          // onPress={() => openLibrary()}>
          onPress={openLibrary}>
          {/* <Image source={data.assets} style={{width: 100, height: 100}} /> */}
          <IconPlus style={styles.iconPlus} />
          <Text style={styles.addPictureText}>{text}</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

export default AddPicture;

const styles = StyleSheet.create({
  addPicture: {
    height: 100,
    width: 100,
    backgroundColor: colors.lightGrey,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  addPictureText: {
    fontFamily: fonts.Poppins.regular,
    fontSize: 12,
    color: colors.white,
    position: 'absolute',
    bottom: 13,
  },
});
