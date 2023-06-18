import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: 'AIzaSyAc8UUEfyTxf3w90Ya5n8sQmM0FQGGM4oM',
    authDomain: 'expense-tracker-a6733.firebaseapp.com',
    projectId: 'expense-tracker-a6733',
    storageBucket: 'expense-tracker-a6733.appspot.com',
    messagingSenderId: '927916669508',
    appId: '1:927916669508:web:1564e0a7de3e940d755a11',
    measurementId: 'G-P5SD69KLKZ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const analytics = getAnalytics(app);
