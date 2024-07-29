import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firbese';

const Dvoyka = () => {
    const spItType = 'Sport Items';
    const [dvoykaItems, setDvoyka] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const defaultProducts = collection(db, 'defaultProducts');

        const unsubscribe = onSnapshot(defaultProducts, (snapshot) => {
            const sportItemsList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setDvoyka(sportItemsList);
            setLoading(false);
        }, (err) => {
            console.error('Error fetching sport items:', err);
            setError('Failed to load sport items. Please try again later.');
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
                    <div className="flex flex-wrap -m-4">
                        {dvoykaItems.filter(item => spItType === item.type).map((item) => (
                            <div key={item.id} className="lg:w-1/4 md:w-1/2 p-4 w-full border-l-8  border-y-[10px] rounded-r-3xl">
                                <a className="block relative h-80 rounded overflow-hidden">
                                    <img
                                        alt={item.name}
                                        className="object-cover object-center w-full h-full block"
                                        src={item.imgUrl}
                                    />
                                </a>
                                <div className="mt-4">
                                    <h1 className="text-gray-900 title-font text-xl font-medium">{item.name}</h1>
                                    <h2 className="text-gray-500 text-lg tracking-widest title-font mb-1">{item.region}</h2>
                                    <p className="mt-1">So'm {item.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dvoyka;
