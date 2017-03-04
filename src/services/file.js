import { Alert } from 'react-native';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';

export const saveFile = async (data, filename) => {
  try {
    const path = `${RNFS.DocumentDirectoryPath}/${filename}.csv`;

    await RNFS.writeFile(path, data, 'utf8')
    await readFile(filename);
  } catch (e) {
    handleDownloadError();
  }
};

function handleDownloadError() {
  Alert.alert(
    'Error',
    'Could not download the file',
    [
      { text: 'OK', onPress: () => { } },
    ],
    { cancelable: true }
  );
}

export const readFile = async (filename, encoding = 'utf8') => {
  try {
    const path = `${RNFS.DocumentDirectoryPath}/${filename}.csv`;
    const data = await RNFS.readFile(path, 'base64')

    await Share.open({
      message: 'Hello, here is the report you\'ve asked for',
      url: `data:text/csv;base64,${data}`,
      subject: `${filename}.csv`,
    });
  } catch (e) {
    handleDownloadError();
  }
};


