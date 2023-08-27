import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
  update,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://playground-4b473-default-rtdb.asia-southeast1.firebasedatabase.app/",
};
const app = initializeApp(appSettings);
const database = getDatabase(app);
const itemsInDB = ref(database, "items");

let field = document.getElementById("foodName");
let btn = document.getElementById("btn");
let list = document.getElementById("myList");
onValue(itemsInDB, function (snapshot) {
  if (snapshot.exists()) {
    console.log(Object.values(snapshot.val()));
    list.innerHTML = "";
    let itemsArray = Object.entries(snapshot.val());
    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
      appendToView(currentItem);
    }
  } else {
    list.innerHTML = "<h3>No items yet..</h3>";
  }
});

btn.addEventListener("click", function () {
  let val = field.value;
  push(itemsInDB, val);
  clear();
});

function clear() {
  field.value = "";
}
function appendToView(item) {
  let itemID = item[0];
  let itemValue = item[1];
  // list.innerHTML += `<li class="btn btn-dark text-white">${inputVal}</li>`;
  let newEl = document.createElement("li");
  newEl.textContent = itemValue;
  newEl.classList.add("btn", "btn-dark", "text-white");
  newEl.addEventListener("click", function () {
    let ans = confirm("Are you sure you want to delete this item?");
    if (ans == true) {
      let exactLocInDb = ref(database, `items/${itemID}`);
      remove(exactLocInDb);
      alert(`Successfully Removed '${itemValue}' from the database`);
    }
  });
  list.append(newEl);
}
