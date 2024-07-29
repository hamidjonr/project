import React, { useState } from 'react';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { useTranslation } from 'react-i18next';
import { notification } from 'antd';

export const Products = ({ defProduct, isLiked, toggleLike }) => {
    const { t } = useTranslation();
    const [count, setCount] = useState(0);

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

        setCount(prevCount => prevCount + 1);
    };

    return (
        <div className='bg-white w-[280px] rounded-md leading-none' key={defProduct.id}>
            <img 
                src={defProduct.imgUrl || <Skeleton />} 
                alt={defProduct.name || t("Loading")}
                className='w-[100%] max-w-[280px] h-[300px] rounded-t-md' 
                loading='lazy' 
            />
            <div className='px-[15px]'>
                <p className='text-[18px] font-medium mt-[10px]'>
                    {defProduct.name || <Skeleton />}
                </p>
                <p className='text-[#002f34] font-semibold text-[18px]'>
                    Ming: {defProduct.price || <Skeleton />}
                </p>
                <p className='text-[14px] font-normal'>
                    {defProduct.region || <Skeleton />}
                </p>
                <p className='text-[14px] font-normal'>
                    {defProduct.time || <Skeleton />}
                </p>
            </div>
            <div className='flex justify-between items-center px-[15px] mt-[10px] mb-[10px]'>
                <div className='flex items-center'>
                    {isLiked ? (
                        <FaHeart 
                            className='text-red-500 text-[24px] cursor-pointer' 
                            onClick={() => toggleLike(defProduct)} 
                        />
                    ) : (
                        <FaRegHeart 
                            className='text-[24px] cursor-pointer' 
                            onClick={() => toggleLike(defProduct)} 
                        />
                    )}
                </div>
                <Link to={`/productdetail/${defProduct.id}`}>
                    <button className='btn btn-primary'>
                        {t("View")}
                    </button>
                </Link>
                <FaCartShopping 
                    className='text-[24px] cursor-pointer' 
                    onClick={() => handleCart(defProduct)} 
                />
            </div>
        </div>
    );
};

export default Products;
