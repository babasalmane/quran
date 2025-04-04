# Building Quran Reader as an Android App

This guide will help you convert the Quran Reader web application into an Android app using Capacitor.

## Prerequisites

1. A computer with Node.js and npm installed
2. Android Studio installed
3. Basic knowledge of using the command line

## Step 1: Export the project

First, download your project from Replit. Click on the three dots menu in the top right of the Replit interface and select "Download as zip".

## Step 2: Extract and prepare the project

1. Extract the downloaded zip file to a folder on your computer
2. Open a terminal/command prompt and navigate to that folder
3. Install the required dependencies:

```bash
npm install
npm install @capacitor/core @capacitor/android @capacitor/cli
```

## Step 3: Configure Capacitor

Create a file named `capacitor.config.ts` at the root of your project with the following content:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.quranreader.app',
  appName: 'Quran Reader',
  webDir: 'client/dist',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https'
  },
  plugins: {
    CapacitorHttp: {
      enabled: true
    }
  }
};

export default config;
```

## Step 4: Build the web app

Build the web application:

```bash
npm run build
```

## Step 5: Initialize Capacitor and add Android platform

```bash
npx cap init "Quran Reader" com.quranreader.app --web-dir client/dist
npx cap add android
```

## Step 6: Modify the API endpoint

Create a file at `client/src/capacitor.ts` with the following content:

```typescript
import { Capacitor } from '@capacitor/core';

// Check if running in Capacitor (native mobile environment)
export const isNative = Capacitor.isNativePlatform();

// Helper function to get base URL for API calls
export function getApiBaseUrl() {
  if (isNative) {
    // Replace this with your actual hosted API URL
    return 'https://your-hosted-api.com';
    // For local testing on an emulator, you can use:
    // return 'http://10.0.2.2:5000';
  }
  
  // In web browser, use relative URL
  return '';
}
```

Important: You'll need to deploy your server somewhere publicly accessible and update the URL in the code above.

## Step 7: Update the API client

Make sure your `client/src/lib/queryClient.ts` file is updated to use the Capacitor-aware API URLs:

```typescript
import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { getApiBaseUrl, isNative } from "../capacitor";

// ... rest of the file should be updated as shown in the project
```

## Step 8: Sync changes with Android project

```bash
npx cap sync
```

## Step 9: Open in Android Studio

```bash
npx cap open android
```

## Step 10: Build the APK

In Android Studio:
1. Wait for the project to fully load and index
2. Go to Build > Build Bundle(s) / APK(s) > Build APK(s)
3. Follow the prompts to build the APK
4. The APK will be built and you'll see a notification in Android Studio with a link to locate it

## Step 11: Install on your Android device

1. Transfer the APK file to your Android device (via email, USB, etc.)
2. On your Android device, navigate to the APK file and tap to install
3. You may need to enable installation from unknown sources in your security settings

## Troubleshooting

- If you get errors about missing dependencies, make sure you've run `npm install` and `npx cap sync`
- If the app doesn't connect to the server, make sure you've updated the API URL in `capacitor.ts`
- For Android Studio issues, make sure you have the latest version installed

## Sharing with Others

Once you have a working APK, you can share it with others directly. For wider distribution, consider publishing to Google Play Store.