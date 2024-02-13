import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
  databaseURL:
    "https://playground-8f4d8-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const itemsInDb = ref(database, "items");

const inputEl = document.getElementById("input-el");
const buttonEl = document.getElementById("button-el");
const listEl = document.getElementById("list-el");
const errorMessageEl = document.getElementById("error-message-el");

buttonEl.addEventListener("click", function () {
  addItem();
});

inputEl.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addItem();
  }
});

function addItem() {
  let inputValue = inputEl.value;
  if (inputValue.trim() !== "") {
    push(itemsInDb, inputValue);
    inputEl.value = "";
    errorMessageEl.innerHTML = "";
    console.log(`${inputValue} added to database`);
  } else {
    errorMessageEl.innerHTML = "Please enter a value.";
    console.log("Input is empty. Please enter a value.");
  }
}

onValue(itemsInDb, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());

    clearItemList();
    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
      let currentItemID = currentItem[0];
      let currentItemValue = currentItem[1];

      addItemToListEl(currentItem);
    }
  } else {
    listEl.innerHTML = "No items here...";
  }
});

function clearItemList() {
  listEl.innerHTML = "";
}

function addItemToListEl(item) {
  let itemID = item[0];
  let itemValue = item[1];

  let newEl = document.createElement("li");

  newEl.innerHTML = itemValue;

  newEl.addEventListener("dblclick", function () {
    let exactLocationOfItemInDb = ref(database, `items/${itemID}`);
    remove(exactLocationOfItemInDb);
    console.log(`${itemValue} removed from database`);
  });

  listEl.append(newEl);
}
