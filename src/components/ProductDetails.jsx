import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from '../firbese';
import { notification } from 'antd'; // Import notification for displaying messages

export const ProductDetails = () => {
    const [defProducts, setDefProducts] = useState([]);
    const { productId } = useParams();
    const dbValue1 = collection(db, 'defaultProducts');
    
    useEffect(() => {
        const unsubscribe = onSnapshot(
            dbValue1,
            (snapshot) => {
                const products = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setDefProducts(products);
            },
            (err) => {
                console.error('Error fetching products:', err);
            }
        );
        return () => unsubscribe(); // Cleanup on unmount
    }, [dbValue1]);

    const product = defProducts.find((product) => product.id === productId);
    const { name, price, imgUrl, region, desc } = product || {};

    if (!product) {
        return <p>Loading...</p>; // Show loading state if product is not yet available
    }

    const handleCart = (dataCard) => {
        let data = localStorage.getItem("cards");
    
        if (data) {
            data = JSON.parse(data);
        } else {
            data = [];
        }
    
        const existingItem = data.find(item => item.id === dataCard.id);
        if (existingItem) {
            existingItem.piece += 1;
            existingItem.price += Number(dataCard.price);
        } else {
            data.push({
                name: dataCard.name,
                img: dataCard.imgUrl,
                price: Number(dataCard.price),
                piece: 1,
                id: dataCard.id,
            });
        }
    
        localStorage.setItem("cards", JSON.stringify(data));
    
        notification.success({
            message: "Savatga qo'shildi !",
            description: "Tanlagan mahsulotingiz savatga qo'shildi. Savatga o'tib buyurtma berishingiz mumkin !",
        });
    };

    return (
        <div>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img
                            alt={name}
                            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                            src={imgUrl}
                        />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">Product Name</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{name}</h1>
                            <p className="leading-relaxed mb-4">{desc}</p>
                            <div className="flex mt-6 items-center border-b-2 border-gray-100 mb-5">
                                <div className='flex items-center'>
                                    <h4 className="font-medium">Region:</h4>
                                    <h5 className='ml-2'>{region}</h5>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <span className="title-font font-medium text-2xl text-gray-900 mr-4">So'm: {price}</span>
                                <div className="ml-auto flex gap-4">
                                    <button onClick={() => handleCart(product)} className='text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded'>
                                        <i className="fa-solid fa-cart-shopping"></i>
                                    </button>
                                    <Link to="/" className='text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded'>
                                        Back
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ProductDetails;
