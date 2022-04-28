import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBCCjmedMFFEbjWUWRtWlDBwMFG4nJZfok",
    authDomain: "assignment-11-c705a.firebaseapp.com",
    projectId: "assignment-11-c705a",
    storageBucket: "assignment-11-c705a.appspot.com",
    messagingSenderId: "589339010535",
    appId: "1:589339010535:web:b8eef72e6eb90d151f8942",
    measurementId: "G-TVC60YM0TZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app)
export default auth