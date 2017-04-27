import _ from 'lodash';
import { CATEGORY_PROP, ITEM_PROP } from '../constants/TranslationProps';
import { translateOne } from './translator';

export const mapIdToItem = (items, itemId) => {
  return _.find(items, (item) => item.id === itemId);
};

export const mapIdToCategory = (categories, categoryId) => {
  return _.find(categories, (category) => category.id === categoryId);
};

export const mapReportForDownload = (categories, items, event) => {
  const category = mapIdToCategory(categories, event.categoryId);
  const item = mapIdToCategory(items, event.itemId);
  const translatedCategory = translateOne(category, CATEGORY_PROP);
  const translatedItem = translateOne(item, ITEM_PROP);

  return {
    date: event.date,
    value: event.value,
    category: translatedCategory.title,
    item: translatedItem.name,
  };
};

export const mapArrayOfIdsToCategories = (categories, ids) => {
  return _.map(ids, id => {
    return {
      ...id,
      ...mapIdToCategory(categories, id.categoryId)
    };
  });
};
