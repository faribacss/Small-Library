//Hide checkbox
let checkbox = document.querySelector(".ticket");
let ul1 = document.querySelector("ul");

checkbox.addEventListener("change", function () {
  if (checkbox.checked === true) {
    ul1.style.display = "none";
  } else {
    ul1.style.display = "block";
  }
});

//Add new books
const addBooks = document.querySelector(".add-book");
const link = document.querySelector("#butt");
const ul2 = document.querySelector("ul");
const spanDelete = `<span class = "delete"> حذف</span>`;

link.addEventListener("click", function (e) {
  const spanName = document.createElement("span");
  spanName.className = "name";
  spanName.textContent = addBooks.value;

  const li = document.createElement("li");
  li.appendChild(spanName);
  li.innerHTML += spanDelete;
  ul2.appendChild(li);

  storeToLocalStorage(addBooks.value);

  addBooks.value = "";

  e.preventDefault();
});

//  ماندن کتاب ها در کتابخانه و لوکال استوریج با لود کردن صفحه وقتی کتاب اضافه کردیم
document.addEventListener("DOMContentLoaded", function (e) {
  let newBooks;
  if (localStorage.getItem("bookColloction") === null) {
    newBooks = [];
  } else {
    newBooks = localStorage.getItem("bookColloction").split(",");
  }
  for (let item of newBooks) {
    const spanName = document.createElement("span");
    spanName.className = "name";
    spanName.textContent = item;
    const li = document.createElement("li");
    li.appendChild(spanName);
    li.innerHTML += spanDelete;
    ul2.appendChild(li);
  }
});

function storeToLocalStorage(book) {
  let newBooks;
  if (localStorage.getItem("bookColloction") === null) {
    newBooks = [];
  } else {
    newBooks = localStorage.getItem("bookColloction").split(",");
  }

  newBooks.push(book);

  localStorage.setItem("bookColloction", newBooks);
}

//حذف یک کتاب از لیست کتابخانه و داخل لوکال استوریج
ul2.addEventListener("click", function (e) {
  if (e.target.className === "delete") {
    e.target.parentElement.remove();
    removeFromLocalStorage(e.target.parentElement.children[0].textContent);
  }
});
function removeFromLocalStorage(book) {
  let newBooks;
  if (localStorage.getItem("bookColloction") === null) {
    newBooks = [];
  } else {
    newBooks = localStorage.getItem("bookColloction").split(",");
  }
  for (let i = 0; i < newBooks.length; i++) {
    if (newBooks[i] === book) {
      newBooks.splice(i, 1);
    }
    if (newBooks.length === 0) {
      localStorage.clear();
    } else {
      localStorage.setItem("bookColloction", newBooks);
    }
  }
}

// سرچ کردن نام کتاب مورد نظر
const inputSearch = document.querySelector("input#book");
const ul3 = document.querySelector("ul");
const noResultMessage = document.createElement("p");
noResultMessage.className = "error";
noResultMessage.textContent = "کتاب مورد نظر موجود نیست!";
noResultMessage.style.display = "none";
ul3.parentElement.appendChild(noResultMessage);

inputSearch.addEventListener("keyup", function (e) {
  let found = false;

  for (let book of ul3.children) {
    if (book.firstElementChild.textContent.indexOf(inputSearch.value) !== -1) {
      book.style.display = "block";
      found = true;
    } else {
      book.style.display = "none";
    }

    if (!found) {
      noResultMessage.style.display = "block";
    } else {
      noResultMessage.style.display = "none";
    }
  }
});



