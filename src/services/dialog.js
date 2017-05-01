import DialogAndroid from 'react-native-dialogs';
import i18n from 'react-native-i18n';

export const showDeleteDialog = ({
  content,
  onNegative = () => { },
  onPositive = () => { },
}) => {
  const options = {
    title: i18n.t('DELETE_DIALOG_TITLE'),
    content: i18n.t('DELETE_DIALOG_CONTENT'),
    positiveText: i18n.t('YES'),
    negativeText: i18n.t('NO'),
    onNegative,
    onPositive,
  };

  const dialog = new DialogAndroid();
  dialog.set(options);
  dialog.show();
};
