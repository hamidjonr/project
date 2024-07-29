import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firbese';
import { Footer } from 'antd/es/layout/layout';

const Futbolka = () => {
    const [Futbolka, setFutbolka] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const kwType = 'Kids world';

    useEffect(() => {
        const defaultProducts = collection(db, 'defaultProducts');

        const unsubscribe = onSnapshot(defaultProducts, (snapshot) => {
            const FutbolkaList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setFutbolka(FutbolkaList);
            setLoading(false);
        }, (err) => {
            console.error('Error fetching kids world items:', err);
            setError('Failed to load kids world items. Please try again later.');
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading...</p> {/* Replace with a spinner or loading component if needed */}
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
                    <div className="flex flex-wrap -m-4 ">
                        {Futbolka.filter(item => kwType === item.type).map((kw) => (
                            <div key={kw.id} className="lg:w-1/4 md:w-1/2 p-4 w-full border-l-8  border-y-[10px] rounded-r-3xl my-2">
                                <a className="block relative h-80 rounded overflow-hidden">
                                    <img
                                        alt={`Image of ${kw.name} in ${kw.region}`}
                                        className="object-cover object-center w-full h-full block" 
                                        src={kw.imgUrl}
                                    />
                                </a>
                                <div className="mt-4">
                                    <h1 className="text-gray-900 title-font text-xl font-medium">{kw.name}</h1>
                                    <h2 className="text-gray-500 text-lg tracking-widest title-font mb-1">{kw.region}</h2>
                                    <p className="mt-1">So'm {kw.price}</p>
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

export default Futbolka;
