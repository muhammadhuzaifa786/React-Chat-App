import * as firebase from 'firebase/app';
import 'firebase/database'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyBxKltJnz1miU0WIMwgDWby7xzpIrcX2Ts",
    authDomain: "reactchatapps.firebaseapp.com",
    databaseURL: "https://reactchatapps.firebaseio.com",
    projectId: "reactchatapps",
    storageBucket: "reactchatapps.appspot.com",
    messagingSenderId: "1032227066298",
    appId: "1:1032227066298:web:2a47d5d080f4a86aca8d83",
    measurementId: "G-18501VKP24"
};

export default firebase.initializeApp(firebaseConfig)
