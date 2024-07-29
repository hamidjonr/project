import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const LikedProducts = () => {
    const [likedProducts, setLikedProducts] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        const storedLikedProducts = JSON.parse(localStorage.getItem('likedProducts')) || [];
        setLikedProducts(storedLikedProducts);
    }, []);

    const handleUnlike = (productId) => {
        const updatedLikedProducts = likedProducts.filter(product => product.id !== productId);
        setLikedProducts(updatedLikedProducts);
        localStorage.setItem('likedProducts', JSON.stringify(updatedLikedProducts));
    };

    return (
        <div>
            <h2 className='text-center mt-[30px] font-[700]'>{t("likes")}</h2>
            <div className='relative overflow-x-auto shadow-md sm:rounded-lg mt-[40px]'>
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                {t('prImage')}
                            </th>
                            <th scope="col" className="px-6 py-3">
                                {t('prProductName')}
                            </th>
                            <th scope="col" className="px-6 py-3">
                                {t('prRegion')}
                            </th>
                            <th scope="col" className="px-6 py-3">
                                {t('prPrice')}
                            </th>
                            <th scope="col" className="px-6 py-3">
                                {t('prDelete')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {likedProducts.map(product => (
                            <tr key={product.id} className="bg-white border-b">
                                <td className="px-6 py-4">
                                    <img src={product.imgUrl} alt={product.name} className='w-[80px] h-[80px] rounded-[10px]' />
                                </td>
                                <td className="px-6 py-4">
                                    {product.name}
                                </td>
                                <td className="px-6 py-4">
                                    {product.region}
                                </td>
                                <td className="px-6 py-4">
                                    Ming: {product.price}
                                </td>
                                <td className="px-6 py-4">
                                    <button 
                                        className="font-medium text-red-600 hover:text-red-800"
                                        onClick={() => handleUnlike(product.id)}
                                    >
                                        {t("Dislike")}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default LikedProducts;
