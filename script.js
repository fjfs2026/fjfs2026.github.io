const WHATSAPP_NUMBER = "79280893233";
const CART_STORAGE_KEY = "aminka-cart-v3";
const CATALOG_CACHE_KEY = "aminka-catalog-cache-v1";
const CATALOG_REFRESH_INTERVAL = 10 * 60 * 1000;
const PUBLIC_CATALOG_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvME1oYerxh0AxmPC03dYrQOXAXljckYbyT4eHninXeWrubMAYNetpenKLuUYcszXLc_jeQFuI8HuT/pub?gid=0&single=true&output=csv";
const CATALOG_CSV_URL = (window.CATALOG_CSV_URL || PUBLIC_CATALOG_CSV_URL).trim();
const CATALOG_STYLE = new URLSearchParams(window.location.search).get("catalog") || "glass";

if (CATALOG_STYLE !== "classic") {
  document.documentElement.classList.add("catalog-glass");
}

const CATEGORY_ORDER = [
  { id: "all", name: "Все" },
  { id: "available", name: "В наличии" },
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

const NAME_HEADERS = ["название", "товар", "блюдо", "name", "title", "item", "product"];
const CATEGORY_HEADERS = ["категория", "раздел", "category", "section"];
const STATUS_HEADERS = ["статус", "наличие", "status", "availability"];
const DESCRIPTION_HEADERS = ["описание", "состав", "description"];
const PRICE_HEADERS = ["цена", "price"];
const HALF_PRICE_HEADERS = ["цена 1/2", "цена половины", "половина", "1/2", "half price"];
const DISCOUNT_HEADERS = ["цена со скидкой", "скидка", "акционная цена", "цена скидка", "discount price", "sale price"];
const CATALOG_HEADER_KEYS = new Set([
  ...NAME_HEADERS,
  ...CATEGORY_HEADERS,
  ...STATUS_HEADERS,
  ...DESCRIPTION_HEADERS,
  ...PRICE_HEADERS,
  ...HALF_PRICE_HEADERS,
  ...DISCOUNT_HEADERS
]);

const CAKE_VARIANTS = {
  medovik: [
    { id: "half", name: "1/2", price: 800 },
    { id: "whole", name: "Целый", price: 1500 }
  ],
  "nut-cake": [
    { id: "half", name: "1/2", price: 700 },
    { id: "whole", name: "Целый", price: 1300 }
  ],
  "liver-cake": [
    { id: "half", name: "1/2", price: 850 },
    { id: "whole", name: "Целый", price: 1600 }
  ]
};

const BASE_PRODUCTS = [
  product("bliny", "Блины 1 шт", 44, "44 ₽", "extra", "preorder", "images/Блины 1шт 45р.webp", "", 45, "45 ₽"),
  product("vareniki-potato", "Вареники с картошкой", 320, "320 ₽", "hot", "in", "images/Вареники с картошкой 320.webp"),
  product("vareniki-tvorog", "Вареники с творогом", 400, "400 ₽", "hot", "preorder", "images/Вареники с творогом 400.webp"),
  product("galushki", "Галушки", 220, "220 ₽", "hot", "preorder", "images/Галушки 220р.webp"),
  product("golubtsy", "Голубцы 10 шт", 555, "555 ₽", "hot", "preorder", "images/Голубцы 10шт 1000р.webp", "", 1000, "1000 ₽"),
  product("zazharka", "Зажарка", 190, "190 ₽", "extra", "preorder", "images/Зажарка 190.webp"),
  product("manty-squares", "Квадратики на манты 50 шт", 300, "300 ₽", "semi", "preorder", "images/Квадратики на манты 50шт 300р.webp"),
  product("kiev-cutlets", "Котлеты по-киевски 5 шт", 700, "700 ₽", "meat", "preorder", "images/Котлеты по - киевски 5шт 700р.webp"),
  product("chicken-cutlets", "Куриные котлеты 10 шт", 850, "850 ₽", "meat", "preorder", "images/Куриные котлеты 10шт 850.webp"),
  product("chicken-chops", "Куриные отбивные 5 шт", 600, "600 ₽", "meat", "preorder", "images/Куриные отбивные 5шт 600р.webp"),
  product("manty", "Манты", 450, "450 ₽", "hot", "in", "images/Манты 450.webp"),
  product("medovik", "Медовик", 1500, "1500 ₽ / 750 ₽", "desserts", "preorder", "images/Медовик 1500 750.webp"),
  product("meat-cutlets", "Мясные котлеты 10 шт", 750, "750 ₽", "meat", "preorder", "images/Мясные котлеты 10шт 850.webp", "", 850, "850 ₽"),
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
let lastCatalogSyncAt = 0;
let catalogRefreshTimer = 0;
let activeCategoryId = "";
let selectedCategoryFilter = "all";
const selectedVariants = new Map();

function product(id, name, price, priceText, category, status, image, description = "", oldPrice = 0, oldPriceText = "") {
  return {
    id,
    name,
    price,
    priceText,
    category,
    status,
    image,
    description,
    oldPrice,
    oldPriceText,
    variants: CAKE_VARIANTS[id] || []
  };
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

function parsePriceNumber(value) {
  const compact = normalize(value).replace(/\s+/g, "");
  const match = compact.match(/\d+(?:[,.]\d+)?/);
  return match ? Number(match[0].replace(",", ".")) : 0;
}

function normalizePriceText(value, fallbackPrice = 0) {
  const text = normalize(value);

  if (!text) {
    return fallbackPrice ? formatPrice(fallbackPrice) : "уточнить";
  }

  if (/уточ/i.test(text) || /₽/.test(text)) {
    return text;
  }

  if (/^\d+(?:[.,]\d+)?$/.test(text.replace(/\s+/g, ""))) {
    return formatPrice(parsePriceNumber(text));
  }

  return text;
}

function descriptionFromText(value, fallback = "") {
  const text = normalize(value);

  return text || fallback;
}

function priceFromCells(priceCell, discountCell, base = {}) {
  const regularText = normalize(priceCell);
  const discountText = normalize(discountCell);
  const regularPrice = regularText ? parsePriceNumber(regularText) : (base.price || 0);
  const regularPriceText = regularText
    ? normalizePriceText(regularText, regularPrice)
    : (base.priceText || (regularPrice ? formatPrice(regularPrice) : "уточнить"));

  if (discountText) {
    const discountPrice = parsePriceNumber(discountText);

    return {
      price: discountPrice,
      priceText: normalizePriceText(discountText, discountPrice),
      oldPrice: regularPrice,
      oldPriceText: regularPriceText
    };
  }

  return {
    price: regularPrice,
    priceText: regularPriceText,
    oldPrice: 0,
    oldPriceText: ""
  };
}

function variantsFromPrices(baseVariants, wholePrice, halfPriceCell) {
  if (!baseVariants?.length && !normalize(halfPriceCell)) {
    return [];
  }

  const existingWhole = baseVariants?.find((variant) => variant.id === "whole");
  const existingHalf = baseVariants?.find((variant) => variant.id === "half");
  const halfPrice = normalize(halfPriceCell)
    ? parsePriceNumber(halfPriceCell)
    : (existingHalf?.price || 0);

  return [
    { id: "half", name: "1/2", price: halfPrice },
    { id: "whole", name: "Целый", price: wholePrice || existingWhole?.price || 0 }
  ].filter((variant) => variant.price > 0);
}

function statusFromText(value) {
  const text = normalizeKey(value);

  if (text.includes("нет") || text.includes("out") || text.includes("none")) {
    return "out";
  }

  if (text.includes("есть") || text.includes("налич") || text.includes("available") || text.includes("in stock")) {
    return "in";
  }

  if (text.includes("preorder") || text.includes("order")) {
    return "preorder";
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

  const compactRows = rows.filter((items) => items.some((item) => normalize(item)));
  const headerIndex = compactRows.findIndex((items) => items.some((item) => CATALOG_HEADER_KEYS.has(normalizeKey(item))));
  const headers = headerIndex >= 0 ? compactRows[headerIndex] : (compactRows[0] || []);
  const dataRows = compactRows.slice(headerIndex >= 0 ? headerIndex + 1 : 1);

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

function loadCachedSheetData() {
  try {
    const saved = JSON.parse(localStorage.getItem(CATALOG_CACHE_KEY) || "null");

    if (Array.isArray(saved)) {
      return { rows: saved, updatedAt: 0 };
    }

    if (saved && Array.isArray(saved.rows)) {
      return {
        rows: saved.rows,
        updatedAt: Number(saved.updatedAt) || 0
      };
    }
  } catch {
    // The embedded Google Sheets snapshot is used when storage is unavailable.
  }

  return { rows: [], updatedAt: 0 };
}

function cacheSheetRows(rows, updatedAt) {
  try {
    localStorage.setItem(CATALOG_CACHE_KEY, JSON.stringify({ rows, updatedAt }));
  } catch {
    // The embedded Google Sheets snapshot still keeps the menu available.
  }
}

function rowValue(row, names) {
  const key = Object.keys(row).find((item) => names.includes(normalizeKey(item)));
  return key ? row[key] : "";
}

function productsFromRows(rows) {
  const byName = new Map(BASE_PRODUCTS.map((item) => [normalizeKey(item.name), item]));

  return rows.map((row, index) => {
    const name = rowValue(row, NAME_HEADERS);
    if (!name) {
      return null;
    }

    const base = byName.get(normalizeKey(name));
    const categoryText = rowValue(row, CATEGORY_HEADERS);
    const statusText = rowValue(row, STATUS_HEADERS);
    const descriptionText = rowValue(row, DESCRIPTION_HEADERS);
    const priceText = rowValue(row, PRICE_HEADERS);
    const halfPriceText = rowValue(row, HALF_PRICE_HEADERS);
    const discountText = rowValue(row, DISCOUNT_HEADERS);
    const priceData = priceFromCells(priceText, discountText, base || {});
    const description = descriptionFromText(descriptionText, base?.description || "");

    if (base) {
      return {
        ...base,
        ...priceData,
        description,
        category: categoryIdFromText(categoryText, base.category),
        status: statusFromText(statusText || statusLabel(base.status)),
        variants: variantsFromPrices(base.variants, priceData.price, halfPriceText)
      };
    }

    return {
      id: "sheet-" + index,
      name,
      ...priceData,
      description,
      category: categoryIdFromText(categoryText, "extra"),
      status: statusFromText(statusText),
      image: "",
      variants: variantsFromPrices([], priceData.price, halfPriceText)
    };
  }).filter(Boolean);
}

async function loadCatalog() {
  const previousCatalog = JSON.stringify(products);

  try {
    const rows = await loadSheetRows();
    const sheetProducts = productsFromRows(rows);
    lastCatalogSyncAt = Date.now();

    if (sheetProducts.length) {
      products = sheetProducts;
      cacheSheetRows(rows, lastCatalogSyncAt);
    }
  } catch (error) {
    console.warn(error);
  }

  categories = buildCategories(products);
  return previousCatalog !== JSON.stringify(products);
}

function buildCategories(items) {
  const result = [CATEGORY_ORDER[0]];
  const used = new Set(["all"]);

  CATEGORY_ORDER.slice(1).forEach((category) => {
    const hasItems = category.id === "available"
      ? items.some((item) => item.status === "in")
      : items.some((item) => item.category === category.id);

    if (hasItems) {
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

function selectedVariant(item) {
  if (!item.variants?.length) {
    return null;
  }

  const selectedId = selectedVariants.get(item.id) || item.variants[0].id;
  return item.variants.find((variant) => variant.id === selectedId) || item.variants[0];
}

function cartItemId(productId, variantId = "") {
  return variantId ? `${productId}::${variantId}` : productId;
}

function purchasableItem(productId, variantId = "") {
  const item = products.find((productItem) => productItem.id === productId);
  if (!item) {
    return null;
  }

  const variant = item.variants?.length
    ? item.variants.find((option) => option.id === variantId) || selectedVariant(item)
    : null;

  if (!variant) {
    return { ...item, productId: item.id, variantId: "", variantName: "" };
  }

  return {
    ...item,
    id: cartItemId(item.id, variant.id),
    productId: item.id,
    variantId: variant.id,
    variantName: variant.name,
    name: `${item.name} — ${variant.name}`,
    price: variant.price,
    priceText: formatPrice(variant.price),
    oldPrice: 0,
    oldPriceText: ""
  };
}

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");

    if (!Array.isArray(saved)) {
      return [];
    }

    return saved.map((savedItem) => {
      const legacyParts = normalize(savedItem.id).split("::");
      const productId = savedItem.productId || legacyParts[0];
      const variantId = savedItem.variantId || legacyParts[1] || "";
      const item = purchasableItem(productId, variantId);
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
    productId: item.productId || item.id,
    variantId: item.variantId || "",
    quantity: item.quantity
  }))));
}

function cartQuantity(productId, variantId = "") {
  return cart.find((item) => item.id === cartItemId(productId, variantId))?.quantity || 0;
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

function renderPrice(item) {
  if (item.oldPriceText) {
    return `
      <span class="product-card__price">
        <span class="product-card__old-price">${escapeHtml(item.oldPriceText)}</span>
        <span class="product-card__sale-price">${escapeHtml(displayPrice(item))}</span>
      </span>
    `;
  }

  return `<span class="product-card__price">${escapeHtml(displayPrice(item))}</span>`;
}

function renderCategories() {
  categoryTabs.innerHTML = categories.map((category) => {
    const target = category.id === "all" ? "#menu" : "#category-" + category.id;
    return `<button class="category-tab" type="button" data-category="${escapeHtml(category.id)}" data-target="${escapeHtml(target)}">${escapeHtml(category.name)}</button>`;
  }).join("");
}

function renderCatalog() {
  catalog.innerHTML = categories.filter((category) => category.id !== "all").map((category) => {
    const categoryProducts = category.id === "available"
      ? products.filter((item) => item.status === "in")
      : products.filter((item) => item.category === category.id);

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

function renderProductControl(item, variant = selectedVariant(item)) {
  const displayItem = variant ? purchasableItem(item.id, variant.id) : item;
  const quantity = cartQuantity(item.id, variant?.id || "");

  if (item.status === "out") {
    return `<button class="round-action" type="button" disabled aria-label="Нет в наличии">×</button>`;
  }

  if (quantity) {
    return `
      <div class="quantity-control" aria-label="Количество">
        <button type="button" data-action="decrease" data-cart-id="${escapeHtml(displayItem.id)}" data-product-id="${escapeHtml(item.id)}" aria-label="Уменьшить">−</button>
        <span>${quantity}</span>
        <button type="button" data-action="add" data-product-id="${escapeHtml(item.id)}" data-variant-id="${escapeHtml(variant?.id || "")}" aria-label="Увеличить">+</button>
      </div>
    `;
  }

  return `<button class="round-action" type="button" data-action="add" data-product-id="${escapeHtml(item.id)}" data-variant-id="${escapeHtml(variant?.id || "")}" aria-label="Добавить">+</button>`;
}

function renderProductCard(item) {
  const variant = selectedVariant(item);
  const displayItem = variant ? purchasableItem(item.id, variant.id) : item;
  const unavailable = item.status === "out";
  const description = normalize(item.description)
    ? `<p class="product-card__description">${escapeHtml(item.description)}</p>`
    : "";
  const variantControl = item.variants?.length
    ? `
      <div class="product-card__variant-wrap" aria-label="Выберите размер ${escapeHtml(item.name)}">
        <span>Размер</span>
        <div class="product-card__variant-buttons">
          ${item.variants.map((option) => `
            <button
              class="product-card__variant-button ${option.id === variant?.id ? "is-active" : ""}"
              type="button"
              data-action="variant"
              data-product-id="${escapeHtml(item.id)}"
              data-variant-id="${escapeHtml(option.id)}"
              aria-pressed="${option.id === variant?.id ? "true" : "false"}"
            >
              <span>${escapeHtml(option.name)}</span>
              <strong>${escapeHtml(formatPrice(option.price))}</strong>
            </button>
          `).join("")}
        </div>
      </div>
    `
    : "";
  const media = item.image
    ? `<img class="product-card__image" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" loading="lazy" width="720" height="720" onerror="showImagePlaceholder(this)">`
    : `<div class="product-card__placeholder">Фото добавим позже</div>`;

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
        <p class="product-card__eyebrow">Домашняя кухня</p>
        <h4>${escapeHtml(item.name)}</h4>
        ${variantControl}
        <div class="product-card__bottom">
          <span class="product-card__price-slot">${renderPrice(displayItem)}</span>
          ${description}
          <span class="product-card__control">${renderProductControl(item, variant)}</span>
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

  const variant = selectedVariant(item);
  const displayItem = variant ? purchasableItem(item.id, variant.id) : item;

  document.querySelectorAll(".product-card").forEach((card) => {
    if (card.dataset.productId !== productId) {
      return;
    }

    const priceSlot = card.querySelector(".product-card__price-slot");
    const controlSlot = card.querySelector(".product-card__control");

    if (priceSlot) {
      priceSlot.innerHTML = renderPrice(displayItem);
    }

    if (controlSlot) {
      controlSlot.innerHTML = renderProductControl(item, variant);
    }

    card.querySelectorAll(".product-card__variant-button").forEach((button) => {
      const active = button.dataset.variantId === variant?.id;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  });
}

function addToCart(productId, variantId = "") {
  const item = purchasableItem(productId, variantId);
  if (!item || item.status === "out") {
    return;
  }

  const existing = cart.find((cartItem) => cartItem.id === item.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  syncCart(item.productId || productId);
}

function changeQuantity(cartId, delta) {
  const existing = cart.find((item) => item.id === cartId);
  if (!existing) {
    return;
  }

  const productId = existing.productId || existing.id;
  existing.quantity += delta;
  if (existing.quantity <= 0) {
    cart = cart.filter((item) => item.id !== cartId);
  }

  syncCart(productId);
}

function removeFromCart(cartId) {
  const existing = cart.find((item) => item.id === cartId);
  cart = cart.filter((item) => item.id !== cartId);
  syncCart(existing?.productId || cartId);
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
  return new FormData(orderForm).get("paymentType") || "";
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

  if (!selectedPaymentType()) {
    return "Выберите оплату картой или наличными.";
  }

  return "";
}

function buildOrderMessage() {
  const lines = cart.map((item, index) => {
    const itemPrice = item.oldPriceText
      ? `${item.oldPriceText} -> ${displayPrice(item)}`
      : displayPrice(item);
    const price = item.price
      ? `${item.quantity} шт × ${itemPrice} = ${formatPrice(item.quantity * item.price)}`
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

function revealCategoryTab(button, behavior = "smooth") {
  if (!button) {
    return;
  }

  const targetLeft = button.offsetLeft - ((categoryTabs.clientWidth - button.offsetWidth) / 2);
  const maxLeft = Math.max(0, categoryTabs.scrollWidth - categoryTabs.clientWidth);
  const left = Math.max(0, Math.min(maxLeft, targetLeft));

  if (Math.abs(categoryTabs.scrollLeft - left) > 4) {
    categoryTabs.scrollTo({ left, behavior });
  }
}

function setActiveCategory(categoryId, behavior = "smooth") {
  let activeButton = null;

  document.querySelectorAll(".category-tab").forEach((button) => {
    const isActive = button.dataset.category === categoryId;
    button.classList.toggle("is-active", isActive);
    if (isActive) {
      activeButton = button;
    }
  });

  if (activeCategoryId !== categoryId) {
    activeCategoryId = categoryId;
    revealCategoryTab(activeButton, behavior);
  }
}

function applyCategoryFilter(categoryId, behavior = "smooth") {
  selectedCategoryFilter = categoryId;

  catalog.querySelectorAll(".category-section").forEach((section) => {
    section.hidden = categoryId !== "all" && section.dataset.category !== categoryId;
  });

  setActiveCategory(categoryId, behavior);
}

categoryTabs.addEventListener("click", (event) => {
  const button = event.target.closest(".category-tab");
  if (!button) {
    return;
  }

  applyCategoryFilter(button.dataset.category);
  document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth", block: "start" });
});

catalog.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) {
    return;
  }

  if (button.dataset.action === "add") {
    addToCart(button.dataset.productId, button.dataset.variantId || "");
  }

  if (button.dataset.action === "decrease") {
    changeQuantity(button.dataset.cartId, -1);
  }

  if (button.dataset.action === "variant") {
    selectedVariants.set(button.dataset.productId, button.dataset.variantId);
    updateProductCard(button.dataset.productId);
  }
});

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("[data-cart-action]");
  if (!button) {
    return;
  }

  if (button.dataset.cartAction === "increase") {
    changeQuantity(button.dataset.id, 1);
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

function renderApp() {
  categories = buildCategories(products);
  cart = loadCart();
  saveCart();
  renderCategories();
  renderCatalog();
  renderCart();
  updatePaymentFields();
  updateCommentLabel();
  activeCategoryId = "";
  applyCategoryFilter(selectedCategoryFilter, "auto");
}

async function refreshCatalog() {
  const catalogChanged = await loadCatalog();
  if (catalogChanged) {
    renderApp();
  }

  scheduleCatalogRefresh();
}

function scheduleCatalogRefresh() {
  window.clearTimeout(catalogRefreshTimer);
  const elapsed = Date.now() - lastCatalogSyncAt;
  const delay = Math.max(0, CATALOG_REFRESH_INTERVAL - elapsed);
  catalogRefreshTimer = window.setTimeout(refreshCatalog, delay);
}

function init() {
  const cached = loadCachedSheetData();
  const snapshotRows = parseCsv(window.CATALOG_SNAPSHOT_CSV || "");
  const snapshotUpdatedAt = Number(window.CATALOG_SNAPSHOT_UPDATED_AT) || 0;
  const useCachedRows = cached.rows.length
    && (!snapshotRows.length || cached.updatedAt >= snapshotUpdatedAt);
  const initialRows = useCachedRows ? cached.rows : snapshotRows;
  const rememberedProducts = productsFromRows(initialRows);

  if (rememberedProducts.length) {
    products = rememberedProducts;
  }

  lastCatalogSyncAt = useCachedRows ? cached.updatedAt : snapshotUpdatedAt;

  if (!useCachedRows && snapshotRows.length) {
    cacheSheetRows(snapshotRows, snapshotUpdatedAt);
  }

  renderApp();
  scheduleCatalogRefresh();
}

init();
