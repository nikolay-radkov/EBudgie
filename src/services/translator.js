import i18n from 'react-native-i18n';
import _ from 'lodash';

export const translateOne = (element, key) => {
  const newEl = {
    ...element
  };
  newEl[key] = element.hasTranslation ? i18n.t(element[key]) : element[key];
  return newEl;
};

export const translateMany = (elements, key) => {
  return _.map(elements, (e) => translateOne(e, key));
};
