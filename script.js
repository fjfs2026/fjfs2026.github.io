const WHATSAPP_NUMBER = "79280893233";
const CART_STORAGE_KEY = "amina-food-cart";

const categories = [
  { id: "all", name: "Все" },
  { id: "hot", name: "Горячее" },
  { id: "semi", name: "Полуфабрикаты" },
  { id: "meat", name: "Котлеты и мясное" },
  { id: "desserts", name: "Торты и десерты" },
  { id: "extra", name: "Дополнительно" }
];

const products = [
  {
    id: "manty",
    name: "Манты",
    price: 450,
    category: "hot",
    description: "Сочные домашние манты для сытного семейного обеда.",
    image: "images/Манты.jpg"
  },
  {
    id: "pelmeni",
    name: "Пельмени",
    price: 450,
    category: "hot",
    description: "Домашние пельмени с мягким тестом и мясной начинкой.",
    image: "images/Пельмени.jpg"
  },
  {
    id: "vareniki-kartoshka",
    name: "Вареники с картошкой",
    price: 290,
    category: "hot",
    description: "Нежные вареники с картофельной начинкой.",
    image: "images/Вареники с картошкой.jpg"
  },
  {
    id: "vareniki-tvorog",
    name: "Вареники с творогом",
    price: 400,
    category: "hot",
    description: "Домашние вареники с творогом для завтрака или ужина.",
    image: "images/Вареники с творогом.jpg"
  },
  {
    id: "chebureki",
    name: "Чебуреки 5 шт",
    price: 350,
    category: "hot",
    description: "Пять ароматных чебуреков с сочной начинкой.",
    image: "images/Чебуреки 5 шт.jpg"
  },
  {
    id: "galushki",
    name: "Галушки",
    price: 190,
    category: "hot",
    description: "Простое и уютное домашнее блюдо на каждый день.",
    image: "images/Галушки.jpg"
  },
  {
    id: "manty-squares",
    name: "Квадратики на манты 50 шт",
    price: 300,
    category: "semi",
    description: "Готовые квадратики теста для быстрого приготовления мантов.",
    image: "images/Квадратики на манты 50 шт.jpg"
  },
  {
    id: "pelmeni-circles",
    name: "Кружочки на пельмени 50 шт",
    price: 250,
    category: "semi",
    description: "Ровные кружочки теста для домашних пельменей.",
    image: "images/Кружочки на пельмени 50 шт.jpg"
  },
  {
    id: "golubtsy",
    name: "Голубцы 10 шт",
    price: 1000,
    category: "meat",
    description: "Десять домашних голубцов с насыщенной мясной начинкой.",
    image: "images/Голубцы 10 шт.jpg"
  },
  {
    id: "tefteli",
    name: "Тефтели 10 шт",
    price: 900,
    category: "meat",
    description: "Нежные тефтели, которые удобно разогреть к ужину.",
    image: "images/Тефтели 10 шт.jpg"
  },
  {
    id: "meat-cutlets",
    name: "Котлеты мясные 10 шт",
    price: 850,
    category: "meat",
    description: "Домашние мясные котлеты, готовые к семейному столу.",
    image: "images/Котлеты мясные 10 шт.jpg"
  },
  {
    id: "chicken-cutlets",
    name: "Котлеты куриные 10 шт",
    price: 850,
    category: "meat",
    description: "Легкие куриные котлеты с мягким домашним вкусом.",
    image: "images/Котлеты куриные 10 шт.jpg"
  },
  {
    id: "chicken-chops",
    name: "Куриные отбивные 5 шт",
    price: 600,
    category: "meat",
    description: "Пять сочных куриных отбивных для быстрого обеда.",
    image: "images/Куриные отбивные 5 шт.jpg"
  },
  {
    id: "medovik",
    name: "Медовик",
    price: 1500,
    category: "desserts",
    description: "Классический медовый торт с нежным кремом.",
    image: "images/Медовик.jpg"
  },
  {
    id: "liver-cake",
    name: "Печеночный торт",
    price: 1600,
    category: "desserts",
    description: "Сытный печеночный торт для праздничного стола.",
    image: "images/Печеночный торт.jpg"
  },
  {
    id: "zazharka",
    name: "Зажарка",
    price: 190,
    category: "extra",
    description: "Ароматная домашняя зажарка как дополнение к блюдам.",
    image: "images/Зажарка.jpg"
  }
];

const categoryNav = document.querySelector("#categoryNav");
const catalog = document.querySelector("#catalog");
const cartButton = document.querySelector("#cartButton");
const cartCount = document.querySelector("#cartCount");
const cartOverlay = document.querySelector("#cartOverlay");
const cartDrawer = document.querySelector("#cartDrawer");
const closeCart = document.querySelector("#closeCart");
const cartItems = document.querySelector("#cartItems");
const cartEmpty = document.querySelector("#cartEmpty");
const cartTotal = document.querySelector("#cartTotal");
const orderForm = document.querySelector("#orderForm");
const customerName = document.querySelector("#customerName");
const customerComment = document.querySelector("#customerComment");
const commentLabel = document.querySelector("#commentLabel");
const formMessage = document.querySelector("#formMessage");

let cart = loadCart();

function formatPrice(price) {
  return `${price.toLocaleString("ru-RU")} ₽`;
}

function getCategoryName(categoryId) {
  return categories.find((category) => category.id === categoryId)?.name || "";
}

function getCartItem(productId) {
  return cart.find((item) => item.id === productId);
}

function getCartQuantity(productId) {
  return getCartItem(productId)?.quantity || 0;
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function saveCart() {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function loadCart() {
  try {
    const savedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
    if (!Array.isArray(savedCart)) {
      return [];
    }

    return savedCart
      .map((item) => {
        const product = products.find((currentProduct) => currentProduct.id === item.id);
        const quantity = Number(item.quantity);

        if (!product || !Number.isInteger(quantity) || quantity < 1) {
          return null;
        }

        return { ...product, quantity };
      })
      .filter(Boolean);
  } catch {
    return [];
  }
}

function renderCategories() {
  categoryNav.innerHTML = categories
    .map((category) => {
      const target = category.id === "all" ? "menu" : `category-${category.id}`;

      return `
        <button class="category-button" type="button" data-target="${target}" data-category="${category.id}">
          ${category.name}
        </button>
      `;
    })
    .join("");
}

function renderCatalog() {
  const menuCategories = categories.filter((category) => category.id !== "all");

  catalog.innerHTML = menuCategories
    .map((category) => {
      const categoryProducts = products.filter((product) => product.category === category.id);

      return `
        <section class="category-section" id="category-${category.id}" data-category="${category.id}">
          <div class="category-section__header">
            <h3>${category.name}</h3>
            <span class="category-section__count">${categoryProducts.length} ${getProductWord(categoryProducts.length)}</span>
          </div>
          <div class="product-grid">
            ${categoryProducts.map(renderProductCard).join("")}
          </div>
        </section>
      `;
    })
    .join("");
}

function getProductWord(count) {
  if (count % 10 === 1 && count % 100 !== 11) {
    return "позиция";
  }

  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
    return "позиции";
  }

  return "позиций";
}

function renderProductCard(product) {
  const quantity = getCartQuantity(product.id);
  const controls = quantity
    ? `
      <div class="quantity-control" aria-label="Количество ${product.name}">
        <button type="button" data-action="decrease" data-id="${product.id}" aria-label="Уменьшить количество">−</button>
        <span>${quantity}</span>
        <button type="button" data-action="increase" data-id="${product.id}" aria-label="Увеличить количество">+</button>
      </div>
    `
    : `<button class="button button--primary button--full" type="button" data-action="add" data-id="${product.id}">Добавить</button>`;

  return `
    <article class="product-card" data-product-id="${product.id}">
      <div class="product-card__media">
        <img
          class="product-card__image"
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
          onerror="showImagePlaceholder(this, '${product.name.replace(/'/g, "\\'")}')"
        >
      </div>
      <div class="product-card__body">
        <h4>${product.name}</h4>
        <p class="product-card__description">${product.description}</p>
        <div class="product-card__bottom">
          <span class="product-card__price">${formatPrice(product.price)}</span>
          ${controls}
        </div>
      </div>
    </article>
  `;
}

function showImagePlaceholder(image, productName) {
  const placeholder = document.createElement("div");
  placeholder.className = "product-card__placeholder";
  placeholder.textContent = productName;
  image.replaceWith(placeholder);
}

function updateProductControls(productId) {
  const product = products.find((currentProduct) => currentProduct.id === productId);

  document
    .querySelectorAll(`.product-card[data-product-id="${productId}"]`)
    .forEach((card) => {
      card.outerHTML = renderProductCard(product);
    });
}

function addToCart(productId) {
  const existingItem = getCartItem(productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const product = products.find((currentProduct) => currentProduct.id === productId);
    cart.push({ ...product, quantity: 1 });
  }

  syncCart(productId);
}

function changeQuantity(productId, delta) {
  const existingItem = getCartItem(productId);

  if (!existingItem) {
    return;
  }

  existingItem.quantity += delta;

  if (existingItem.quantity <= 0) {
    cart = cart.filter((item) => item.id !== productId);
  }

  syncCart(productId);
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  syncCart(productId);
}

function syncCart(productId) {
  saveCart();
  renderCart();
  updateProductControls(productId);
}

function renderCart() {
  cartCount.textContent = getCartCount();
  cartTotal.textContent = formatPrice(getCartTotal());
  cartEmpty.hidden = cart.length > 0;

  cartItems.innerHTML = cart
    .map((item) => `
      <article class="cart-item">
        <div>
          <p class="cart-item__name">${item.name}</p>
          <p class="cart-item__meta">${formatPrice(item.price)} за 1 шт</p>
          <p class="cart-item__sum">Сумма: ${formatPrice(item.price * item.quantity)}</p>
        </div>
        <div class="cart-item__controls" aria-label="Количество ${item.name}">
          <button type="button" data-cart-action="decrease" data-id="${item.id}" aria-label="Уменьшить">−</button>
          <span>${item.quantity}</span>
          <button type="button" data-cart-action="increase" data-id="${item.id}" aria-label="Увеличить">+</button>
          <button class="cart-item__remove" type="button" data-cart-action="remove" data-id="${item.id}">Удалить</button>
        </div>
      </article>
    `)
    .join("");
}

function openCart() {
  cartDrawer.classList.add("is-open");
  cartOverlay.classList.add("is-open");
  document.body.classList.add("cart-open");
  cartDrawer.setAttribute("aria-hidden", "false");
  cartOverlay.setAttribute("aria-hidden", "false");
}

function closeCartDrawer() {
  cartDrawer.classList.remove("is-open");
  cartOverlay.classList.remove("is-open");
  document.body.classList.remove("cart-open");
  cartDrawer.setAttribute("aria-hidden", "true");
  cartOverlay.setAttribute("aria-hidden", "true");
}

function updateCommentLabel() {
  const deliveryType = new FormData(orderForm).get("deliveryType");

  if (deliveryType === "Доставка") {
    commentLabel.textContent = "Адрес доставки или комментарий";
    customerComment.placeholder = "Улица, дом, квартира или пожелания к заказу";
  } else {
    commentLabel.textContent = "Комментарий к заказу";
    customerComment.placeholder = "Пожелания к заказу или удобное время самовывоза";
  }
}

function buildOrderMessage() {
  const formData = new FormData(orderForm);
  const name = customerName.value.trim();
  const deliveryType = formData.get("deliveryType");
  const comment = customerComment.value.trim();
  const orderLines = cart.map((item, index) => (
    `${index + 1}. ${item.name} — ${item.quantity} шт × ${formatPrice(item.price)} = ${formatPrice(item.price * item.quantity)}`
  ));

  return [
    "Здравствуйте! Хочу сделать заказ:",
    "",
    ...orderLines,
    "",
    `Итого: ${formatPrice(getCartTotal())}`,
    "",
    `Имя: ${name}`,
    `Получение: ${deliveryType}`,
    `Адрес/комментарий: ${comment || "не указан"}`
  ].join("\n");
}

function validateOrder() {
  const deliveryType = new FormData(orderForm).get("deliveryType");

  if (cart.length === 0) {
    return "Добавьте хотя бы один товар в корзину.";
  }

  if (!customerName.value.trim()) {
    return "Пожалуйста, укажите имя клиента.";
  }

  if (deliveryType === "Доставка" && !customerComment.value.trim()) {
    return "Пожалуйста, укажите адрес доставки или комментарий.";
  }

  return "";
}

function sendOrder(event) {
  event.preventDefault();

  const error = validateOrder();

  if (error) {
    formMessage.textContent = error;
    return;
  }

  formMessage.textContent = "";
  const message = encodeURIComponent(buildOrderMessage());
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank", "noopener");
}

function setActiveCategory(categoryId) {
  document.querySelectorAll(".category-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.category === categoryId);
  });

  const activeButton = document.querySelector(`.category-button[data-category="${categoryId}"]`);
  activeButton?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
}

function setupCategoryObserver() {
  const sections = document.querySelectorAll(".category-section");

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => second.intersectionRatio - first.intersectionRatio);

      if (visibleEntries.length > 0) {
        setActiveCategory(visibleEntries[0].target.dataset.category);
      }
    },
    {
      rootMargin: "-35% 0px -50% 0px",
      threshold: [0.15, 0.35, 0.6]
    }
  );

  sections.forEach((section) => observer.observe(section));
}

categoryNav.addEventListener("click", (event) => {
  const button = event.target.closest(".category-button");

  if (!button) {
    return;
  }

  document.querySelector(`#${button.dataset.target}`)?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

catalog.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");

  if (!button) {
    return;
  }

  const productId = button.dataset.id;

  if (button.dataset.action === "add" || button.dataset.action === "increase") {
    addToCart(productId);
  }

  if (button.dataset.action === "decrease") {
    changeQuantity(productId, -1);
  }
});

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("[data-cart-action]");

  if (!button) {
    return;
  }

  const productId = button.dataset.id;
  const action = button.dataset.cartAction;

  if (action === "increase") {
    addToCart(productId);
  }

  if (action === "decrease") {
    changeQuantity(productId, -1);
  }

  if (action === "remove") {
    removeFromCart(productId);
  }
});

cartButton.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartDrawer);
cartOverlay.addEventListener("click", closeCartDrawer);
orderForm.addEventListener("change", updateCommentLabel);
orderForm.addEventListener("submit", sendOrder);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCartDrawer();
  }
});

renderCategories();
renderCatalog();
renderCart();
updateCommentLabel();
setActiveCategory("all");
setupCategoryObserver();
