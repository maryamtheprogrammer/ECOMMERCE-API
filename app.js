let box = document.getElementById("main");
let categoriesSelect = document.getElementById("categories");
let card = document.querySelector('.card');
let loading = document.querySelector('.loader');
let allData = [];

async function apiRender() {
  loading.style.display = 'block';
  let api = await fetch("https://fakestoreapi.com/products");
  let data = await api.json();
  loading.style.display = 'none';
  allData = data;
  renderProducts(data);
  category(data);
}

function renderProducts(data) {
  box.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    box.innerHTML += `
      <div class="card" data-category="${data[i].category}">
        <div class="img">
          <img src="${data[i].image}" alt="item">
        </div>
        <h2>${data[i].title}</h2>
        <h4>Rs ${data[i].price}</h4>
        <button class="add">Add to Cart</button>
        <button class="view">View Details</button>
      </div>
    `;
  }
}

function category(data) {
  let uniqueCategories = [];
  for (let i = 0; i < data.length; i++) {
    let cat = data[i].category;
    if (!uniqueCategories.includes(cat)) {
      uniqueCategories.push(cat);
      categoriesSelect.innerHTML += `<option value="${cat}">${cat}</option>`;
    }
  }
  categoriesSelect.addEventListener("change", filter);
}

function filter() {
  let selected = categoriesSelect.value;
  let cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    let cardCat = card.getAttribute("data-category");
    if (selected === "" || cardCat === selected) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

apiRender();

