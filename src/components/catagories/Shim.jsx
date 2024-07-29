import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firbese';
import { Footer } from 'antd/es/layout/layout';

const Shim = () => {
    const [shim, setShim] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const houseType = 'House';

    useEffect(() => {
        const defaultProducts = collection(db, 'defaultProducts');

        const unsubscribe = onSnapshot(defaultProducts, (snapshot) => {
            const housesList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setShim(housesList);
            setLoading(false);
        }, (err) => {
            console.error('Error fetching houses:', err);
            setError('Failed to load houses. Please try again later.');
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading...</p> {/* You can replace this with a spinner or loading component */}
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
                        {shim.filter(house => houseType === house.type).map((house) => (
                            <div key={house.id} className="lg:w-1/4 md:w-1/2 p-4 w-full border-l-8  border-y-[10px] rounded-r-3xl">
                                <a className="block relative h-80 rounded overflow-hidden">
                                    <img
                                        alt={`Image of ${house.name} located in ${house.region}`}
                                        className="object-cover object-center w-full h-full block"
                                        src={house.imgUrl}
                                    />
                                </a>
                                <div className="mt-4">
                                    <h1 className="text-gray-900 title-font text-xl font-medium">{house.name}</h1>
                                    <h2 className="text-gray-500 text-lg tracking-widest title-font mb-1">{house.region}</h2>
                                    <p className="mt-1">So'm {house.price}</p>
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

export default Shim;
