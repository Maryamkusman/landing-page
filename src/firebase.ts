import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDhKgctCpABB9OKbLaSWLvz460FpaXkfG8",
  authDomain: "wdz-landingpage.firebaseapp.com",
  projectId: "wdz-landingpage",
  storageBucket: "wdz-landingpage.firebasestorage.app",
  messagingSenderId: "477988348745",
  appId: "1:477988348745:web:b15f8cc5ecf4d51e6f7098",
  measurementId: "G-BJR1BLBHC6",
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
