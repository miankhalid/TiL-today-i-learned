import Reactotron from 'reactotron-react-native';
import mmkvPlugin from 'reactotron-react-native-mmkv';

import { storage } from '@/services/mmkv';

import config from '../app.json';

Reactotron.configure({
  name: config.name,
})
  .useReactNative()
  .use(mmkvPlugin({ storage }))
  .connect();
