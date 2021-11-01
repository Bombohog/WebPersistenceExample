// Firebase ------------------------------------------------------------
// Import the functions you need from the SDKs you need
const initializeApp = require('firebase/app');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDmz6_GVo03b8sjOf7EjsUM8g4-AN_pdeA",
    authDomain: "fruitclicker-3d7f9.firebaseapp.com",
    databaseURL: "https://fruitclicker-3d7f9-default-rtdb.firebaseio.com",
    projectId: "fruitclicker-3d7f9",
    storageBucket: "fruitclicker-3d7f9.appspot.com",
    messagingSenderId: "1044912318356",
    appId: "1:1044912318356:web:778d4e63def785df969181"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// JavaScript source code ---------------------------------------------

let name = "my name";
let workers = 0;
let workersPrice = 50;
let experiencedWorkers = 0;
let experiencedWorkersPrice = 500;
let appleTrees = 1;
let appleTreesPrice = 50;
let clicker = 1;
let clickerPrice = 10;
let apples = 0;

document.getElementById("appleButton").addEventListener("click", fruitClick);
// document.getElementById("appleAmount").addEventListener("change", cloudSave); // Firebase
document.getElementById("saveButton").addEventListener("click", cloudSave(document.getElementById('userIDInput').inn)); // Firebase
document.getElementById("loadButton").addEventListener("click", cloudLoad(document.getElementById('userIDInput').inn)); // Firebase
timedCount();

// Click from user on button
function fruitClick() {
    apples += clicker;
    document.getElementById("appleAmount").innerHTML = apples;

    // cookie saving
    document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(apples);
    console.log(document.cookie);

    // localstorage saving
    localStorage.setItem('amountOfApples', apples);
    console.log(localStorage.getItem('amountOfApples'));
}

// User click one of many upgrade buttons
function buyUpgrade(upgradeID) {

    if (upgradeID == 1 && apples >= appleTreesPrice) {
        appleTrees++;
        apples -= appleTreesPrice;
        appleTreesPrice = Math.floor((Math.log(appleTrees) + 1) * 50) + appleTreesPrice;
    } else if (upgradeID == 2 && apples >= workersPrice) {
        workers++;
        apples -= workersPrice;
        workersPrice = Math.floor((Math.log(workers) + 1) * 50) + workersPrice;
    } else if (upgradeID == 3 && apples >= experiencedWorkersPrice) {
        experiencedWorkers++;
        apples -= experiencedWorkersPrice;
        experiencedWorkersPrice = Math.floor((Math.log(experiencedWorkers) + 1) * 500) + experiencedWorkersPrice;
    } else if (upgradeID == 4 && apples >= clickerPrice) {
        clicker++;
        apples -= clickerPrice;
        clickerPrice = Math.floor((Math.log(clicker) + 1) * 10) + clickerPrice;
    } else {
        return;
    }

    // update HTML frontend
    document.getElementById('appleTrees').innerHTML = appleTrees;
    document.getElementById('appleTreesPrice').innerHTML = appleTreesPrice;
    document.getElementById('workers').innerHTML = workers;
    document.getElementById('workersPrice').innerHTML = workersPrice;
    document.getElementById('experiencedWorkers').innerHTML = experiencedWorkers;
    document.getElementById('experiencedWorkersPrice').innerHTML = experiencedWorkersPrice;
    document.getElementById('clicker').innerHTML = clicker;
    document.getElementById('clickerPrice').innerHTML = clickerPrice;

}

// A repeating event occuring every second
function timedCount() {

    appleIncrease = Math.floor((Math.log(appleTrees) + 1) * workers + (Math.log(appleTrees) + 1) * (experiencedWorkers * 2));
    document.getElementById('averageApples').innerHTML = appleIncrease;
    apples += appleIncrease;
    document.getElementById("appleAmount").innerHTML = apples;

    setTimeout("timedCount()", 1000);
}

// Firebase live save and load ----------------------------------------

getDatabase = require("firebase/database");
ref = require("firebase/database");
set = require("firebase/database");

function cloudSave(userId) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
        username: name,
        applesSnapshot: apples,
        workersSnapshot: workers,
        workersPriceSnapshot: workersPrice,
        experiencedWorkersSnapshot: experiencedWorkers,
        experiencedWorkersPriceSnapshot: experiencedWorkersPrice,
        appleTreesSnapshot: appleTrees,
        appleTreesPriceSnapshot: appleTreesPrice,
        clickerSnapshot: clicker,
        clickerPriceSnapshot: clickerPriceSnapshot,
    });
}

function cloudLoad(userID) {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            name = snapshot.val().username;
            apples = snapshot.val().applesSnapshot;
            workers = snapshot.val().workersSnapshot;
            workersPrice = snapshot.val().workersPriceSnapshot;
            experiencedWorkers = snapshot.val().experiencedWorkersSnapshot;
            experiencedWorkersPrice = snapshot.val().experiencedWorkersPriceSnapshot;
            appleTrees = snapshot.val().appleTreesSnapshot;
            appleTreesPrice = snapshot.val().appleTreesPriceSnapshot;
            clicker = snapshot.val().clickerSnapshot;
            clickerPriceSnapshot = snapshot.val().clickerPriceSnapshot;
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}
