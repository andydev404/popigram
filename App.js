import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  CameraRoll,
  StatusBar,
  Platform
} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import uuid from 'uuid/v4';
import { AdMobBanner, AdMobInterstitial } from 'expo-ads-admob';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import Header from './src/components/Header';
import VideoTemplate from './src/components/VideoTemplate';
import ImageTemplate from './src/components/ImageTemplate';

const admobBanner =
  Platform.OS === 'ios'
    ? 'ca-app-pub-6434583569058734/6688146442'
    : 'ca-app-pub-6434583569058734/9889024853';
const admobnterstitial =
  Platform.OS === 'ios'
    ? 'ca-app-pub-6434583569058734/2748901433'
    : 'ca-app-pub-6434583569058734/5758208157';

class App extends React.Component {
  state = {
    media: {},
    downloadProgress: 0,
    count: 0
  };

  async componentDidMount() {
    AdMobInterstitial.setAdUnitID(admobnterstitial); // Replace with your-admob-unit-id
  }

  getInstagramInfo = instagramUrl => {
    this.setState(
      {
        count: this.state.count + 1
      },
      async () => {
        if (this.state.count % 5 === 0) {
          await AdMobInterstitial.requestAdAsync();
          await AdMobInterstitial.showAdAsync();
        }
      }
    );
    let urlRequest = instagramUrl.split('/?')[0] + '?__a=1';
    if (!urlRequest.includes('https://www.instagram.com/p')) {
      showMessage({
        message: 'Error. Invalid url',
        type: 'danger'
      });
      return;
    }

    fetch(urlRequest)
      .then(res => res.json())
      .then(data => {
        let infoResource = {};
        if (data.graphql.shortcode_media.__typename === 'GraphSidecar') {
          let images = data.graphql.shortcode_media.edge_sidecar_to_children.edges.map(
            item => item.node.display_url
          );
          infoResource.type = 'GraphSidecar';
          infoResource.data = images;
        } else if (data.graphql.shortcode_media.__typename === 'GraphImage') {
          let imageUrl = data.graphql.shortcode_media.display_url;
          infoResource.type = 'GraphImage';
          infoResource.data = [imageUrl];
        } else {
          let videoUrl = data.graphql.shortcode_media.video_url;
          infoResource.type = 'GraphVideo';
          infoResource.data = [videoUrl];
        }
        this.setState({
          media: infoResource
        });
      })
      .catch(err => {
        showMessage({
          message: 'Error. Please try again',
          type: 'danger'
        });
      });
  };

  downloadFile = async (url, mediaType) => {
    let cameraPermissions = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (cameraPermissions.status !== 'granted') {
      cameraPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }

    if (cameraPermissions.status === 'granted') {
      FileSystem.downloadAsync(
        url,
        FileSystem.documentDirectory +
          uuid() +
          (mediaType === 'GraphVideo' ? '.mp4' : '.jpg')
      )
        .then(async ({ uri }) => {
          await CameraRoll.saveToCameraRoll(uri);
          showMessage({
            message: 'File successfully downloaded',
            type: 'success'
          });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      alert('Requires file permission');
    }
  };

  render() {
    const { media } = this.state;
    return (
      <View style={styles.container}>
        <Header getInstagramInfo={this.getInstagramInfo} />
        <StatusBar barStyle='light-content' />
        <AdMobBanner bannerSize='fullBanner' adUnitID={admobBanner} />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.dataContent}>
            {Object.values(media).length ? (
              media.data.map((data, i) => {
                if (media.type === 'GraphVideo') {
                  return (
                    <VideoTemplate
                      key={i}
                      media={data}
                      mediaType={media.type}
                      downloadFile={this.downloadFile}
                    />
                  );
                } else {
                  return (
                    <ImageTemplate
                      key={i}
                      media={data}
                      mediaType={media.type}
                      downloadFile={this.downloadFile}
                    />
                  );
                }
              })
            ) : (
              <Image
                style={styles.imageNotData}
                source={require('./assets/attach.png')}
              />
            )}
          </View>
        </ScrollView>
        <FlashMessage position='top' floating icon='auto' />
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9'
  },
  dataContent: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 30
  },
  imageNotData: {
    width: 80,
    height: 80,
    marginTop: 40
  }
});
