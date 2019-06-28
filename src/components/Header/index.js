import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';

const Header = ({ getInstagramInfo }) => {
  const [url, setUrl] = useState('');
  return (
    <LinearGradient
      colors={['#e40032', '#bf00a3']}
      style={styles.grandientContainer}
      start={{ x: 0.0, y: 0.25 }}
      end={{ x: 0.5, y: 1.0 }}
    >
      <Text style={styles.title}>Popigram</Text>
      <Text style={styles.subTitle}>Instagram photo & video downloader</Text>
      <TextInput
        style={styles.input}
        placeholder='Paste instagram url here'
        value={url}
        onChangeText={text => setUrl(text)}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          getInstagramInfo(url);
          setUrl('');
          Keyboard.dismiss();
        }}
      >
        <Text style={styles.btnText}>Process</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default Header;

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    padding: 10,
    width: '90%',
    marginTop: 20,
    borderRadius: 2
  },
  btn: {
    backgroundColor: '#1274ed',
    padding: 10,
    marginTop: 10,
    width: 120,
    alignItems: 'center',
    borderRadius: 2
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
  },
  subTitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    marginTop: 5
  },
  grandientContainer: {
    alignItems: 'center',
    height: 260,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight
  },
  btnText: {
    color: 'white'
  }
});
