const WHATSAPP_NUMBER = "79280893233";
const CART_STORAGE_KEY = "aminka-cart-v3";
const CATALOG_CSV_URL = (window.CATALOG_CSV_URL || "").trim();
const CATALOG_STYLE = new URLSearchParams(window.location.search).get("catalog");

if (CATALOG_STYLE === "glass") {
  document.documentElement.classList.add("catalog-glass");
}

const CATEGORY_ORDER = [
  { id: "all", name: "Все" },
  { id: "hot", name: "Горячее" },
  { id: "semi", name: "Полуфабрикаты" },
  { id: "meat", name: "Мясное" },
  { id: "desserts", name: "Десерты" },
  { id: "salads", name: "Салаты" },
  { id: "extra", name: "Дополнительно" }
];

const CATEGORY_ALIASES = new Map([
  ["горячее", "hot"],
  ["полуфабрикаты", "semi"],
  ["мясное", "meat"],
  ["десерты", "desserts"],
  ["салаты", "salads"],
  ["дополнительно", "extra"]
]);

const BASE_PRODUCTS = [
  product("bliny", "Блины 1 шт", 45, "45 ₽", "extra", "preorder", "images/Блины 1шт 45р.webp"),
  product("vareniki-potato", "Вареники с картошкой", 320, "320 ₽", "hot", "preorder", "images/Вареники с картошкой 320.webp"),
  product("vareniki-tvorog", "Вареники с творогом", 400, "400 ₽", "hot", "preorder", "images/Вареники с творогом 400.webp"),
  product("galushki", "Галушки", 220, "220 ₽", "hot", "preorder", "images/Галушки 220р.webp"),
  product("golubtsy", "Голубцы 10 шт", 1000, "1000 ₽", "hot", "preorder", "images/Голубцы 10шт 1000р.webp"),
  product("zazharka", "Зажарка", 190, "190 ₽", "extra", "preorder", "images/Зажарка 190.webp"),
  product("manty-squares", "Квадратики на манты 50 шт", 300, "300 ₽", "semi", "preorder", "images/Квадратики на манты 50шт 300р.webp"),
  product("kiev-cutlets", "Котлеты по-киевски 5 шт", 700, "700 ₽", "meat", "preorder", "images/Котлеты по - киевски 5шт 700р.webp"),
  product("chicken-cutlets", "Куриные котлеты 10 шт", 850, "850 ₽", "meat", "preorder", "images/Куриные котлеты 10шт 850.webp"),
  product("chicken-chops", "Куриные отбивные 5 шт", 600, "600 ₽", "meat", "preorder", "images/Куриные отбивные 5шт 600р.webp"),
  product("manty", "Манты", 450, "450 ₽", "hot", "preorder", "images/Манты 450.webp"),
  product("medovik", "Медовик", 1500, "1500 ₽ / 750 ₽", "desserts", "preorder", "images/Медовик 1500 750.webp"),
  product("meat-cutlets", "Мясные котлеты 10 шт", 850, "850 ₽", "meat", "preorder", "images/Мясные котлеты 10шт 850.webp"),
  product("meat-chicken-rolls", "Мясные и куриные рулеты", 2200, "2200 ₽", "meat", "preorder", "images/Мясные, куриные рулеты 2200.webp"),
  product("nut-cake", "Ореховый торт", 1300, "1300 ₽", "desserts", "preorder", "images/Ореховый торт 1300.webp"),
  product("pelmeni", "Пельмени", 450, "450 ₽", "hot", "preorder", "images/Пельмени 450.webp"),
  product("liver-cake", "Печеночный торт", 1600, "1600 ₽ / 800 ₽", "desserts", "preorder", "images/Печеночный торт - 1600 800.webp"),
  product("cleaned-chicken", "Разделанная очищенная курица", 0, "уточнить", "meat", "preorder", "images/Разделанная, очищенная курица 1т.webp"),
  product("salad", "Салат", 100, "100 ₽", "salads", "preorder", "images/Салат 100.webp"),
  product("crab-salad", "Салат крабовый", 100, "100 ₽", "salads", "preorder", "images/Салат крабовый 100.webp"),
  product("olivier", "Салат Оливье", 100, "100 ₽", "salads", "preorder", "images/Салат Оливье 100.webp"),
  product("caesar", "Салат Цезарь", 100, "100 ₽", "salads", "preorder", "images/Салат цезарь 100.webp"),
  product("sweet-pilaf", "Сладкий плов", 900, "900 ₽", "desserts", "preorder", "images/Сладкий плов 100гр 900р.webp"),
  product("syrniki", "Сырники 10 шт", 550, "550 ₽", "desserts", "preorder", "images/Сырники 10шт 550.webp"),
  product("tefteli", "Тефтели 10 шт", 900, "900 ₽", "meat", "preorder", "images/Тефтели 10шт 900р.webp"),
  product("stuffed-peppers", "Фаршированные перцы", 850, "850 ₽", "hot", "preorder", "images/Фаршированные перцы - 850р.webp"),
  product("hanum", "Ханум", 350, "350 ₽", "hot", "preorder", "images/Ханум 350р.webp"),
  product("chebureki", "Чебуреки 5 шт", 350, "350 ₽", "semi", "preorder", "images/Чебуреки 5шт 350.webp")
];

const categoryTabs = document.querySelector("#categoryTabs");
const catalog = document.querySelector("#catalog");
const cartButton = document.querySelector("#cartButton");
const cartCount = document.querySelector("#cartCount");
const cartOverlay = document.querySelector("#cartOverlay");
const cartDrawer = document.querySelector("#cartDrawer");
const closeCart = document.querySelector("#closeCart");
const cartItems = document.querySelector("#cartItems");
const cartEmpty = document.querySelector("#cartEmpty");
const cartTotal = document.querySelector("#cartTotal");
const priceNote = document.querySelector("#priceNote");
const orderForm = document.querySelector("#orderForm");
const customerName = document.querySelector("#customerName");
const deliveryTime = document.querySelector("#deliveryTime");
const customerComment = document.querySelector("#customerComment");
const commentLabel = document.querySelector("#commentLabel");
const formMessage = document.querySelector("#formMessage");
const cashChangeWrap = document.querySelector("#cashChangeWrap");
const cashChange = document.querySelector("#cashChange");

let products = BASE_PRODUCTS.map((item) => ({ ...item }));
let categories = buildCategories(products);
let cart = [];

function product(id, name, price, priceText, category, status, image) {
  return { id, name, price, priceText, category, status, image };
}

function normalize(value) {
  return String(value || "").trim();
}

function normalizeKey(value) {
  return normalize(value).toLowerCase().replace(/\s+/g, " ");
}

function escapeHtml(value) {
  return normalize(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatPrice(value) {
  return new Intl.NumberFormat("ru-RU").format(value) + " ₽";
}

function statusFromText(value) {
  const text = normalizeKey(value);

  if (text.includes("нет")) {
    return "out";
  }

  if (text.includes("есть") || text.includes("налич")) {
    return "in";
  }

  return "preorder";
}

function statusLabel(status) {
  if (status === "in") {
    return "В наличии";
  }

  if (status === "out") {
    return "Нет в наличии";
  }

  return "Под заказ";
}

function statusClass(status) {
  if (status === "out") {
    return "product-card__badge--out";
  }

  if (status === "preorder") {
    return "product-card__badge--preorder";
  }

  return "";
}

function categoryIdFromText(value, fallback = "extra") {
  const text = normalizeKey(value);

  if (!text) {
    return fallback;
  }

  if (CATEGORY_ALIASES.has(text)) {
    return CATEGORY_ALIASES.get(text);
  }

  return text.replace(/[^a-zа-я0-9]+/gi, "-").replace(/^-|-$/g, "") || fallback;
}

function categoryName(categoryId) {
  return categories.find((category) => category.id === categoryId)?.name || categoryId;
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"' && quoted && next === '"') {
      cell += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      quoted = !quoted;
      continue;
    }

    if (char === "," && !quoted) {
      row.push(cell);
      cell = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      continue;
    }

    cell += char;
  }

  row.push(cell);
  rows.push(row);

  const [headers = [], ...dataRows] = rows.filter((items) => items.some((item) => normalize(item)));
  return dataRows.map((items) => Object.fromEntries(headers.map((header, index) => [normalize(header), normalize(items[index])])));
}

async function loadSheetRows() {
  if (!CATALOG_CSV_URL) {
    return [];
  }

  const response = await fetch(CATALOG_CSV_URL, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Не удалось загрузить таблицу");
  }

  return parseCsv(await response.text());
}

function rowValue(row, names) {
  const key = Object.keys(row).find((item) => names.includes(normalizeKey(item)));
  return key ? row[key] : "";
}

function productsFromRows(rows) {
  const byName = new Map(BASE_PRODUCTS.map((item) => [normalizeKey(item.name), item]));

  return rows.map((row, index) => {
    const name = rowValue(row, ["название", "товар", "блюдо"]);
    if (!name) {
      return null;
    }

    const base = byName.get(normalizeKey(name));
    const categoryText = rowValue(row, ["категория", "раздел"]);
    const statusText = rowValue(row, ["статус", "наличие"]);

    if (base) {
      return {
        ...base,
        category: categoryIdFromText(categoryText, base.category),
        status: statusFromText(statusText || statusLabel(base.status))
      };
    }

    return {
      id: "sheet-" + index,
      name,
      price: 0,
      priceText: "уточнить",
      category: categoryIdFromText(categoryText, "extra"),
      status: statusFromText(statusText),
      image: ""
    };
  }).filter(Boolean);
}

async function loadCatalog() {
  try {
    const rows = await loadSheetRows();
    const sheetProducts = productsFromRows(rows);

    if (sheetProducts.length) {
      products = sheetProducts;
    }
  } catch (error) {
    console.warn(error);
  }

  categories = buildCategories(products);
}

function buildCategories(items) {
  const result = [CATEGORY_ORDER[0]];
  const used = new Set(["all"]);

  CATEGORY_ORDER.slice(1).forEach((category) => {
    if (items.some((item) => item.category === category.id)) {
      result.push(category);
      used.add(category.id);
    }
  });

  items.forEach((item) => {
    if (!used.has(item.category)) {
      result.push({ id: item.category, name: item.category });
      used.add(item.category);
    }
  });

  return result;
}

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");

    if (!Array.isArray(saved)) {
      return [];
    }

    return saved.map((savedItem) => {
      const item = products.find((productItem) => productItem.id === savedItem.id);
      const quantity = Math.max(1, Number(savedItem.quantity) || 1);

      if (!item || item.status === "out") {
        return null;
      }

      return { ...item, quantity };
    }).filter(Boolean);
  } catch {
    return [];
  }
}

function saveCart() {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart.map((item) => ({
    id: item.id,
    quantity: item.quantity
  }))));
}

function cartQuantity(productId) {
  return cart.find((item) => item.id === productId)?.quantity || 0;
}

function cartCountValue() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function cartKnownTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function hasUnknownPrices() {
  return cart.some((item) => !item.price);
}

function displayPrice(item) {
  return item.priceText || (item.price ? formatPrice(item.price) : "уточнить");
}

function renderCategories() {
  categoryTabs.innerHTML = categories.map((category) => {
    const target = category.id === "all" ? "#menu" : "#category-" + category.id;
    return `<button class="category-tab" type="button" data-category="${escapeHtml(category.id)}" data-target="${escapeHtml(target)}">${escapeHtml(category.name)}</button>`;
  }).join("");
}

function renderCatalog() {
  catalog.innerHTML = categories.filter((category) => category.id !== "all").map((category) => {
    const categoryProducts = products.filter((item) => item.category === category.id);

    if (!categoryProducts.length) {
      return "";
    }

    return `
      <section class="category-section" id="category-${escapeHtml(category.id)}" data-category="${escapeHtml(category.id)}">
        <div class="category-section__header">
          <h3>${escapeHtml(category.name)}</h3>
          <span>${categoryProducts.length} поз.</span>
        </div>
        <div class="product-grid">
          ${categoryProducts.map(renderProductCard).join("")}
        </div>
      </section>
    `;
  }).join("");
}

function renderProductCard(item) {
  const quantity = cartQuantity(item.id);
  const unavailable = item.status === "out";
  const media = item.image
    ? `<img class="product-card__image" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" loading="lazy" width="720" height="720" onerror="showImagePlaceholder(this)">`
    : `<div class="product-card__placeholder">Фото добавим позже</div>`;
  const control = unavailable
    ? `<button class="round-action" type="button" disabled aria-label="Нет в наличии">×</button>`
    : quantity
      ? `
        <div class="quantity-control" aria-label="Количество">
          <button type="button" data-action="decrease" data-id="${escapeHtml(item.id)}" aria-label="Уменьшить">−</button>
          <span>${quantity}</span>
          <button type="button" data-action="add" data-id="${escapeHtml(item.id)}" aria-label="Увеличить">+</button>
        </div>
      `
      : `<button class="round-action" type="button" data-action="add" data-id="${escapeHtml(item.id)}" aria-label="Добавить">+</button>`;

  return `
    <article class="product-card ${unavailable ? "is-unavailable" : ""}" data-product-id="${escapeHtml(item.id)}">
      <div class="product-card__media">
        ${media}
        <div class="product-card__badges">
          <span class="product-card__badge ${statusClass(item.status)}">${statusLabel(item.status)}</span>
          <span class="product-card__badge product-card__badge--category">${escapeHtml(categoryName(item.category))}</span>
        </div>
      </div>
      <div class="product-card__body">
        <h4>${escapeHtml(item.name)}</h4>
        <div class="product-card__bottom">
          <span class="product-card__price">${escapeHtml(displayPrice(item))}</span>
          ${control}
        </div>
      </div>
    </article>
  `;
}

function showImagePlaceholder(image) {
  const placeholder = document.createElement("div");
  placeholder.className = "product-card__placeholder";
  placeholder.textContent = "Фото";
  image.replaceWith(placeholder);
}

window.showImagePlaceholder = showImagePlaceholder;

function updateProductCard(productId) {
  const item = products.find((productItem) => productItem.id === productId);
  if (!item) {
    return;
  }

  document.querySelectorAll(".product-card").forEach((card) => {
    if (card.dataset.productId === productId) {
      card.outerHTML = renderProductCard(item);
    }
  });
}

function addToCart(productId) {
  const item = products.find((productItem) => productItem.id === productId);
  if (!item || item.status === "out") {
    return;
  }

  const existing = cart.find((cartItem) => cartItem.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  syncCart(productId);
}

function changeQuantity(productId, delta) {
  const existing = cart.find((item) => item.id === productId);
  if (!existing) {
    return;
  }

  existing.quantity += delta;
  if (existing.quantity <= 0) {
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
  updateProductCard(productId);
}

function renderCart() {
  const count = cartCountValue();
  cartCount.textContent = count;
  cartButton.classList.toggle("is-visible", count > 0);
  cartTotal.textContent = formatPrice(cartKnownTotal());
  cartEmpty.hidden = cart.length > 0;
  priceNote.hidden = !hasUnknownPrices();

  cartItems.innerHTML = cart.map((item) => `
    <article class="cart-item">
      ${item.image
        ? `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" onerror="this.replaceWith(Object.assign(document.createElement('div'), { className: 'cart-item__placeholder', textContent: 'Фото' }))">`
        : `<div class="cart-item__placeholder">Фото</div>`}
      <div>
        <p class="cart-item__name">${escapeHtml(item.name)}</p>
        <p class="cart-item__meta">${escapeHtml(displayPrice(item))} · ${statusLabel(item.status)}</p>
        <p class="cart-item__sum">${item.price ? `Сумма: ${formatPrice(item.price * item.quantity)}` : "Цена уточняется"}</p>
        <div class="cart-item__controls">
          <button type="button" data-cart-action="decrease" data-id="${escapeHtml(item.id)}" aria-label="Уменьшить">−</button>
          <span>${item.quantity}</span>
          <button type="button" data-cart-action="increase" data-id="${escapeHtml(item.id)}" aria-label="Увеличить">+</button>
          <button type="button" data-cart-action="remove" data-id="${escapeHtml(item.id)}">Удалить</button>
        </div>
      </div>
    </article>
  `).join("");
}

function openCart() {
  if (!cart.length) {
    return;
  }

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

function selectedPaymentType() {
  return new FormData(orderForm).get("paymentType") || "Картой";
}

function selectedDeliveryType() {
  return new FormData(orderForm).get("deliveryType") || "Доставка";
}

function updatePaymentFields() {
  const isCash = selectedPaymentType() === "Наличными";
  cashChangeWrap.hidden = !isCash;
  cashChange.disabled = !isCash;
  if (!isCash) {
    cashChange.value = "";
  }
}

function updateCommentLabel() {
  commentLabel.textContent = selectedDeliveryType() === "Доставка"
    ? "Адрес доставки или комментарий"
    : "Комментарий к самовывозу";
}

function validateOrder() {
  if (!cart.length) {
    return "Добавьте хотя бы одну позицию.";
  }

  if (selectedDeliveryType() === "Доставка" && !normalize(customerComment.value)) {
    return "Укажите адрес доставки.";
  }

  return "";
}

function buildOrderMessage() {
  const lines = cart.map((item, index) => {
    const price = item.price
      ? `${item.quantity} шт × ${displayPrice(item)} = ${formatPrice(item.quantity * item.price)}`
      : `${item.quantity} шт · цена уточняется`;

    return `${index + 1}. ${item.name} (${statusLabel(item.status)}) - ${price}`;
  });
  const payment = selectedPaymentType();
  const changeText = payment === "Наличными" && normalize(cashChange.value)
    ? `, ${normalize(cashChange.value)}`
    : "";

  return [
    "Здравствуйте! Хочу сделать заказ AMINKA.PRO:",
    ...lines,
    `Итого по известным ценам: ${formatPrice(cartKnownTotal())}`,
    hasUnknownPrices() ? "Есть позиции, цену которых нужно уточнить." : "",
    "",
    `Имя: ${normalize(customerName.value) || "не указано"}`,
    `Получение: ${selectedDeliveryType()}`,
    `Время: ${deliveryTime.value}`,
    `Оплата: ${payment}${changeText}`,
    `Адрес/комментарий: ${normalize(customerComment.value) || "нет"}`,
    selectedDeliveryType() === "Доставка" ? "Доставка оплачивается по тарифам такси." : ""
  ].filter(Boolean).join("\n");
}

function sendOrder(event) {
  event.preventDefault();
  const error = validateOrder();

  if (error) {
    formMessage.textContent = error;
    return;
  }

  formMessage.textContent = "";
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildOrderMessage())}`, "_blank", "noopener");
}

function setActiveCategory(categoryId) {
  document.querySelectorAll(".category-tab").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.category === categoryId);
  });
}

categoryTabs.addEventListener("click", (event) => {
  const button = event.target.closest(".category-tab");
  if (!button) {
    return;
  }

  const target = document.querySelector(button.dataset.target);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  setActiveCategory(button.dataset.category);
});

catalog.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) {
    return;
  }

  if (button.dataset.action === "add") {
    addToCart(button.dataset.id);
  }

  if (button.dataset.action === "decrease") {
    changeQuantity(button.dataset.id, -1);
  }
});

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("[data-cart-action]");
  if (!button) {
    return;
  }

  if (button.dataset.cartAction === "increase") {
    addToCart(button.dataset.id);
  }

  if (button.dataset.cartAction === "decrease") {
    changeQuantity(button.dataset.id, -1);
  }

  if (button.dataset.cartAction === "remove") {
    removeFromCart(button.dataset.id);
  }
});

cartButton.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartDrawer);
cartOverlay.addEventListener("click", closeCartDrawer);
orderForm.addEventListener("submit", sendOrder);
orderForm.addEventListener("change", () => {
  updatePaymentFields();
  updateCommentLabel();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCartDrawer();
  }
});

async function init() {
  await loadCatalog();
  cart = loadCart();
  saveCart();
  renderCategories();
  renderCatalog();
  renderCart();
  updatePaymentFields();
  updateCommentLabel();
  setActiveCategory("all");
}

init();
