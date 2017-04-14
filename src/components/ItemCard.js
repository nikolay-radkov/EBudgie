import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
} from 'react-native';
import { Icon } from 'react-native-elements';

import colors from '../themes/Colors';
import metrics from '../themes/Metrics';

const styles = StyleSheet.create({
  items: {
    flexDirection: 'column',
    backgroundColor: colors.silver,
    borderWidth: metrics.borderWidth,
    borderColor: colors.snow,
    margin: 2,
    elevation: 1,
    borderRadius: metrics.buttonRadius,
  },
  category: {
    flexDirection: 'row',
    backgroundColor: colors.snow,
  },
  itemsContainer: {
    flexDirection: 'row',
    padding: 2,
  },
  full: {
    flex: 1,
    justifyContent: 'center',
  },
  itemContainer: {
    borderRadius: metrics.buttonRadius,
    padding: 10,
    borderWidth: metrics.borderWidth,
    margin: 2,
    borderColor: colors.snow,
  },
  item: {
    fontSize: 14,
    textAlign: 'center',
    color: colors.snow
  },
  column: {
    flex: 1,
  },
});

const ItemCard = ({
  color,
  icon,
  size,
  title,
  oddItems,
  evenItems,
  onPress,
}) => {
  const mappedEvenItems = evenItems.map((i, index) => {
    return (
      <TouchableHighlight
        key={index}
        onPress={() => onPress(i.id)}
        style={[styles.itemContainer, {
          backgroundColor: color
        }]}
      >
        <Text style={styles.item}>{i.name}</Text>
      </TouchableHighlight>
    );
  });

  const mappedOddItems = oddItems.map((i, index) => {
    return (
      <TouchableHighlight
        key={index}
        onPress={() => onPress(i.id)}
        style={[styles.itemContainer, {
          backgroundColor: color
        }]}
      >
        <Text style={styles.item}>{i.name}</Text>
      </TouchableHighlight>
    );
  });

  return (

    <View style={styles.items}>
      <View style={styles.category}>
        <Icon
          color={color}
          name={icon}
          reverse
          size={size}
        />
        <View style={styles.full}>
          <Text>{title}</Text>
        </View>
      </View>
      <View style={styles.itemsContainer}>
        <View style={styles.column}>{mappedEvenItems}</View>
        <View style={styles.column}>{mappedOddItems}</View>
      </View>
    </View>
  );
}

ItemCard.propTypes = {
  onPress: React.PropTypes.func,
  color: React.PropTypes.string,
  icon: React.PropTypes.string,
  size: React.PropTypes.number,
  title: React.PropTypes.string,
  oddItems: React.PropTypes.array,
  evenItems: React.PropTypes.array,
};

export default ItemCard;
