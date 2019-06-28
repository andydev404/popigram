import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default ({ media, downloadFile, mediaType }) => (
  <View style={{ marginVertical: 10, marginHorizontal: 7 }}>
    <Image style={styles.userThumbnail} source={{ uri: media }} />
    <TouchableOpacity onPress={() => downloadFile(media, mediaType)}>
      <LinearGradient
        colors={['#e40032', '#bf00a3']}
        style={styles.gradient}
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
      >
        <Text style={{ color: 'white' }}>Download</Text>
      </LinearGradient>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  userThumbnail: {
    width: 160,
    height: 160,
    borderRadius: 2
  },
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginTop: 10,
    borderRadius: 2
  }
});
