import i18n from 'react-native-i18n';

import en from '../constants/i18n/en';
import bg from '../constants/i18n/bg';

i18n.fallbacks = true;
i18n.defaultLocale = 'en';

i18n.translations = {
  en,
  bg,
};
