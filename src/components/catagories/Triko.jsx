import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firbese';
import { Link } from 'react-router-dom';
import { Footer } from 'antd/es/layout/layout';

// Helper function to shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const Triko = () => {
    const [triko, setTriko] = useState([]);
    const anType = 'Animal';

    useEffect(() => {
        const dbDefProducts = collection(db, 'defaultProducts');

        const unsubscribe = onSnapshot(dbDefProducts, (snapshot) => {
            const animalList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setTriko(animalList);
        }, (err) => {
            console.error(err);
        });

        return () => unsubscribe();
    }, []);

    const shuffledtriko = shuffleArray([...triko]);
    const slicedTriko = shuffledtriko.slice(0, 12);

    return (
        <div>
            <section className="text-gray-600 body-fon">
                <div className="container px-5 py-4 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {slicedTriko.filter(animal => animal.type === anType).map(animal => (
                            <div key={animal.id} className="lg:w-1/4 md:w-1/2 p-4 w-full border-l-8  border-y-[10px] rounded-r-3xl">
                                <a className="block relative h-80 rounded overflow-hidden">
                                    <img
                                        alt={animal.name}
                                        className="object-cover object-center w-full h-full block"
                                        src={animal.imgUrl}
                                    />
                                </a>
                                <div className="mt-4">
                                    <h1 className="text-gray-900 title-font text-xl font-medium">{animal.name}</h1>
                                    <h2 className="text-gray-500 text-lg tracking-widest title-font mb-1">{animal.region}</h2>
                                    <p className="mt-1">So'm {animal.price}</p>
                                    <Link to='/' className='text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded'>
                                        <button className='pl-2'>Back</button>
                                    </Link>
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

export default Triko;
