import { firebaseConfig } from "./firebase-config.js";

const productKey = "monadar-henshel-products-v8";
const clickKey = "monadar-henshel-clicks-v1";
const authKey = "monadar-henshel-admin-auth";
const hasFirebaseConfig = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.authDomain);

let firebaseApi = null;

const images = {
  fish: "assets/products/dahi-katla.png",
  mustardFish: "assets/products/sarshe-iilish.png",
  chicken: "assets/products/chicken-kasha.png",
  mutton: "assets/products/mutton-kasha.png",
  posto: "assets/products/alu-posto.png",
  dal: "assets/products/chholar-dal.png",
  roti: "assets/products/roti.png",
  tadka: "assets/products/tadka.png"
};

function product(id, category, image, nameBn, nameEn, nameHi, descriptionBn, descriptionEn, descriptionHi, benefitBn, benefitEn, benefitHi) {
  return {
    id,
    category,
    enabled: true,
    nameBn,
    nameEn,
    nameHi,
    descriptionBn,
    descriptionEn,
    descriptionHi,
    benefitBn,
    benefitEn,
    benefitHi,
    images: [image],
    clicks: 0
  };
}

export const defaultProducts = [
  product("dahi-katla", "non-veg", images.fish, "দই কাতলা", "Dahi Katla", "दही कतला", "কাতলা মাছ দইয়ের মোলায়েম ঝোলে রান্না করা এক ঘরোয়া বাঙালি পদ।", "Katla fish cooked in a smooth yogurt-based Bengali gravy.", "दही की मुलायम ग्रेवी में पका कतला मछली का बंगाली व्यंजन।", "মাছের প্রোটিন ও দইয়ের মোলায়েম স্বাদ একসঙ্গে পাওয়া যায়।", "Fish protein with the gentle richness of yogurt.", "मछली का प्रोटीन और दही का मुलायम स्वाद साथ मिलता है।"),
  product("sarshe-iilish", "non-veg", images.mustardFish, "সর্ষে ইলিশ", "Sarshe Iilish", "सरसों इलिश", "ইলিশ মাছ সর্ষে, কাঁচালঙ্কা ও সর্ষের তেলের ঝাঁঝে রান্না।", "Hilsa cooked with mustard, green chili, and mustard oil.", "इलिश मछली सरसों, हरी मिर्च और सरसों तेल के स्वाद में पकी।", "ওমেগা-সমৃদ্ধ মাছ, ঝাঁঝালো অথচ পরিচ্ছন্ন স্বাদ।", "Omega-rich fish with a bold mustard profile.", "ओमेगा-समृद्ध मछली और तेज सरसों का स्वाद।"),
  product("chicken-kasha", "non-veg", images.chicken, "চিকেন কষা", "Chicken Kasha", "चिकन कशा", "ঘন মশলায় ধীরে কষানো ঝোলহীন ধরনের চিকেন পদ।", "Chicken slow-cooked in a thick Bengali kasha masala.", "गाढ़े बंगाली मसाले में धीमे पका चिकन।", "প্রোটিনসমৃদ্ধ, মশলাদার ও তৃপ্তিদায়ক।", "Protein-rich, hearty, and spice-forward.", "प्रोटीन से भरपूर, मसालेदार और संतोषजनक।"),
  product("mutton-kasha", "non-veg", images.mutton, "মাটন কষা", "Mutton Kasha", "मटन कशा", "মাটন গাঢ় কষা মশলায় ধীরে রান্না করা বিশেষ পদ।", "Mutton cooked slowly in a rich Bengali kasha gravy.", "गाढ़े बंगाली कशा मसाले में धीमे पका मटन।", "প্রোটিন ও আয়রনসমৃদ্ধ বিশেষ দিনের খাবার।", "A rich source of protein and iron.", "प्रोटीन और आयरन से भरपूर खास व्यंजन।"),
  product("chili-chicken", "non-veg", "assets/products/chili-chicken.png", "চিলি চিকেন", "Chili Chicken", "चिली चिकन", "চিকেন টুকরো ক্যাপসিকাম, পেঁয়াজ ও ঝাল সসে টস করা।", "Chicken tossed with capsicum, onion, and spicy chili sauce.", "चिकन को शिमला मिर्च, प्याज और चिली सॉस में टॉस किया गया।", "প্রোটিনসমৃদ্ধ, ঝাল ও রসালো স্ন্যাকস/সাইড।", "A protein-rich spicy side dish.", "प्रोटीन से भरपूर मसालेदार साइड डिश।"),
  product("patal-chingri", "non-veg", "assets/products/patal-chingri.png", "পটল চিংড়ি", "Patal Chingri", "परवल झींगा", "পটল ও চিংড়ি বাঙালি মশলায় রান্না করা ঘরোয়া পদ।", "Pointed gourd and prawns cooked with Bengali spices.", "परवल और झींगा बंगाली मसाले में पका।", "সবজি ও চিংড়ির প্রোটিন একসঙ্গে পাওয়া যায়।", "Combines vegetables with prawn protein.", "सब्जी और झींगा प्रोटीन का संतुलन।"),
  product("patal-dorma", "veg", "assets/products/patal-dorma.png", "পটল ডর্মা", "Patal Dorma", "परवल डोरमा", "মশলাদার পুরভরা পটল ধীরে রান্না করা ঐতিহ্যবাহী পদ।", "Stuffed pointed gourd cooked in a flavorful gravy.", "मसालेदार भरवां परवल ग्रेवी में पका।", "সবজিভিত্তিক, স্বাদে সমৃদ্ধ ও পেটভরা।", "Vegetable-led, filling, and flavorful.", "सब्जी आधारित, स्वादिष्ट और भरपूर।"),
  product("alu-posto", "veg", images.posto, "আলু পোস্ত", "Alu Posto", "आलू पोस्तो", "আলু পোস্তবাটা, কাঁচালঙ্কা ও সর্ষের তেলে রান্না।", "Potatoes cooked with poppy seed paste, chili, and mustard oil.", "आलू को पोस्तो पेस्ट, मिर्च और सरसों तेल में पकाया गया।", "সরল উপকরণে হালকা, বাদামি স্বাদের ভেজ পদ।", "A simple vegetarian dish with a gentle nutty taste.", "सरल सामग्री से बना हल्का शाकाहारी व्यंजन।"),
  product("jhinge-alu-posto", "veg", "assets/products/jhinge-alu-posto.png", "ঝিঙে আলু পোস্ত", "Jhinge Alu Posto", "झींगा आलू पोस्तो", "ঝিঙে ও আলু পোস্তবাটায় রান্না করা নরম ভেজ পদ।", "Ridge gourd and potato cooked in poppy seed paste.", "तुरई और आलू पोस्तो पेस्ट में पके।", "হালকা সবজি, নরম স্বাদ ও ঘরোয়া আরাম।", "Light vegetables with a comforting texture.", "हल्की सब्जी और घर जैसा स्वाद।"),
  product("mochar-chingri", "non-veg", "assets/products/mochar-chingri.png", "মোচার চিংড়ি", "Mochar Chingri", "मोचा झींगा", "কলার মোচা ও চিংড়ি বাঙালি মশলায় রান্না।", "Banana blossom cooked with prawns and Bengali spices.", "केले के फूल और झींगा बंगाली मसाले में पके।", "ফাইবারসমৃদ্ধ মোচা ও চিংড়ির প্রোটিনের মেলবন্ধন।", "Fiber-rich banana blossom with prawn protein.", "फाइबर और झींगा प्रोटीन का मेल।"),
  product("chholar-dal", "veg", images.dal, "ছোলার ডাল", "Chholar Dal", "छोलार दाल", "নারকেল ও মশলার ছোঁয়ায় সোনালি ছোলার ডাল।", "Golden Bengal gram dal with coconut and spices.", "नारियल और मसालों वाली सुनहरी चना दाल।", "উদ্ভিজ্জ প্রোটিন ও ফাইবার পাওয়া যায়।", "Plant protein and fiber in a wholesome dal.", "वनस्पति प्रोटीन और फाइबर से भरपूर।"),
  product("kochu-loti", "veg", "assets/products/kochu-loti.png", "কচুর লতি", "Kochur Loti", "कचू लोटी", "কচুর লতি সর্ষে-মশলার স্বাদে রান্না করা ঐতিহ্যবাহী পদ।", "Taro stolons cooked with traditional Bengali seasoning.", "अरबी के डंठल बंगाली मसालों में पके।", "ফাইবারসমৃদ্ধ দেশি সবজি।", "A fiber-rich traditional vegetable dish.", "फाइबर से भरपूर पारंपरिक सब्जी।"),
  product("alu-bhaja", "veg", "assets/products/alu-bhaja.png", "আলু ভাজা", "Alu Bhaja", "आलू भाजा", "পাতলা কাটা আলু কড়কড়ে করে ভাজা।", "Thin potato fries cooked crisp in Bengali style.", "पतले कटे आलू कुरकुरे तले हुए।", "সহজ, পরিচিত ও সব পদের সঙ্গে মানানসই।", "Simple, familiar, and pairs with many dishes.", "सरल और कई व्यंजनों के साथ अच्छा।"),
  product("patal-bhaja", "veg", "assets/products/patal-bhaja.png", "পটল ভাজা", "Patal Bhaja", "परवल भाजा", "পটল মশলা মাখিয়ে হালকা কড়কড়ে ভাজা।", "Pointed gourd fried with light seasoning.", "परवल को हल्के मसाले के साथ तला गया।", "সবজিভিত্তিক সাইড, হালকা ও সুস্বাদু।", "A light vegetable side dish.", "हल्की सब्जी वाली साइड डिश।"),
  product("begun-bhaja", "veg", "assets/products/begun-bhaja.png", "বেগুন ভাজা", "Begun Bhaja", "बैंगन भाजा", "বেগুনের মোটা স্লাইস মশলা মাখিয়ে ভাজা।", "Thick eggplant slices fried with Bengali seasoning.", "बैंगन के मोटे स्लाइस मसाले के साथ तले हुए।", "নরম বেগুনের স্বাদ, ভেজ সাইড হিসেবে জনপ্রিয়।", "A popular soft and flavorful vegetarian side.", "लोकप्रिय मुलायम शाकाहारी साइड।"),
  product("dimer-curry", "non-veg", "assets/products/dimer-curry.png", "ডিমের কারি", "Egg Curry", "अंडा करी", "ডিম মশলাদার ঝোলে রান্না করা ঘরোয়া কারি।", "Eggs cooked in a spiced home-style curry.", "अंडे मसालेदार घरेलू करी में पके।", "ডিমের প্রোটিনসহ সহজ তৃপ্তিদায়ক পদ।", "Egg protein in a satisfying curry.", "अंडे का प्रोटीन और संतोषजनक करी।"),
  product("dimer-omelette", "non-veg", "assets/products/dimer-omelette.png", "ডিমের অমলেট", "Egg Omelette", "अंडा ऑमलेट", "ডিম, পেঁয়াজ ও কাঁচালঙ্কা দিয়ে তৈরি অমলেট।", "Omelette made with egg, onion, and green chili.", "अंडा, प्याज और हरी मिर्च से बना ऑमलेट।", "দ্রুত প্রোটিনসমৃদ্ধ সাইড।", "A quick protein-rich side.", "जल्दी बनने वाली प्रोटीन साइड।"),
  product("dim-poach", "non-veg", "assets/products/dim-poach.png", "ডিম পোচ", "Egg Poach", "अंडा पोच", "নরম কুসুমসহ সহজ ডিম পোচ।", "Simple egg poach with a soft yolk.", "नरम पीली जर्दी वाला अंडा पोच।", "হালকা, প্রোটিনসমৃদ্ধ ও পরিচিত।", "Light, familiar, and protein-rich.", "हल्का और प्रोटीन से भरपूर।"),
  product("lau-ghonto", "veg", "assets/products/lau-ghonto.png", "লাউ ঘন্ট", "Lau Ghonto", "लौकी घोंटो", "লাউ কুচি মশলা দিয়ে শুকনো ঘরোয়া রান্না।", "Bottle gourd cooked dry with Bengali spices.", "लौकी को बंगाली मसाले के साथ सूखा पकाया गया।", "হালকা সবজি, সহজপাচ্য ও ঘরোয়া।", "Light, vegetable-forward, and easy-going.", "हल्की और घर जैसी सब्जी।"),
  product("begun-bahar", "veg", "assets/products/begun-bahar.png", "বেগুন বাহার", "Begun Bahar", "बैंगन बहार", "বেগুন সমৃদ্ধ মশলাদার গ্রেভিতে রান্না।", "Eggplant cooked in a rich flavorful gravy.", "बैंगन समृद्ध मसालेदार ग्रेवी में पका।", "সবজিভিত্তিক, নরম ও স্বাদে ভরপুর।", "Vegetable-based, soft, and full of flavor.", "सब्जी आधारित और स्वादिष्ट।"),
  product("chalkumro-chingri", "non-veg", "assets/products/chalkumro-chingri.png", "চালকুমড়ো চিংড়ি", "Chalkumro Chingri", "चालकुमड़ा झींगा", "চালকুমড়ো ও চিংড়ি বাঙালি মশলায় রান্না।", "Ash gourd cooked with prawns and Bengali spices.", "पेठा और झींगा बंगाली मसाले में पके।", "হালকা সবজি ও চিংড়ির প্রোটিন একসঙ্গে।", "Light vegetable with prawn protein.", "हल्की सब्जी और झींगा प्रोटीन।"),
  product("echor-chingri", "non-veg", "assets/products/echor-chingri.png", "এঁচোড় চিংড়ি", "Echor Chingri", "कटहल झींगा", "কাঁচা কাঁঠাল ও চিংড়ির মশলাদার বাঙালি রান্না।", "Raw jackfruit cooked with prawns in Bengali spices.", "कच्चे कटहल और झींगा बंगाली मसाले में पके।", "ফাইবারসমৃদ্ধ এঁচোড় ও চিংড়ির স্বাদ।", "Fiber-rich jackfruit with prawn protein.", "फाइबर और झींगा प्रोटीन का मेल।"),
  product("shahi-paneer", "veg", "assets/products/shahi-paneer.png", "শাহী পনির", "Shahi Paneer", "शाही पनीर", "পনির মোলায়েম বাদামি-ক্রিমি গ্রেভিতে রান্না।", "Paneer cooked in a creamy, mildly rich gravy.", "पनीर मलाईदार हल्की रिच ग्रेवी में पका।", "ক্যালসিয়াম ও প্রোটিনসমৃদ্ধ ভেজ পদ।", "Vegetarian protein with calcium from paneer.", "पनीर से कैल्शियम और प्रोटीन।"),
  product("palak-paneer", "veg", "assets/products/palak-paneer.png", "পালক পনির", "Palak Paneer", "पालक पनीर", "পালং শাকের গ্রেভিতে নরম পনির কিউব।", "Paneer cubes in a smooth spinach gravy.", "पालक ग्रेवी में मुलायम पनीर।", "শাকের পুষ্টি ও পনিরের প্রোটিন একসঙ্গে।", "Greens and paneer protein together.", "साग और पनीर प्रोटीन साथ।"),
  product("matar-paneer", "veg", "assets/products/matar-paneer.png", "মটর পনির", "Matar Paneer", "मटर पनीर", "মটর ও পনির মশলাদার গ্রেভিতে রান্না।", "Peas and paneer cooked in a spiced gravy.", "मटर और पनीर मसालेदार ग्रेवी में पके।", "পনিরের প্রোটিন ও মটরের ফাইবার।", "Paneer protein with fiber from peas.", "पनीर प्रोटीन और मटर फाइबर।"),
  product("chana-paneer", "veg", "assets/products/chana-paneer.png", "ছানা পনির", "Chana Paneer", "छेना पनीर", "ছানা/পনির মশলাদার ঘরোয়া গ্রেভিতে রান্না।", "Fresh chhana or paneer cooked in a homestyle gravy.", "ताजा छेना/पनीर घरेलू ग्रेवी में पका।", "দুধজাত প্রোটিনসমৃদ্ধ ভেজ পদ।", "Dairy-based vegetarian protein.", "दूध आधारित शाकाहारी प्रोटीन।"),
  product("soyabean-sabji", "veg", "assets/products/soyabean-sabji.png", "সয়াবিন সবজি", "Soyabean Sabji", "सोयाबीन सब्जी", "সয়াবিন মশলাদার সবজি হিসেবে রান্না।", "Soy chunks cooked as a spiced vegetable dish.", "सोया चंक्स मसालेदार सब्जी के रूप में पके।", "উদ্ভিজ্জ প্রোটিনসমৃদ্ধ।", "Rich in plant-based protein.", "वनस्पति प्रोटीन से भरपूर।"),
  product("hyderabadi-chicken", "non-veg", "assets/products/hyderabadi-chicken.png", "হায়দরাবাদি চিকেন", "Hyderabadi Chicken", "हैदराबादी चिकन", "দই, মশলা ও সুগন্ধি স্বাদে হায়দরাবাদি স্টাইল চিকেন।", "Chicken with yogurt, spices, and Hyderabadi-style aroma.", "दही, मसाले और हैदराबादी सुगंध वाला चिकन।", "প্রোটিনসমৃদ্ধ, সুগন্ধি ও মশলাদার।", "Protein-rich, aromatic, and flavorful.", "प्रोटीन से भरपूर और सुगंधित।"),
  product("gondhoraj-chicken", "non-veg", "assets/products/gondhoraj-chicken.png", "গন্ধরাজ চিকেন", "Gondhoraj Chicken", "गंधराज चिकन", "গন্ধরাজ লেবুর সুগন্ধে রান্না করা চিকেন।", "Chicken flavored with fragrant Gondhoraj lime.", "गंधराज नींबू की खुशबू वाला चिकन।", "প্রোটিনসমৃদ্ধ, সতেজ লেবুর গন্ধে হালকা লাগে।", "Protein-rich with a refreshing lime aroma.", "प्रोटीन और ताज़ी नींबू सुगंध।"),
  product("gondhoraj-katla", "non-veg", "assets/products/gondhoraj-katla.png", "গন্ধরাজ কাতলা", "Gondhoraj Katla", "गंधराज कतला", "কাতলা মাছ গন্ধরাজ লেবুর সুগন্ধে রান্না।", "Katla fish cooked with fragrant Gondhoraj lime.", "कतला मछली गंधराज नींबू की खुशबू में पकी।", "মাছের প্রোটিন ও সতেজ লেবুর স্বাদ।", "Fish protein with fresh lime fragrance.", "मछली प्रोटीन और ताज़ी नींबू खुशबू।"),
  product("mixed-veg", "veg", "assets/products/mixed-veg.png", "মিক্সড ভেজ", "Mixed Veg", "मिक्स्ड वेज", "বিভিন্ন সবজি মশলা দিয়ে রান্না।", "Mixed vegetables cooked with homestyle spices.", "मिली-जुली सब्जियां घरेलू मसाले में पकी।", "বিভিন্ন সবজির পুষ্টি একসঙ্গে।", "Nutrients from a mix of vegetables.", "अलग-अलग सब्जियों का पोषण।"),
  product("chana", "veg", "assets/products/chana.png", "ছানা", "Chana", "चना", "ছানা/চানা মশলাদার ঘরোয়া স্টাইলে রান্না।", "Chana cooked in a spiced homestyle dish.", "चना मसालेदार घरेलू तरीके से पका।", "উদ্ভিজ্জ প্রোটিন ও ফাইবারসমৃদ্ধ।", "Plant protein and fiber-rich.", "वनस्पति प्रोटीन और फाइबर।"),
  product("tadka-veg", "veg", "assets/products/tadka-veg.png", "তড়কা (নিরামিষ)", "Tadka (Veg)", "तड़का (वेज)", "ডাল, মশলা ও তড়কার ঘরোয়া নিরামিষ পদ।", "Vegetarian dal tadka with homestyle spices.", "घरेलू मसालों वाला वेज दाल तड़का।", "ডালভিত্তিক প্রোটিন ও আরামদায়ক স্বাদ।", "Dal-based protein with comforting flavor.", "दाल आधारित प्रोटीन और आरामदायक स्वाद।"),
  product("egg-tadka", "non-veg", "assets/products/egg-tadka.png", "ডিম তড়কা", "Egg Tadka", "अंडा तड़का", "তড়কা ডালে ডিম মিশিয়ে তৈরি ঝালঝাল পদ।", "Tadka dal enriched with egg.", "तड़का दाल में अंडे का स्वाद।", "ডাল ও ডিমের প্রোটিন একসঙ্গে।", "Protein from both dal and egg.", "दाल और अंडे का प्रोटीन।"),
  product("chili-fulkopi", "veg", "assets/products/chili-fulkopi.png", "চিলি ফুলকপি", "Chili Cauliflower", "चिली फूलगोभी", "ফুলকপি চিলি সসে টস করা ঝাল সাইড।", "Cauliflower tossed in chili sauce.", "फूलगोभी चिली सॉस में टॉस की गई।", "সবজিভিত্তিক ঝাল ও কড়কড়ে সাইড।", "A spicy vegetable-based side.", "मसालेदार सब्जी वाली साइड।"),
  product("chicken-bharta", "non-veg", "assets/products/chicken-bharta.png", "চিকেন ভর্তা", "Chicken Bharta", "चिकन भरता", "কুচোনো চিকেন মশলা, ডিমের ছোঁয়া ও ক্রিমি স্বাদে রান্না।", "Shredded chicken cooked into a rich bharta-style dish.", "कटा हुआ चिकन भरता स्टाइल में पका।", "প্রোটিনসমৃদ্ধ, নরম ও মশলাদার।", "Protein-rich, soft, and flavorful.", "प्रोटीन से भरपूर, मुलायम और स्वादिष्ट।")
];

export async function initFirebase() {
  if (!hasFirebaseConfig || firebaseApi) return firebaseApi;

  const appModule = await import("https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js");
  const authModule = await import("https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js");
  const storeModule = await import("https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js");
  const app = appModule.initializeApp(firebaseConfig);
  firebaseApi = {
    auth: authModule.getAuth(app),
    db: storeModule.getFirestore(app),
    authModule,
    storeModule
  };
  return firebaseApi;
}

function readLocal(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function writeLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function ensureLocalProducts() {
  const saved = readLocal(productKey, null);
  if (saved) return saved;
  writeLocal(productKey, defaultProducts);
  return defaultProducts;
}

export async function getProducts() {
  const api = await initFirebase();
  if (!api) return ensureLocalProducts();

  try {
    const { collection, getDocs, orderBy, query } = api.storeModule;
    const snapshot = await getDocs(query(collection(api.db, "products"), orderBy("nameBn")));
    if (snapshot.empty) return defaultProducts;
    const firebaseProducts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const mergedProducts = new Map(defaultProducts.map((product) => [product.id, product]));

    firebaseProducts.forEach((product) => {
      if (product.deleted) {
        mergedProducts.delete(product.id);
        return;
      }
      mergedProducts.set(product.id, { ...(mergedProducts.get(product.id) || {}), ...product });
    });

    return Array.from(mergedProducts.values()).filter((product) => !product.deleted);
  } catch (error) {
    console.warn("Firebase products unavailable; using built-in menu.", error);
    return defaultProducts;
  }
}

export async function saveProduct(product) {
  const nextProduct = { ...product, id: product.id || crypto.randomUUID(), deleted: false };
  const api = await initFirebase();
  if (!api) {
    const products = ensureLocalProducts();
    const index = products.findIndex((entry) => entry.id === nextProduct.id);
    if (index >= 0) products[index] = nextProduct;
    else products.unshift(nextProduct);
    writeLocal(productKey, products);
    return nextProduct;
  }

  const { doc, setDoc } = api.storeModule;
  await setDoc(doc(api.db, "products", nextProduct.id), nextProduct, { merge: true });
  return nextProduct;
}

export async function deleteProduct(id) {
  const api = await initFirebase();
  if (!api) {
    writeLocal(productKey, ensureLocalProducts().filter((entry) => entry.id !== id));
    return;
  }

  const { doc, setDoc } = api.storeModule;
  await setDoc(doc(api.db, "products", id), { id, deleted: true, enabled: false }, { merge: true });
}

export async function trackProductClick(product) {
  const api = await initFirebase();
  if (!api) {
    const clicks = readLocal(clickKey, {});
    clicks[product.id] = (clicks[product.id] || 0) + 1;
    writeLocal(clickKey, clicks);
    const products = ensureLocalProducts().map((entry) =>
      entry.id === product.id ? { ...entry, clicks: clicks[product.id] } : entry
    );
    writeLocal(productKey, products);
    return;
  }

  try {
    const { doc, increment, serverTimestamp, setDoc } = api.storeModule;
    await setDoc(
      doc(api.db, "productClicks", product.id),
      {
        productId: product.id,
        nameBn: product.nameBn,
        nameEn: product.nameEn,
        clicks: increment(1),
        lastClickedAt: serverTimestamp()
      },
      { merge: true }
    );
  } catch (error) {
    console.warn("Firebase click tracking unavailable.", error);
  }
}

export async function getTrendingProducts(products) {
  const api = await initFirebase();
  if (!api) {
    const clicks = readLocal(clickKey, {});
    return products
      .map((product) => ({ ...product, clicks: clicks[product.id] || product.clicks || 0 }))
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 6);
  }

  try {
    const { collection, getDocs, limit, orderBy, query } = api.storeModule;
    const snapshot = await getDocs(query(collection(api.db, "productClicks"), orderBy("clicks", "desc"), limit(6)));
    return snapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.warn("Firebase trending unavailable.", error);
    return products.slice(0, 6);
  }
}

export async function loginAdmin(email, password) {
  const api = await initFirebase();
  if (!api) {
    throw new Error("Admin login requires Firebase Authentication. Add Firebase config and create the admin user in Firebase.");
  }

  const { signInWithEmailAndPassword } = api.authModule;
  const credential = await signInWithEmailAndPassword(api.auth, email, password);
  return credential.user;
}

export async function isAdminLoggedIn() {
  const api = await initFirebase();
  if (!api) return sessionStorage.getItem(authKey) === "true";

  return new Promise((resolve) => {
    const unsubscribe = api.authModule.onAuthStateChanged(api.auth, (user) => {
      unsubscribe();
      resolve(Boolean(user));
    });
  });
}

export async function logoutAdmin() {
  const api = await initFirebase();
  if (!api) {
    sessionStorage.removeItem(authKey);
    return;
  }

  await api.authModule.signOut(api.auth);
}

export function resetLocalProducts() {
  writeLocal(productKey, defaultProducts);
  writeLocal(clickKey, {});
}

export async function resetProducts() {
  const api = await initFirebase();
  if (!api) {
    resetLocalProducts();
    return;
  }

  const { doc, setDoc } = api.storeModule;
  await Promise.all(defaultProducts.map((entry) => setDoc(doc(api.db, "products", entry.id), { ...entry, deleted: false }, { merge: true })));
}
