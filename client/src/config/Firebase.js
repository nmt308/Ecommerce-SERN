import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyCDQg4E_OBJRctkfPD2sldeU7r1GBQ6H5c',
    authDomain: 'ecommerce-mern-stack-4be2a.firebaseapp.com',
    projectId: 'ecommerce-mern-stack-4be2a',
    storageBucket: 'ecommerce-mern-stack-4be2a.appspot.com',
    messagingSenderId: '21621141296',
    appId: '1:21621141296:web:68ca2c6734de8d685f62f5',
    measurementId: 'G-G70XPF58LL',
};
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage };
