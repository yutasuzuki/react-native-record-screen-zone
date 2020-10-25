import { Dimensions, LayoutRectangle, Platform, StatusBar } from 'react-native';

export const createRandumFileName = (min: number = 100, max: number = 999) => {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

export const extractExtension = (file: string) => {
  const parseFileName = file.split('.');
  return parseFileName[parseFileName.length - 1];
};

export const createNewFilePath = (path: string) => {
  const parsePath = path.split('/');
  const fileName = parsePath[parsePath.length - 1];
  parsePath[
    parsePath.length - 1
  ] = `${createRandumFileName()}.${extractExtension(fileName)}`;
  return parsePath.join('/');
};

export const calcLayout = (layout: LayoutRectangle) => {
  let { width, height, x, y } = layout;
  const scale = Dimensions.get('window').scale;
  if (Platform.OS === 'android') {
    width = Math.ceil(layout.width * scale);
    height = Math.ceil(layout.height * scale);
    x = Math.ceil(layout.x * scale);
    const statusbarHeight = StatusBar.currentHeight
      ? StatusBar.currentHeight
      : 0;
    y = Math.ceil((layout.y + statusbarHeight) * scale);
  }
  return { width, height, x, y };
};
