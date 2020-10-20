import React, { useState, useCallback } from 'react';
import {
  View,
  LayoutChangeEvent,
  ViewProps,
  LayoutRectangle,
} from 'react-native';
import { RNFFmpeg } from 'react-native-ffmpeg';
import RecordScreen, {
  RecordingStartResponse,
  RecordingResponse,
} from 'react-native-record-screen';
import { createNewFilePath } from './fileUtil';

interface Props extends ViewProps {}

type StartRecording = () => Promise<RecordingStartResponse>;
type StopRecording = () => Promise<RecordingResponse>;
type CleanRecord = () => void;

const useComponentLayout = () => {
  const [layout, setLayout] = useState<LayoutRectangle>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const size = event.nativeEvent.layout;
    setLayout((l) => Object.assign(l, size));
  }, []);

  return { layout, onLayout };
};

export const useRecordScreenZone = () => {
  const { layout, onLayout } = useComponentLayout();

  const startRecording: StartRecording = () => {
    return new Promise(async (resolve, reject) => {
      const res = await RecordScreen.startRecording({ mic: false }).catch(
        reject
      );
      if (res) {
        resolve(res);
      }
    });
  };

  const stopRecording: StopRecording = () => {
    return new Promise(async (resolve, reject) => {
      const res = await RecordScreen.stopRecording().catch(reject);
      if (res) {
        console.log('layout', layout);
        console.log('layout.height', layout.height);
        const newPath = createNewFilePath(res.result.outputURL);
        RNFFmpeg.execute(
          `-i ${res.result.outputURL} -vf crop=w=${Math.ceil(
            layout.width
          )}:h=${Math.ceil(layout.height)}:x=${Math.ceil(
            layout.x
          )}:y=${Math.ceil(layout.y)} ${newPath}`
        )
          .then(() => {
            res.result.outputURL = newPath;
            resolve(res);
          })
          .catch(reject);
      }
    });
  };

  const cleanRecord: CleanRecord = () => {
    RecordScreen.clean();
  };

  const Wrapper: React.FC<Props> = (props) => {
    return (
      <View {...props} onLayout={onLayout}>
        {props.children}
      </View>
    );
  };

  return {
    startRecording,
    stopRecording,
    cleanRecord,
    RecordScreenZone: Wrapper,
  };
};
