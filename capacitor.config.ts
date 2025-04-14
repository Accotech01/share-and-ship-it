
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.bf3e0bea987241ea80aaa6bb07804c0a',
  appName: 'share-and-ship-it',
  webDir: 'dist',
  server: {
    url: 'https://bf3e0bea-9872-41ea-80aa-a6bb07804c0a.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      androidxCore: '1.5.0',
      androidxAppcompat: '1.6.1',
      androidxWebkit: '1.4.0'
    }
  }
};

export default config;

