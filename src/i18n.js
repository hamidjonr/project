import i18next from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";

i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: process.env.NODE_ENV === 'development', // Enable debug only in development
        fallbackLng: 'uz',
        keySeparator: false, // Keys do not use dot notation
        interpolation: {
            escapeValue: false // React already does escaping
        },
        resources: {
            en: {
                translation: {
                    h_world: "hello world",
                    message: 'Message',
                    profile: 'Your Profile',
                    giveAn: 'Announcement',
                    productType: 'Product type',
                    kw: 't-shirt',
                    house: 'Dress',
                    transport: 'Batnik',
                    work: 'Leotard',
                    animal: 'Shorts',
                    furniture: 'Scissors',
                    elecItems: 'Sipper',
                    services: 'Doubles',
                    fashion: 'Pants',
                    sportItems: 'Sport Items',
                    discount: 'Discount',
                    exchange: 'Exchange',
                    placeholder: 'Search',
                    topPr: 'Top Products',
                    profileTitle: 'Your Profile',
                    prImage: 'Image',
                    prProductName: 'Product Name',
                    prRegion: 'Region',
                    prTime: 'Time',
                    prPrice: 'Price',
                    prEdit: 'Edit',
                    prDelete: 'Delete',
                    prCreateNew: 'New',
                    LearnMore: "Learn More",
                    Dislike: "Dislike",
                    likes: "Liked Products",
                    Admin: "For admin",
                    Products: "Top products",
                    PAGES: "PAGES",
                    Name: "Name",
                    Price: "Price",
                    Region: "Region",
                    PhoneNumber: "Phone Number",
                    Description: "Description",
                    SelectType: "Select Type",
                    CATEGORIES: "CATEGORIES",
                    View: "View",
                    Home: "Home",
                    Into: "INTO MEN'S CLOTHING STORE",
                    soni: "Number",
                    buyu: "Send Order",
                    jami: "Total Narcissism",
                    max: "Products"
                }
            },
            uz: {
                translation: {
                    h_world: "Assalomu alaykum",
                    message: 'Xabar',
                    profile: 'Sizning Hisobingiz',
                    giveAn: 'Elon berish',
                    productType: 'Maxsulot turlari',
                    kw: 'Futbolka',
                    house: "Kuylak",
                    transport: 'Batnik',
                    work: 'Triko',
                    animal: 'Shortik',
                    furniture: 'Makas',
                    elecItems: 'Tapochka',
                    services: 'Dvoykalar',
                    fashion: 'Shimlar',
                    sportItems: 'Sport Buyumlari',
                    discount: 'Chegirma',
                    exchange: 'Almashish',
                    placeholder: 'Qidiruv',
                    topPr: 'Yuqoridagi maxsulotlar',
                    profileTitle: 'Sizning hisobingiz',
                    prImage: 'Rasm',
                    prProductName: 'Maxsulot nomi',
                    prRegion: 'Viloyat',
                    prTime: 'Vaqt',
                    prPrice: 'Narx',
                    prEdit: "O'zgartirish",
                    prDelete: "O'chirish",
                    prCreateNew: 'Yangi',
                    LearnMore: "Batafsil ma'lumot",
                    Dislike: "Yoqtirmaslik",
                    likes: "Yoqtirgan mahsulotlaringiz",
                    Admin: "Admin uchun",
                    Products: "Eng yaxshi mahsulotlar",
                    PAGES: "Sahifalar",
                    Name: "Nomi",
                    Price: "Narxi",
                    Region: "Mintaqa",
                    PhoneNumber: "Telefon raqam",
                    Description: "Xaqida",
                    SelectType: "Turini tanlang",
                    CATEGORIES: "KATEGORIYALAR",
                    View: "Ko'rish",
                    Home: "Bosh sahifa",
                    Into: "INTO ERKAKLAR KIYIM DOKONI",
                    soni: "Soni",
                    buyu: "Buyurtmani yuborish",
                    jami: "Jami narhi",
                    max: "Maxsulotlar"
                }
            }
        }
    });

export default i18next;
