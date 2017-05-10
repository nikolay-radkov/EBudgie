import React from 'react';
import { Component } from 'react';
import {
  AsyncStorage,
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import AppIntro from 'react-native-app-intro';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import i18n from 'react-native-i18n';
import SplashScreen from 'react-native-splash-screen';

import { replaceRoute } from '../boundActionCreators/navigation';

const styleTypes = {
  topSection: {
    flex: 1,
    flexDirection: 'column-reverse',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bottomSection: {
    flex: 1
  },
  image: {
    resizeMode: 'cover',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  description: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  doneButton: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold'
  }
};

const styles = StyleSheet.create(styleTypes);

const customAppIntroStyleTypes = {
  paginationContainer: {
    backgroundColor: '#1560b1',

  },
  nextButtonText: {
    fontFamily: 'Lato',
    fontSize: 18,
    textAlign: 'right',
    paddingTop: 8
  },
  dotStyle: {
    width: 8,
    height: 8,
    margin: 5,
  },
  controllText: {
    fontFamily: 'Lato',
    fontSize: 18,
    paddingTop: 8
  },
  btnContainer: {
    paddingBottom: 0,
    height: 60,
  },
  full: {
    alignItems: null,
    height: 60,
  }
};

const pageArray = [{
  title: 'Hello',
  description: 'Nice to see you here',
  image: require('../images/budgie-icon.png'),
  levelImage: 10,
  levelTitle: 0,
  levelDescription: -4
}, {
  title: 'Amazing',
  description: 'See our app',
  image: require('../images/stripes.png'),
  levelImage: 10,
  levelTitle: 0,
  levelDescription: -4
}];

class IntroContainer extends Component {

  componentDidMount() {
    SplashScreen.hide();
  }

  goToLanding = async () => {
    // TODO:
    //await AsyncStorage.setItem('didIntro', 'true');
    this.props.replace({
      key: 'login'
    });
  }

  onSkipBtnHandle = async (index) => {
    await this.goToLanding();
  }
  doneBtnHandle = async () => {
    await this.goToLanding();
  }
  nextBtnHandle = (index) => {
    // Logger.log(index);
  }
  onSlideChangeHandle = (index, total) => {
    // Logger.log(index, total);
  }
  render() {
    const slides = pageArray.map((slide, index) => (
      <View
        style={[styles.slide, {
          backgroundColor: '#1a84ef',
        }]}>
        <View {...{ level: slide.levelImage }} style={styles.topSection}>
          <Image
            source={slide.image}
            style={styles.image} />
        </View>
        <View style={styles.bottomSection}>
          <View {...{ level: slide.levelTitle }}>
            <Text style={styles.title}>
              {slide.title}
            </Text>
          </View>
          <View {...{ level: slide.levelDescription }}>
            <Text style={styles.description}>
              {slide.description}
            </Text>
          </View>
        </View>
      </View>
    ));

    return (
      <AppIntro
        customStyles={customAppIntroStyleTypes}
        doneBtnLabel="BEGIN"
        nextBtnLabel="Next"
        onDoneBtnClick={this.doneBtnHandle}
        onNextBtnClick={this.nextBtnHandle}
        onSkipBtnClick={this.onSkipBtnHandle}
        onSlideChange={this.onSlideChangeHandle}
        skipBtnLabel="SKIP"
      >
        {slides}
      </AppIntro>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    replace: bindActionCreators(replaceRoute, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IntroContainer);
