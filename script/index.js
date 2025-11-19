let carts = [];
let total = 0;

const loadCategories = () => {
    const url = `https://openapi.programming-hero.com/api/categories`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
};

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("category-container")
    categoryContainer.innerHTML = ""

    for (let cat of categories) {
        const categoryCard = document.createElement("div")
        categoryCard.innerHTML = `
        <button id="cat-btn-${cat.id}" onclick="loadPlants(${cat.id})" class="cursor-pointer px-5 py-2 hover:bg-[#15803D] hover:rounded-lg hover:text-white btn-category ">${cat.category_name}</button>
        `
        categoryContainer.append(categoryCard)
    }

};

const loadPlants = (id) => {
    const url = `https://openapi.programming-hero.com/api/category/${id}`

    const catBtns = document.querySelectorAll(".btn-category")
    catBtns.forEach(btn => btn.classList.remove("active"));

    const currentBtn = document.getElementById(`cat-btn-${id}`)
    // console.log(currentBtn)
    currentBtn.classList.add("active")

    fetch(url)
        .then(res => res.json())
        .then(data => displayPlants(data.plants))
};

const displayPlants = (plants) => {
    const cardContainer = document.getElementById("card-container")
    cardContainer.innerHTML = ""

    for (let plant of plants) {
        const plantCard = document.createElement("div")
        plantCard.innerHTML = `
        <div onclick="loadFoodDetails(${plant.id})" class="card bg-base-100 w-fit shadow-sm h-full">
                    <figure>
                        <img class="w-full h-55" src="${plant.image}"
                            alt="Shoes" />
                    </figure>

                    <div class="card-body">
                        <h2 class="card-title plant-name">${plant.name}</h2>
                        <p>${plant.description}</p>
                        <div class="flex justify-between">
                            <button class="bg-[#DCFCE7] px-2 py-1 text-[#15803D] rounded-full">${plant.category}</button>
                            <h3 class="text-xl">৳ <span class="text-xl plant-price">${plant.price}</span></h3>
                        </div>
                        <div onclick="addToCart(this)" class="card-actions justify-center">
                            <button class="btn btn-primary bg-[#15803D] w-full rounded-full mt-5">Add to Cart</button>
                        </div>
                    </div>
                </div>
        `
        cardContainer.append(plantCard)
    }


};

const loadAllPlants = () => {
    const url = `https://openapi.programming-hero.com/api/plants`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayPlants(data.plants))
};

const loadFoodDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayFoodDetails(data.plants))
};

const displayFoodDetails = (plant) => {
    const detailsContainer = document.getElementById("details-container")
    detailsContainer.innerHTML = `
    <div>
                    <h1 class="font-bold text-xl mb-5">${plant.name}</h1>
                    <img class="mb-3 w-full h-55 rounded-xl" src="${plant.image}" alt="">
                    <h3 class="font-bold text-lg ">Category: <span class="font-normal">${plant.category}</span></h3>
                    <h3 class="font-bold text-lg my-3">Price: <span class="font-normal">${plant.price}</span></h3>
                    <p class="font-bold text-lg">Description: <span class="font-normal text-base">${plant.description}</span></p>
                </div>
    `
    document.getElementById("my_modal_2").showModal()
}


loadCategories();
loadAllPlants();


const addToCart = (btn) => {
    const cart = btn.parentNode;
    const plantName = cart.querySelector(".plant-name").innerText;
    const plantPrice = cart.querySelector(".plant-price").innerText;
    const plantPriceNum = Number(plantPrice);
    // console.log(plantPriceNum)
    const selectedItem = {
        plantName: plantName,
        plantPriceNum: plantPriceNum
    };
    carts.push(selectedItem);
    total += plantPriceNum;
    displayCart(carts);
    displayTotal(total)
};

const displayCart = (carts) => {
    const cartContainer = document.getElementById("cart-container")
    cartContainer.innerHTML = "";

    for (let cart of carts) {
        console.log(cart)
        const newItem = document.createElement("div")
        newItem.innerHTML = `
        <div>
            <div class="bg-[#DCFCE7] flex justify-between items-center m-3 p-3 rounded-lg">
                <div>
                    <h1 class="font-semibold text-lg plant-name">
                    ${cart.plantName}</h1>
                    <h3>৳ <span class="plant-price">${cart.plantPriceNum}</span> &#x2613; <span>1</span></h3>
                </div>
                    <button onclick="removeCart(this)" class="cursor-pointer">&#x274C;</button>
            </div>
        `
        cartContainer.append(newItem)
    }
};

const displayTotal = (value) => {
    document.getElementById("cart-total").innerHTML = value;
};

const removeCart = (btn) => {
    const cart = btn.parentNode;
    const plantName = cart.querySelector(".plant-name").innerText;
    const plantPrice = cart.querySelector(".plant-price").innerText;
    const plantPriceNum = Number(plantPrice);

    carts = carts.filter((cart) => cart.plantName != plantName);
    displayCart(cart);
};

