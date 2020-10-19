import { NativeModules } from 'react-native';

type RecordScreenZoneType = {
  multiply(a: number, b: number): Promise<number>;
};

const { RecordScreenZone } = NativeModules;

export default RecordScreenZone as RecordScreenZoneType;
