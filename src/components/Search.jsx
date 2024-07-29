import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SearchOutlined } from '@ant-design/icons';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firbese';
import { Input, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import Footer from './Footer';
import { FaCartShopping } from 'react-icons/fa6';
import Skeleton from 'react-loading-skeleton';
import '../App.css';

export const Search = () => {
    const [defProducts, setDefProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [count, setCount] = useState(0);
    const { t } = useTranslation();

    useEffect(() => {
        const dbDefProducts = collection(db, 'defaultProducts');
        const unsubscribe = onSnapshot(dbDefProducts, (snapshot) => {
            let defproductList = [];
            snapshot.docs.forEach((doc) => {
                defproductList.push({ id: doc.id, ...doc.data() });
            });
            setDefProducts(defproductList);
        });

        return () => unsubscribe();
    }, []);

    const handleCart = (dataCard) => {
        let data = localStorage.getItem('cards');

        if (data) {
            data = JSON.parse(data);
        } else {
            data = [];
        }

        const existingItem = data.find((item) => item.id === dataCard.id);
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

        localStorage.setItem('cards', JSON.stringify(data));

        notification.success({
            message: "Savatga qo'shildi!",
            description: "Tanlagan mahsulotingiz savatga qo'shildi. Savatga o'tib buyurtma berishingiz mumkin!",
        });

        setCount((prevCount) => prevCount + 1);
    };

    return (
        <div>
            <div className='pb-[30px] pt-[1px]'>
                <div className='search-input text-center mt-[60px] mx-2'>
                    <div className='input-group mb-3 m-auto max-w-[1200px]'>
                        <Input
                            type='text'
                            onChange={(event) => setSearchTerm(event.target.value)}
                            placeholder="Recipient's username"
                            prefix={<SearchOutlined className='text-[24px]' />}
                            className='w-[1200px] rounded-lg h-[60px] border-black box-border pl-[20px] input'
                        />
                    </div>
                </div>
            </div>
            <section className='text-gray-600 body-font'>
                <div className='container px-5 py-24 mx-auto'>
                    <div className='flex flex-wrap -m-4'>
                        {defProducts
                            .filter((val) => {
                                if (searchTerm === '') {
                                    return val;
                                } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                    return val;
                                }
                                return null;
                            })
                            .map((product) => (
                                <div className='bg-white w-[280px] rounded-md leading-none' key={product.id}>
                                    <div className='h-full border-2 border-opacity-60 rounded-lg overflow-hidden'>
                                        <img
                                            // className='lg:h-80 md:h-36 w-auto object-cover object-center'
                className='w-[100%] max-w-[280px] h-[300px] rounded-t-md' 

                                            src={product.imgUrl}
                                            alt={product.name}
                                        />
                                        <div className='p-6'>
                                            <h2 className='tracking-widest text-xs title-font font-medium text-gray-400 mb-1'>
                                                CATEGORY
                                            </h2>
                                            <h1 className='title-font text-lg font-medium text-gray-900 mb-3'>{product.name}</h1>
                                            <p className='text-[14px] font-normal'>{product.price} ming</p>
                                            <p className='text-[14px] font-normal'>{product.region}</p>
                                            <p className='text-[14px] font-normal'>{product.time}</p>
                                            <div className='flex items-center flex-wrap'>
                                                <Link to={`/productdetail/${product.id}`}>
                                                    <button className='btn btn-primary'>{t('View')}</button>
                                                </Link>
                                                <FaCartShopping
                                                    className='text-[24px] cursor-pointer ml-4'
                                                    onClick={() => handleCart(product)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
            
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Search;
