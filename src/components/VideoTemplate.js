import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Video } from 'expo-av';

export default ({ media, downloadFile, mediaType }) => (
  <View style={{ marginVertical: 10, marginHorizontal: 7 }}>
    <Video
      source={{
        uri: media
      }}
      rate={1.0}
      volume={1.0}
      resizeMode={Video.RESIZE_MODE_CONTAIN}
      useNativeControls
      style={{ width: 200, height: 200 }}
    />
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
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginTop: 10,
    borderRadius: 2
  }
});
