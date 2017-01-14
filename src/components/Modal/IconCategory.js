import React, { Component, PropTypes } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, StyleSheet } from 'react-native';

import {
  groupBy,
  orderBy
} from 'lodash/collection';

import materialIcons from '../../constants/MaterialIcons';

const iconsByCategory = groupBy(orderBy(materialIcons, 'name'), 'category');

class IconCategory extends Component {
  componentDidMount() {
    this.props.finishedLoading();
  }

  render() {
    let emojis = iconsByCategory[this.props.category];
    let size = 30;
    let style = {
      fontSize: size - 4,
      color: 'black',
      height: size + 4,
      width: size + 4,
      textAlign: 'center',
      padding: 5,
    };

    return (
      <View style={style.categoryOuter}>
        <Text style={[styles.headerText, this.props.headerStyle]}>{this.props.category}</Text>
        <View style={styles.categoryInner}>
          {emojis.map(i =>
            <Icon
              key={i.name}
              name={i.name}
              onPress={() => this.props.changeIcon(i.name)}
              size={25}
              style={[style, { backgroundColor: this.props.selected === i.name ? 'red' : null }]} />
          )}
        </View>
      </View>
    );
  }
}

IconCategory.propTypes = {
  finishedLoading: PropTypes.func.isRequired,
  changeIcon: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  headerStyle: PropTypes.object,
  selected: PropTypes.string,
};

const styles = StyleSheet.create({
  categoryInner: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  headerText: {
    padding: 5,
    color: 'black',
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
});

export default IconCategory;
