#!/bin/bash

# Build the web app
echo "Building the web application..."
npm run build

# Initialize Capacitor if android folder doesn't exist
if [ ! -d "android" ]; then
  echo "Initializing Capacitor project..."
  npx cap init "Quran Reader" com.quranreader.app --web-dir client/dist

  echo "Adding Android platform..."
  npx cap add android
else
  echo "Android platform already exists, syncing changes..."
fi

# Sync changes to Android project
echo "Syncing Capacitor project..."
npx cap sync

echo "Done! Android project is ready."
echo ""
echo "To build the APK, you need to open the Android project in Android Studio:"
echo "npx cap open android"
echo ""
echo "Then in Android Studio, select Build > Build Bundle(s) / APK(s) > Build APK(s)"
