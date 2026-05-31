import {
  deleteProduct,
  getProducts,
  getTrendingProducts,
  isAdminLoggedIn,
  loginAdmin,
  logoutAdmin,
  resetProducts,
  saveProduct,
  trackProductClick
} from "./firebase-service.js?v=8";

const phoneNumber = "919804626641";
const fallbackImage = "assets/monadar-kitchen-hero.png";
const languageKey = "monadar-henshel-language";

const translations = {
  bn: {
    navHome: "হোম",
    navMenu: "আজকের মেনু",
    navEvents: "অনুষ্ঠানের অর্ডার",
    navLocation: "ঠিকানা",
    navAdmin: "Admin",
    orderNow: "Order Now",
    seeMenu: "আজকের মেনু দেখুন",
    eventOrderCta: "অনুষ্ঠানের অর্ডার",
    tagline: "ঘরের স্বাদ, যত্নের রান্না",
    heroKicker: "কলকাতায় ঘরোয়া বাঙালি রান্না",
    heroCopy:
      "দই কাতলা, সর্ষে ইলিশ, চিকেন কষা, আলু পোস্ত, ছোলার ডাল, রুটি আর আরও অনেক বাঙালি পদ তৈরি হয় বেছে নেওয়া দিনের মেনু অনুযায়ী।",
    showcaseKicker: "রাজবাড়ির রঙে ঘরের রান্না",
    showcaseTitle: "সোনালি হলুদ, সবুজ আর বাঙালি স্বাদের এক আলাদা আমেজ।",
    featureOneTitle: "আজকের নির্বাচিত পদ",
    featureOneCopy: "প্রতিদিন সব পদ নয়, শুধুমাত্র যে পদগুলি পাওয়া যাবে সেগুলিই মেনুতে দেখানো হবে।",
    featureTwoTitle: "ভেজ ও নন-ভেজ আলাদা",
    featureTwoCopy: "মেনুতে ভেজ, নন-ভেজ ও দু'রকমভাবেই পাওয়া যায় এমন পদ সহজে আলাদা করা যায়।",
    featureThreeTitle: "WhatsApp-এ সরাসরি অর্ডার",
    featureThreeCopy: "পদ আর পরিমাণ লিখে WhatsApp খুলবে, দাম ও availability জেনে অর্ডার নিশ্চিত করুন।",
    worksKicker: "কীভাবে অর্ডার করবেন",
    worksTitle: "তিন ধাপে আপনার পছন্দের রান্না।",
    stepOneTitle: "মেনু দেখুন",
    stepOneCopy: "Admin থেকে enabled করা পদগুলিই আজকের মেনুতে থাকবে।",
    stepTwoTitle: "পরিমাণ বাছুন",
    stepTwoCopy: "প্রতিটি কার্ডে quantity দিয়ে Order Now চাপুন।",
    stepThreeTitle: "WhatsApp-এ নিশ্চিত করুন",
    stepThreeCopy: "মেসেজে পদ, quantity ও দাম জানার অনুরোধ থাকবে।",
    eventsKicker: "ছোট অনুষ্ঠানের অর্ডার",
    eventsTitle: "নির্দিষ্ট পদের জন্য আগে থেকে অর্ডার দিন।",
    eventsCopy:
      "ছোট গেট-টুগেদার, পারিবারিক অনুষ্ঠান বা অফিস লাঞ্চের জন্য নির্দিষ্ট রান্নার অর্ডার নেওয়া হয়। আমরা catering service দিই না; শুধু অর্ডার করা খাবার রান্না করা হবে এবং customer আমাদের outlet থেকে সংগ্রহ করবেন।",
    eventFoods: "কোন কোন খাবার চান",
    eventDate: "তারিখ",
    eventHeads: "কতজনের জন্য",
    eventPriority: "আপনার priority",
    sendEventOrder: "WhatsApp-এ পাঠান",
    proofKicker: "লোকাল বিশ্বাস",
    proofTitle: "যে স্বাদে আবার অর্ডার আসে।",
    reviewOne: '"চিকেন কষার মশলা আর ঘরোয়া স্বাদ দুটোই দারুণ ছিল।"',
    reviewTwo: '"সর্ষে মাছের ঝাঁজ ঠিকঠাক, আর WhatsApp-এ অর্ডার করা খুব সহজ।"',
    reviewThree: '"আলু পোস্ত আর ছোলার ডাল খুব ভালো, ভেজ পদগুলিও যত্ন করে বানানো।"',
    locationKicker: "আমাদের ঠিকানা",
    locationTitle: "নিকটবর্তী এলাকা থেকে অর্ডার করুন",
    menuKicker: "আজকের মেনু",
    menuTitle: "যে পদগুলি আজ পাওয়া যাচ্ছে",
    menuCopy:
      "পরিমাণ লিখে Order Now চাপুন। WhatsApp মেসেজে পদ, quantity এবং দাম জানার অনুরোধ থাকবে।",
    filterAll: "সব",
    filterVeg: "ভেজ",
    filterNonVeg: "নন-ভেজ",
    filterBoth: "দু'রকম",
    quantity: "পরিমাণ",
    benefit: "উপকারিতা",
    emptyMenu: "এই category-তে আজ কোনও পদ enabled নেই।"
  },
  en: {
    navHome: "Home",
    navMenu: "Today's Menu",
    navEvents: "Event Orders",
    navLocation: "Location",
    navAdmin: "Admin",
    orderNow: "Order Now",
    seeMenu: "See Today's Menu",
    eventOrderCta: "Event Order",
    tagline: "Bengal's Comfort, Cooked Fresh",
    heroKicker: "Home-cooked Bengali food in Kolkata",
    heroCopy:
      "Dahi Katla, Sarshe Iilish, Chicken Kasha, Alu Posto, Chholar Dal, Roti, and more Bengali dishes are listed based on today's selected menu.",
    showcaseKicker: "Home cooking with a Rajbari palette",
    showcaseTitle: "Golden yellow, deep green, and a proudly Bengali dining mood.",
    featureOneTitle: "Selected dishes today",
    featureOneCopy: "Not every dish is made every day. Only available items appear on the menu.",
    featureTwoTitle: "Veg and non-veg separated",
    featureTwoCopy: "Browse veg, non-veg, and items available in both styles.",
    featureThreeTitle: "WhatsApp-first ordering",
    featureThreeCopy: "Choose dish and quantity, then ask for price and availability on WhatsApp.",
    worksKicker: "How it works",
    worksTitle: "Three steps to your Bengali meal.",
    stepOneTitle: "Browse menu",
    stepOneCopy: "Only admin-enabled products appear in today's menu.",
    stepTwoTitle: "Choose quantity",
    stepTwoCopy: "Set quantity in the product card and tap Order Now.",
    stepThreeTitle: "Confirm on WhatsApp",
    stepThreeCopy: "The message includes the dish, quantity, and a price request.",
    eventsKicker: "Small event orders",
    eventsTitle: "Pre-order specific dishes for small gatherings.",
    eventsCopy:
      "We take specific food orders for family gatherings, office lunches, and small events. We do not provide catering services; only the ordered food will be cooked and the customer will collect it from our outlet.",
    eventFoods: "Foods required",
    eventDate: "Date",
    eventHeads: "Number of heads",
    eventPriority: "Your priority",
    sendEventOrder: "Send on WhatsApp",
    proofKicker: "Local trust",
    proofTitle: "Food that brings repeat orders.",
    reviewOne: '"The Chicken Kasha had wonderful home-style depth."',
    reviewTwo: '"The mustard fish was sharp, fresh, and easy to order on WhatsApp."',
    reviewThree: '"Alu Posto and Chholar Dal were made with real care."',
    locationKicker: "Store location",
    locationTitle: "Order from nearby areas.",
    menuKicker: "Today's Menu",
    menuTitle: "Available dishes today",
    menuCopy:
      "Enter quantity and tap Order Now. The WhatsApp message includes dish, quantity, and a price request.",
    filterAll: "All",
    filterVeg: "Veg",
    filterNonVeg: "Non-Veg",
    filterBoth: "Both",
    quantity: "Quantity",
    benefit: "Benefit",
    emptyMenu: "No items are enabled in this category today."
  },
  hi: {
    navHome: "होम",
    navMenu: "आज का मेनू",
    navEvents: "इवेंट ऑर्डर",
    navLocation: "पता",
    navAdmin: "Admin",
    orderNow: "Order Now",
    seeMenu: "आज का मेनू देखें",
    eventOrderCta: "इवेंट ऑर्डर",
    tagline: "घर का स्वाद, प्यार से पका",
    heroKicker: "कोलकाता में घर जैसा बंगाली खाना",
    heroCopy:
      "दही कतला, सरसों इलिश, चिकन कशा, आलू पोस्तो, छोलार दाल, रोटी और कई बंगाली व्यंजन आज के चुने हुए मेनू के अनुसार मिलेंगे।",
    showcaseKicker: "राजबाड़ी रंगों में घर का खाना",
    showcaseTitle: "सुनहरा पीला, गहरा हरा और बंगाली स्वाद का खास माहौल।",
    featureOneTitle: "आज के चुने हुए व्यंजन",
    featureOneCopy: "हर दिन सभी व्यंजन नहीं बनते। जो उपलब्ध हैं वही मेनू में दिखेंगे।",
    featureTwoTitle: "Veg और Non-Veg अलग",
    featureTwoCopy: "Veg, Non-Veg और दोनों तरह से उपलब्ध व्यंजन आसानी से देखें।",
    featureThreeTitle: "WhatsApp पर सीधा ऑर्डर",
    featureThreeCopy: "डिश और मात्रा चुनकर WhatsApp पर price और availability पूछें।",
    worksKicker: "ऑर्डर कैसे करें",
    worksTitle: "तीन चरणों में आपका बंगाली भोजन।",
    stepOneTitle: "मेनू देखें",
    stepOneCopy: "Admin द्वारा enabled आइटम ही आज के मेनू में दिखेंगे।",
    stepTwoTitle: "मात्रा चुनें",
    stepTwoCopy: "कार्ड में quantity सेट करके Order Now दबाएं।",
    stepThreeTitle: "WhatsApp पर confirm करें",
    stepThreeCopy: "मैसेज में dish, quantity और price request रहेगा।",
    eventsKicker: "छोटे इवेंट के ऑर्डर",
    eventsTitle: "छोटी gatherings के लिए खास dishes pre-order करें।",
    eventsCopy:
      "हम परिवार, ऑफिस लंच और छोटे इवेंट के लिए specific food orders लेते हैं। हम catering service नहीं देते; केवल order किया हुआ खाना पकाया जाएगा और customer हमारे outlet से collect करेंगे।",
    eventFoods: "कौन से foods चाहिए",
    eventDate: "तारीख",
    eventHeads: "कितने लोगों के लिए",
    eventPriority: "आपकी priority",
    sendEventOrder: "WhatsApp पर भेजें",
    proofKicker: "स्थानीय भरोसा",
    proofTitle: "ऐसा स्वाद जिससे repeat orders आते हैं।",
    reviewOne: '"Chicken Kasha में घर जैसा गहरा स्वाद था।"',
    reviewTwo: '"Mustard fish fresh था और WhatsApp order आसान था।"',
    reviewThree: '"Alu Posto और Chholar Dal बहुत care से बने थे।"',
    locationKicker: "हमारा पता",
    locationTitle: "नज़दीकी इलाकों से order करें।",
    menuKicker: "आज का मेनू",
    menuTitle: "आज उपलब्ध dishes",
    menuCopy:
      "Quantity डालकर Order Now दबाएं। WhatsApp message में dish, quantity और price request रहेगा।",
    filterAll: "सब",
    filterVeg: "Veg",
    filterNonVeg: "Non-Veg",
    filterBoth: "दोनों",
    quantity: "Quantity",
    benefit: "लाभ",
    emptyMenu: "इस category में आज कोई item enabled नहीं है।"
  }
};

const page = document.body.dataset.page;
let products = [];
let activeFilter = "all";
let currentLanguage = page === "admin" ? "en" : localStorage.getItem(languageKey) || "bn";
let cropImage = null;

function t(key) {
  return translations[currentLanguage]?.[key] || translations.bn[key] || key;
}

function productText(product, field) {
  const suffix = currentLanguage === "hi" ? "Hi" : currentLanguage === "en" ? "En" : "Bn";
  return product[`${field}${suffix}`] || product[`${field}Bn`] || product[`${field}En`] || "";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}

function categoryLabel(category) {
  const labels = {
    bn: { veg: "ভেজ", "non-veg": "নন-ভেজ", both: "দু'রকম" },
    en: { veg: "Veg", "non-veg": "Non-Veg", both: "Both" },
    hi: { veg: "Veg", "non-veg": "Non-Veg", both: "दोनों" }
  };
  return labels[currentLanguage]?.[category] || labels.bn[category] || category;
}

function orderUrl(product, quantity) {
  const name = productText(product, "name") || product.nameEn;
  const message =
    currentLanguage === "bn"
      ? `নমস্কার Monadar Henshel, আমি ${quantity} piece/plate ${name} অর্ডার করতে চাই। অনুগ্রহ করে দাম এবং availability জানাবেন।`
      : currentLanguage === "hi"
        ? `Namaste Monadar Henshel, I want to order ${quantity} piece/plate of ${name}. Please share the price and availability.`
        : `Hello Monadar Henshel, I want to order ${quantity} piece/plate of ${name}. Please share the price and availability.`;
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

function applyLanguage() {
  if (page === "admin") return;

  document.documentElement.lang = currentLanguage;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll(".lang-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === currentLanguage);
  });
  renderMenu();
}

function setupLanguageSwitch() {
  if (page === "admin") return;

  document.querySelectorAll(".lang-button").forEach((button) => {
    button.addEventListener("click", () => {
      currentLanguage = button.dataset.lang;
      localStorage.setItem(languageKey, currentLanguage);
      applyLanguage();
    });
  });
}

function renderMenu() {
  const menuGrid = document.querySelector("#menuGrid");
  if (!menuGrid) return;

  const shown = products.filter((product) => product.enabled && (activeFilter === "all" || product.category === activeFilter));
  menuGrid.innerHTML = "";

  if (!shown.length) {
    menuGrid.innerHTML = `<p class="empty-state">${escapeHtml(t("emptyMenu"))}</p>`;
    return;
  }

  shown.forEach((product) => {
    const images = (product.images || []).filter(Boolean).slice(0, 2);
    if (!images.length) images.push(fallbackImage);

    const card = document.createElement("article");
    card.className = "food-card";
    card.innerHTML = `
      <div class="food-images">
        ${images.map((src) => `<img src="${escapeAttr(src)}" alt="${escapeAttr(productText(product, "name"))}" onerror="this.src='${fallbackImage}'" />`).join("")}
      </div>
      <div class="food-body">
        <div class="food-topline">
          <h3>${escapeHtml(productText(product, "name"))}</h3>
          <span class="badge ${product.category}">${categoryLabel(product.category)}</span>
        </div>
        <p>${escapeHtml(productText(product, "description"))}</p>
        <p class="benefit"><strong>${escapeHtml(t("benefit"))}:</strong> ${escapeHtml(productText(product, "benefit"))}</p>
        <div class="order-row">
          <div class="quantity-stepper" aria-label="${escapeAttr(t("quantity"))}">
            <button class="quantity-button" data-step="-1" type="button" aria-label="Decrease quantity">-</button>
            <input type="number" min="1" value="1" aria-label="${escapeAttr(t("quantity"))}" />
            <button class="quantity-button" data-step="1" type="button" aria-label="Increase quantity">+</button>
          </div>
          <a class="primary-button order-track" target="_blank" rel="noreferrer">${escapeHtml(t("orderNow"))}</a>
        </div>
      </div>
    `;

    const quantityInput = card.querySelector("input");
    const stepperButtons = card.querySelectorAll(".quantity-button");
    const orderButton = card.querySelector(".order-track");
    const updateHref = () => {
      orderButton.href = orderUrl(product, Math.max(1, Number(quantityInput.value) || 1));
    };
    stepperButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const nextQuantity = Math.max(1, (Number(quantityInput.value) || 1) + Number(button.dataset.step));
        quantityInput.value = nextQuantity;
        updateHref();
      });
    });
    quantityInput.addEventListener("input", updateHref);
    orderButton.addEventListener("click", () => trackProductClick(product));
    updateHref();
    menuGrid.append(card);
  });
}

function setupMenuFilters() {
  document.querySelectorAll(".filter-button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter-button").forEach((entry) => entry.classList.remove("active"));
      button.classList.add("active");
      activeFilter = button.dataset.filter;
      renderMenu();
    });
  });
}

function setupEventForm() {
  const form = document.querySelector("#eventForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const foods = document.querySelector("#eventFoods").value.trim();
    const date = document.querySelector("#eventDate").value;
    const heads = document.querySelector("#eventHeads").value;
    const priority = document.querySelector("#eventPriority").value;
    const message = `Hello Monadar Henshel, I want to place a small event food order.\nFoods: ${foods}\nDate: ${date}\nNumber of heads: ${heads}\nPriority: ${priority}\nI understand that you do not provide catering service and I will collect the cooked food from your outlet. Please share price and availability.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank", "noreferrer");
  });
}

function clearAdminForm() {
  const form = document.querySelector("#itemForm");
  if (!form) return;
  form.reset();
  document.querySelector("#itemId").value = "";
  document.querySelector("#itemEnabled").checked = true;
  document.querySelector("#itemImageData").value = "";
  document.querySelector("#cropTool").classList.add("hidden");
  document.querySelector("#imagePreview").classList.add("hidden");
  cropImage = null;
}

function collectProductFromForm() {
  const id = document.querySelector("#itemId").value || crypto.randomUUID();
  const imageData = document.querySelector("#itemImageData").value.trim();
  return {
    id,
    nameBn: document.querySelector("#nameBn").value.trim(),
    nameEn: document.querySelector("#nameEn").value.trim(),
    nameHi: document.querySelector("#nameHi").value.trim(),
    category: document.querySelector("#itemCategory").value,
    descriptionBn: document.querySelector("#descriptionBn").value.trim(),
    descriptionEn: document.querySelector("#descriptionEn").value.trim(),
    descriptionHi: document.querySelector("#descriptionHi").value.trim(),
    benefitBn: document.querySelector("#benefitBn").value.trim(),
    benefitEn: document.querySelector("#benefitEn").value.trim(),
    benefitHi: document.querySelector("#benefitHi").value.trim(),
    enabled: document.querySelector("#itemEnabled").checked,
    images: imageData ? [imageData] : products.find((entry) => entry.id === id)?.images || [],
    clicks: products.find((entry) => entry.id === id)?.clicks || 0
  };
}

function fillAdminForm(product) {
  document.querySelector("#itemId").value = product.id;
  document.querySelector("#nameBn").value = product.nameBn || "";
  document.querySelector("#nameEn").value = product.nameEn || "";
  document.querySelector("#nameHi").value = product.nameHi || "";
  document.querySelector("#itemCategory").value = product.category || "veg";
  document.querySelector("#descriptionBn").value = product.descriptionBn || "";
  document.querySelector("#descriptionEn").value = product.descriptionEn || "";
  document.querySelector("#descriptionHi").value = product.descriptionHi || "";
  document.querySelector("#benefitBn").value = product.benefitBn || "";
  document.querySelector("#benefitEn").value = product.benefitEn || "";
  document.querySelector("#benefitHi").value = product.benefitHi || "";
  document.querySelector("#itemEnabled").checked = Boolean(product.enabled);
  const imageValue = product.images?.[0] || "";
  document.querySelector("#itemImageData").value = imageValue;
  const preview = document.querySelector("#imagePreview");
  if (imageValue) {
    preview.src = imageValue;
    preview.classList.remove("hidden");
  } else {
    preview.classList.add("hidden");
  }
  document.querySelector("#itemForm").scrollIntoView({ behavior: "smooth", block: "center" });
}

async function refreshProducts() {
  products = await getProducts();
  renderMenu();
  renderAdminList();
  renderTrending();
}

function renderAdminList() {
  const adminList = document.querySelector("#adminList");
  if (!adminList) return;

  adminList.innerHTML = "";
  products.forEach((product) => {
    const row = document.createElement("article");
    row.className = "admin-item";
    row.innerHTML = `
      <div>
        <h3>${escapeHtml(product.nameEn || product.nameBn)} <span class="badge ${product.category}">${categoryLabel(product.category)}</span></h3>
        <p>${product.enabled ? "Visible today" : "Hidden"} | Clicks: ${Number(product.clicks || 0)}</p>
      </div>
      <div class="admin-actions">
        <button type="button" data-action="toggle" data-id="${product.id}">${product.enabled ? "Disable" : "Enable"}</button>
        <button type="button" data-action="edit" data-id="${product.id}">Edit</button>
        <button type="button" class="danger" data-action="delete" data-id="${product.id}">Delete</button>
      </div>
    `;
    adminList.append(row);
  });
}

async function renderTrending() {
  const trendList = document.querySelector("#trendList");
  if (!trendList) return;

  const trending = await getTrendingProducts(products);
  trendList.innerHTML = trending.length
    ? trending
        .map(
          (item) => `
            <article>
              <strong>${escapeHtml(item.nameEn || item.nameBn || item.productId)}</strong>
              <span>${Number(item.clicks || 0)} clicks</span>
            </article>
          `
        )
        .join("")
    : "<p class=\"empty-state\">No clicks tracked yet.</p>";
}

function drawCropPreview() {
  const canvas = document.querySelector("#cropCanvas");
  if (!canvas || !cropImage) return;

  const ctx = canvas.getContext("2d");
  const zoom = Number(document.querySelector("#cropZoom").value) || 1;
  const offsetX = Number(document.querySelector("#cropX").value) || 0;
  const offsetY = Number(document.querySelector("#cropY").value) || 0;
  const baseScale = Math.max(canvas.width / cropImage.width, canvas.height / cropImage.height);
  const scale = baseScale * zoom;
  const width = cropImage.width * scale;
  const height = cropImage.height * scale;
  const x = (canvas.width - width) / 2 + (offsetX / 100) * (canvas.width / 2);
  const y = (canvas.height - height) / 2 + (offsetY / 100) * (canvas.height / 2);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#160c07";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(cropImage, x, y, width, height);
}

function setupImageCropper() {
  const upload = document.querySelector("#imageUpload");
  const cropTool = document.querySelector("#cropTool");
  const applyCrop = document.querySelector("#applyCrop");
  const preview = document.querySelector("#imagePreview");
  const imageData = document.querySelector("#itemImageData");
  if (!upload || !cropTool || !applyCrop || !preview || !imageData) return;

  upload.addEventListener("change", () => {
    const file = upload.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const img = new Image();
      img.addEventListener("load", () => {
        cropImage = img;
        document.querySelector("#cropZoom").value = "1";
        document.querySelector("#cropX").value = "0";
        document.querySelector("#cropY").value = "0";
        cropTool.classList.remove("hidden");
        drawCropPreview();
      });
      img.src = reader.result;
    });
    reader.readAsDataURL(file);
  });

  ["#cropZoom", "#cropX", "#cropY"].forEach((selector) => {
    document.querySelector(selector)?.addEventListener("input", drawCropPreview);
  });

  applyCrop.addEventListener("click", () => {
    const canvas = document.querySelector("#cropCanvas");
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/jpeg", 0.86);
    imageData.value = dataUrl;
    preview.src = dataUrl;
    preview.classList.remove("hidden");
  });
}

function setupAdminActions() {
  const form = document.querySelector("#itemForm");
  const adminList = document.querySelector("#adminList");
  if (!form || !adminList) return;

  setupImageCropper();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    await saveProduct(collectProductFromForm());
    clearAdminForm();
    await refreshProducts();
  });

  document.querySelector("#clearForm").addEventListener("click", clearAdminForm);
  document.querySelector("#resetMenu").addEventListener("click", async () => {
    await resetProducts();
    clearAdminForm();
    await refreshProducts();
  });

  adminList.addEventListener("click", async (event) => {
    const button = event.target.closest("button");
    if (!button) return;

    const product = products.find((entry) => entry.id === button.dataset.id);
    if (!product) return;

    if (button.dataset.action === "edit") {
      fillAdminForm(product);
      return;
    }

    if (button.dataset.action === "toggle") {
      await saveProduct({ ...product, enabled: !product.enabled });
    }

    if (button.dataset.action === "delete") {
      await deleteProduct(product.id);
    }

    await refreshProducts();
  });
}

async function setupAdminAuth() {
  const loginPanel = document.querySelector("#loginPanel");
  const adminPanel = document.querySelector("#adminPanel");
  const loginForm = document.querySelector("#loginForm");
  if (!loginPanel || !adminPanel || !loginForm) return;

  const showAdmin = async () => {
    loginPanel.classList.add("hidden");
    adminPanel.classList.remove("hidden");
    setupAdminActions();
    await refreshProducts();
  };

  if (await isAdminLoggedIn()) {
    await showAdmin();
  }

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = document.querySelector("#loginMessage");
    try {
      await loginAdmin(document.querySelector("#adminEmail").value.trim(), document.querySelector("#adminPassword").value);
      message.textContent = "";
      await showAdmin();
    } catch (error) {
      message.textContent = error.message || "Login failed.";
    }
  });

  document.querySelector("#logoutButton").addEventListener("click", async () => {
    await logoutAdmin();
    adminPanel.classList.add("hidden");
    loginPanel.classList.remove("hidden");
  });
}

function revealOnScroll() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".section-reveal").forEach((section) => observer.observe(section));
}

setupLanguageSwitch();
setupMenuFilters();
setupEventForm();
revealOnScroll();
await setupAdminAuth();
if (page !== "admin") {
  await refreshProducts();
}
applyLanguage();
