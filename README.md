# react-native-record-screen-zone

react-native-record-screen-zone

## Installation

```sh
npm install react-native-record-screen-zone react-native-record-screen react-native-ffmpeg
```

## Usage

```js
import { useRecordScreenZone } from 'react-native-record-screen-zone';

export const App = () => {
  const { startRecording, stopRecording, RecordScreenZone } = useRecordScreenZone();

  const _handleOnStartRecording = () => {
    startRecording()
  }

  const _handleOnStopRecording = async () => {
    const res = await stopRecording()
    if (res) {
      console.log(res)
    }
  }

  return (
    <>
      <Navbar />
      <View>
        <View>
          <Text>Not recording area<Text>
        </View>
        <RecordScreenZone>
          <View>
            <Text>Recording area<Text>
          </View>
        </RecordScreenZone>
      </View>
      <Footer />
    </>
  )
}
```

## License

MIT
