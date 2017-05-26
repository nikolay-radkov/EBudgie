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
import Color from 'color';
import LinearGradient from 'react-native-linear-gradient';

import { replaceRoute } from '../boundActionCreators/navigation';
import colors from '../themes/Colors';

const styles = StyleSheet.create({
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
    alignSelf: 'flex-start',
  },
  slide: {
    flex: 1,
  },
  slideContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    color: colors.snow,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  description: {
    color: colors.snow,
    fontSize: 18,
    textAlign: 'center',
  },
});

const customAppIntroStyleTypes = {
  paginationContainer: {
    backgroundColor: colors.underlay,
  },
  nextButtonText: {
    fontSize: 18,
    textAlign: 'right',
    paddingTop: 8
  },
  dotStyle: {
    width: 10,
    height: 10,
    margin: 3,
  },
  controllText: {
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
  title: i18n.t('SLIDE_1_TITLE'),
  description: i18n.t('SLIDE_1_DESCRIPTION'),
  image: require('../images/budgie-icon.png'),
  levelImage: 10,
  levelTitle: 0,
  levelDescription: -4,
  start: Color(colors.main).lighten(1.2).toString(),
  end: Color(colors.main).lighten(1).toString(),
}, {
  title: i18n.t('SLIDE_2_TITLE'),
  description: i18n.t('SLIDE_2_DESCRIPTION'),
  image: require('../images/manage.png'),
  levelImage: 10,
  levelTitle: 0,
  levelDescription: -4,
  start: Color(colors.main).lighten(1).toString(),
  end: Color(colors.main).lighten(0.8).toString(),
}, {
  title: i18n.t('SLIDE_3_TITLE'),
  description: i18n.t('SLIDE_3_DESCRIPTION'),
  image: require('../images/limits.png'),
  levelImage: 10,
  levelTitle: 0,
  levelDescription: -4,
  start: Color(colors.main).lighten(0.8).toString(),
  end: Color(colors.main).lighten(0.6).toString(),
}, {
  title: i18n.t('SLIDE_4_TITLE'),
  description: i18n.t('SLIDE_4_DESCRIPTION'),
  image: require('../images/calendar.png'),
  levelImage: 10,
  levelTitle: 0,
  levelDescription: -4,
  start: Color(colors.main).lighten(0.6).toString(),
  end: Color(colors.main).lighten(0.4).toString(),
}, {
  title: i18n.t('SLIDE_5_TITLE'),
  description: i18n.t('SLIDE_5_DESCRIPTION'),
  image: require('../images/download.png'),
  levelImage: 10,
  levelTitle: 0,
  levelDescription: -4,
  start: Color(colors.main).lighten(0.4).toString(),
  end: Color(colors.main).lighten(0.2).toString(),
}, {
  title: i18n.t('SLIDE_6_TITLE'),
  description: i18n.t('SLIDE_6_DESCRIPTION'),
  image: require('../images/no-internet.png'),
  levelImage: 10,
  levelTitle: 0,
  levelDescription: -4,
  start: Color(colors.main).lighten(0.2).toString(),
  end: Color(colors.main).lighten(0).toString(),
}];

class IntroContainer extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  goToLanding = async () => {
    await AsyncStorage.setItem('didIntro', 'true');
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

  nextBtnHandle = (index) => { }

  onSlideChangeHandle = (index, total) => { }

  render() {
    const slides = pageArray.map((slide, index) => (

      <LinearGradient
        colors={[slide.start, slide.end]}
        end={{ x: 1.0, y: 0.0 }}

        key={index}
        start={{ x: 0.0, y: 0.0 }}
        style={[styles.slide, {

          backgroundColor: colors.red
        }]}
      >
        <View
          level={10}
          style={styles.slideContent}
        >
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
            <View {...{ level: slide.levelDescription }} style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}>
              <Text style={styles.description}>
                {slide.description}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    ));

    return (
      <AppIntro
        customStyles={customAppIntroStyleTypes}
        doneBtnLabel={i18n.t('BEGIN')}
        nextBtnLabel={i18n.t('NEXT')}
        onDoneBtnClick={this.doneBtnHandle}
        onNextBtnClick={this.nextBtnHandle}
        onSkipBtnClick={this.onSkipBtnHandle}
        onSlideChange={this.onSlideChangeHandle}
        skipBtnLabel={i18n.t('SKIP')}
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
