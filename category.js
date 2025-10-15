const categoryContainer = document.querySelector(".category-container");
const scroll2LeftBtn = document.getElementById("scroll2-left");
const scroll2RightBtn = document.getElementById("scroll2-right");
const viewAll2Btn = document.getElementById("view-all2");

const categoryData = [
  {
    name: "Vegetables",
    img: "images/unsplash_-ftWfohtjNw.png",
  },
  {
    name: "Beverage",
    img: "images/unsplash_tk2ifGN60xo.png",
  },
  {
    name: "Noodles/Pasta",
    img: "images/unsplash_SJ7uORconic.png",
  },
  {
    name: "Fruits",
    img: "images/unsplash_JI5VdAD2mAo.png",
  },
  {
    name: "Frozen Food",
    img: "images/unsplash_DNQLBdGdld0.png",
  },
  {
    name: "Dairy & Eggs",
    img: "images/pngegg (2).png",
  },
  {
    name: "Canned Goods",
    img: "images/pngegg (1).png",
  },
  {
    name: "Seafood",
    img: "images/pngegg.png",
  },
  {
    name: "Baked",
    img: "images/pngwing.com.png",
  },
];

function displayCategories() {
  categoryContainer.innerHTML = "";
  categoryData.forEach((category) => {
    const card = document.createElement("div");
    card.classList.add("category-card");
    card.innerHTML = `
      <img src="${category.img}" alt="${category.name}" class="category-image" />
      <h3 class="category-name">${category.name}</h3>
    `;
    categoryContainer.appendChild(card);
  });
}

const categoryScrollAmount = 605;

const scrollCategoryLeft = () => {
  categoryContainer.scrollBy({
    left: -categoryScrollAmount,
    behavior: "smooth",
  });
};

const scrollCategoryRight = () => {
  categoryContainer.scrollBy({
    left: categoryScrollAmount,
    behavior: "smooth",
  });
};

if (scroll2LeftBtn && categoryContainer) {
  scroll2LeftBtn.addEventListener("click", scrollCategoryLeft);
}
if (scroll2RightBtn && categoryContainer) {
  scroll2RightBtn.addEventListener("click", scrollCategoryRight);
}

function toggleViewAll() {
  categoryContainer.classList.toggle("view-all-enabled");

  if (categoryContainer.classList.contains("view-all-enabled")) {
    viewAll2Btn.textContent = "VIEW LESS";
    if (scroll2LeftBtn) scroll2LeftBtn.style.display = "none";
    if (scroll2RightBtn) scroll2RightBtn.style.display = "none";
  } else {
    viewAll2Btn.textContent = "VIEW ALL";
    if (scroll2LeftBtn) scroll2LeftBtn.style.display = "flex"; 
    if (scroll2RightBtn) scroll2RightBtn.style.display = "flex";
  }
}

if (viewAll2Btn) {
  viewAll2Btn.addEventListener("click", toggleViewAll);
}

displayCategories();
