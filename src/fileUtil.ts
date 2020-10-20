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
