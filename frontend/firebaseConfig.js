import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence, createUserWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsiIYyW_MwGkuum_jldJk2NI6rG8zR6b4",
  authDomain: "chatvoy.firebaseapp.com",
  projectId: "chatvoy",
  storageBucket: "chatvoy.firebasestorage.app",
  messagingSenderId: "794834177890",
  appId: "1:794834177890:web:0fae1fb5869bea533ae63b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // Asegúrate de inicializar `app`

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
  
});


export { auth, getAuth, createUserWithEmailAndPassword };
