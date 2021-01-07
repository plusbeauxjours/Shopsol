# Shopsol

A React Native application for store management, powered by Express.js.

## To Run on Device

```
npm install
npx jetifier
npx react-native run-ios
npx react-native run-android
```

## Run Emulator (ios)

```
cd ios
pod install
cd ..
npx react-native run-ios
```

or open

(`[...]/node_modules/iamport-react-native/example/ios/example.xcodeproj`)

## Reset Cache

```
yarn start -- --reset-cache
```

## Build Android

to generate a .aab

```
cd android
./gradlew bundleRelease
```

to generate a .apk

```
cd android
./gradlew assembleRelease
```

to delete the files created during the previous build tasks

```
cd android
./gradlew clean
```

to test release build

```
npx jetifier
cd android
npx react-native run-android --variant=release
```

## To Run with Android Studio

open

(`[...]/node_modules/iamport-react-native/example/android`)
