import { Capacitor } from '@capacitor/core';

// Check if running in Capacitor (native mobile environment)
export const isNative = Capacitor.isNativePlatform();

// Helper function to get base URL for API calls
export function getApiBaseUrl() {
  if (isNative) {
    // In production Android app, point to a hosted server
    // You would replace this with your actual hosted API URL
    // For now, we'll use a temporary test URL for demonstration
    // return 'https://your-hosted-api.com';
    return 'http://10.0.2.2:5000'; // Android emulator address for localhost
  }
  
  // In web browser, use relative URL
  return '';
}