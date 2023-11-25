import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAIMud85WE-e_4x9kSxbRoKNuunktV-ce4',
  authDomain: 'exp-tra.firebaseapp.com',
  projectId: 'exp-tra',
  storageBucket: 'exp-tra.appspot.com',
  messagingSenderId: '923181715307',
  appId: '1:923181715307:web:5ee9c791426c4ebd70c62e',
  measurementId: 'G-2121D23PSJ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const analytics = getAnalytics(app);
