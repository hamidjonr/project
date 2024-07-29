import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../App.css';

const Card = () => {
    const [cards, setCards] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        const storedCards = JSON.parse(localStorage.getItem('cards')) || [];
        setCards(storedCards);
    }, []);

    const handleRemove = (productId) => {
        const updatedCards = cards.filter(product => product.id !== productId);
        setCards(updatedCards);
        localStorage.setItem('cards', JSON.stringify(updatedCards));
    };

    const handleBuy = () => {
        setShowForm(true);
    };

    const handleIncrement = (productId) => {
        const updatedCards = cards.map(product => {
            if (product.id === productId) {
                const newQuantity = (product.quantity || 1) + 1;
                return {
                    ...product,
                    quantity: newQuantity,
                    totalPrice: product.price * newQuantity
                };
            }
            return product;
        });
        setCards(updatedCards);
        localStorage.setItem('cards', JSON.stringify(updatedCards));
    };

    const handleDecrement = (productId) => {
        const updatedCards = cards.map(product => {
            if (product.id === productId && (product.quantity || 1) > 1) {
                const newQuantity = (product.quantity || 1) - 1;
                return {
                    ...product,
                    quantity: newQuantity,
                    totalPrice: product.price * newQuantity
                };
            }
            return product;
        });
        setCards(updatedCards);
        localStorage.setItem('cards', JSON.stringify(updatedCards));
    };

    const getTotalPrice = () => {
        return cards.reduce((total, product) => total + (product.totalPrice || product.price), 0);
    };

    return (
        <div>
            <h2 className='text-center mt-8 font-bold text-2xl'>{t("max")}</h2>
            <div className='relative overflow-x-auto shadow-md sm:rounded-lg mt-10'>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 ">{t('prImage')}</th>
                            <th scope="col" className="px-6 py-3">{t('prProductName')}</th>
                            <th scope="col" className="px-6 py-3">{t('prPrice')}</th>
                            <th scope="col" className="px-6 py-3">{t('soni')}</th>
                            <th scope="col" className="px-6 py-3">{t('prDelete')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cards.length > 0 ? (
                            cards.map(product => (
                                <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="px-6 py-4">
                                        <img src={product.img} alt={product.name} className='w-[80px] h-[80px] rounded-[10px]' />
                                    </td>
                                    <td className="px-6 py-4">{product.name}</td>
                                    <td className="px-6 py-4">Ming: {product.totalPrice || product.price}</td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => handleDecrement(product.id)} className='b'>-</button>
                                        <span className='c'>{product.quantity || 1}</span>
                                        <button onClick={() => handleIncrement(product.id)} className='d'>+</button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => handleRemove(product.id)} className="font-medium text-red-500 hover:text-red-700">
                                            {t("prDelete")}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-gray-500">
                                    {t('No products found')}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className='flex flex-col items-center mt-4'>
                <div className='flex items-center justify-between w-full max-w-lg'>
                    <div>
                        <h3 className='text-xl font-bold'>{t('jami')}</h3>
                        <p className='text-lg'>{getTotalPrice()} ming</p>
                    </div>
                    <button onClick={handleBuy} className="py-2 px-4 bg-blue-500 text-white rounded-lg">
                        {t("Buyurtmani yuborish")}
                    </button>
                </div>
            </div>

            {showForm && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                    <div className='bg-white p-8 rounded-lg shadow-lg'>
                        <h2 className='text-2xl font-bold mb-4'>{t('buyu')}</h2>
                        <form className='space-y-4'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>{t('Name')}</label>
                                <input type="text" className='mt-1 p-2 w-full border border-gray-300 rounded-md' />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>{t('Number')}</label>
                                <input type="text" className='mt-1 p-2 w-full border border-gray-300 rounded-md' />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700'>{t('Address')}</label>
                                <input type="text" className='mt-1 p-2 w-full border border-gray-300 rounded-md' />
                            </div>
                            <div className='flex justify-end'>
                                <button type="button" onClick={() => setShowForm(false)} className='mr-4 py-2 px-4 bg-gray-300 text-gray-700 rounded-lg'>
                                    {t('Ortga')}
                                </button>
                                <button type="submit" className='py-2 px-4 bg-blue-500 text-white rounded-lg'>
                                    {t('Yuborish')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Card;
