import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js"

const firebaseConfig = {
  databaseURL: "https://playground-8f4d8-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const itemsInDb = ref(database, "items")

const inputEl = document.getElementById("input-el");
const buttonEl = document.getElementById("button-el");
const listEl = document.getElementById("list-el")

buttonEl.addEventListener("click", function () {
  let inputValue = inputEl.value;
  push(itemsInDb, inputValue)
  console.log(`${inputValue} added to database`);

  clearInputEl()
  addItemToListEl(inputValue)
});

function clearInputEl() {
  inputEl.value = '';
}

function addItemToListEl(itemValue) {
  listEl.innerHTML += `${itemValue}`
}



