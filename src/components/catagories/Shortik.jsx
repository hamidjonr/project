import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firbese';
import { Footer } from 'antd/es/layout/layout';

const Shortik = () => {
    const [shortik, setShortik] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const furnitureType = 'Furniture';

    useEffect(() => {
        const defaultProducts = collection(db, 'defaultProducts');

        const unsubscribe = onSnapshot(defaultProducts, (snapshot) => {
            const furnitureList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setShortik(furnitureList);
            setLoading(false);
        }, (err) => {
            console.error('Error fetching furniture items:', err);
            setError('Failed to load furniture items. Please try again later.');
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading...</p> {/* Replace this with a spinner or loading component */}
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-4 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {shortik.filter(item => furnitureType === item.type).map((furniture) => (
                            <div key={furniture.id} className="lg:w-1/4 md:w-1/2 p-4 w-full border-l-8  border-y-[10px] rounded-r-3xl">
                                <a className="block relative h-80 rounded overflow-hidden">
                                    <img
                                        alt={`Image of ${furniture.name} in ${furniture.region}`}
                                        className="object-cover object-center w-full h-full block"
                                        src={furniture.imgUrl}
                                    />
                                </a>
                                <div className="mt-4">
                                    <h1 className="text-gray-900 title-font text-xl font-medium">{furniture.name}</h1>
                                    <h2 className="text-gray-500 text-lg tracking-widest title-font mb-1">{furniture.region}</h2>
                                    <p className="mt-1">So'm {furniture.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    );
};

export default Shortik;
