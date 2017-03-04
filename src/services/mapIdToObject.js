import _ from 'lodash';

export const mapIdToItem = (items, itemId) => {
  return _.find(items, (item) => item.id === itemId);
};

export const mapIdToCategory = (categories, categoryId) => {
  return _.find(categories, (category) => category.id === categoryId);
};

export const mapReportForDownload = (categories, items, event) => {
  const category = mapIdToCategory(categories, event.categoryId);
  const item = mapIdToCategory(items, event.itemId);

  return {
    date: event.date,
    value: event.value,
    category: category.title,
    item: item.name,
  };
};

