import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Select, Option } from "@material-tailwind/react";
import { collection, getDocs, deleteDoc, doc, onSnapshot, addDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useTranslation } from 'react-i18next';
import { db, imgDB } from '../firbese';
const Profile = () => {
    const [name, setName] = useState('')
    const [img, setImg] = useState('')
    const [region, setRegion] = useState('')
    const [price, setPrice] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [desc, setDesc] = useState('')
    const [defProducts, setdefProducts] = useState([])
    const [show, setShow] = useState(false)
    const [id, setId] = useState()
    const [showModal, setShowModal] = useState(false)
    const { t } = useTranslation()
    const time = new Date()
    const dbValue1 = collection(db, 'defaultProducts')
    const [selectedType, setSelectedType] = useState('');
    const handleEdit = async (id, name, region, price, imgUrl) => {
        setName(name)
        setPrice(price)
        setRegion(region)
        setId(id)
        setShow(true)
        setImg(imgUrl)
        setShowModal(true)
    }
    const handleUpdate = async () => {
        const updateData = doc(db, 'defaultProducts', id)
        await updateDoc(updateData, { name: name, region: region, price: price, imgUrl: img })
        setShow(false)
        setName('')
        setRegion('')
        setPrice('')
        closeModal()
    }
    const handleSubmit = async () => {
        const day = time.getDate()
        const month = time.getMonth()
        const year = time.getFullYear()
        const hour = time.getHours()
        const minute = time.getMinutes()
        const allTime = hour + ':' + minute + '  ' + day + '/' + (month + 1) + '/' + year
        await addDoc(dbValue1, {
            name: name,
            region: region,
            price: price,
            imgUrl: img,
            phoneNumber: phoneNumber,
            desc: desc,
            userId: localStorage.getItem('user'),
            liked: false,
            time: allTime,
            type: selectedType,
        })
        setShowModal(false)
        setShow(false)
    }
    const closeModal = () => {
        setShowModal(false)
    }
    useEffect(() => {
        onSnapshot(
            dbValue1,
            (snapshot) => {
                let userList = []
                snapshot.docs.forEach((doc) => {
                    userList.push({ id: doc.id, ...doc.data() })
                })
                setdefProducts(userList)
            }
        ), (err) => {
            console.log(err);
        }
    }, [])
    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "defaultProducts", id));
    }
    const handleUpload = (e) => {
        console.log(e.target.files[0])
        const imgs = ref(imgDB, `Imgs/${uuidv4()}`)
        uploadBytes(imgs, e.target.files[0]).then(data => {
            console.log(data, "imgs")
            getDownloadURL(data.ref).then(val => {
                setImg(val)
            })
        })
    }
    const getData = async () => {
        const dataDb = await getDocs(dbValue1)
        const allData = dataDb.docs.map(val => ({ ...val.data(), id: val.id }))
        setdefProducts(allData)
    }
    useEffect(() => {
        getData()
    })

    return (
        <div>
            <h1 className='text-center mt-[50px]'>{t('profileTitle')}</h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-[40px]">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                                {t('prTime')}
                            </th>
                            <th scope="col" className="px-6 py-3">
                                {t('prPrice')}
                            </th>
                            <th scope="col" className="px-6 py-3">
                                {t('prEdit')}
                            </th>
                            <th scope="col" className="px-6 py-3">
                                {t('prDelete')}
                            </th>
                            <button className='btn btn-success mt-[3px]' onClick={() => setShowModal(true)}>{t('prCreateNew')}</button>
                        </tr>
                    </thead>
                    {defProducts.filter(item => item.userId == localStorage.getItem('user')).map((defPro) => {
                        return (
                            <tbody>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <img src={defPro.imgUrl} alt="" className='w-[80px] rou rounded-[10px]' />
                                    </th>
                                    <td className="px-6 py-4">
                                        {defPro.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {defPro.region}
                                    </td>
                                    <td className="px-6 py-4">
                                        {defPro.time}
                                    </td>
                                    <td className="px-6 py-4">
                                        ${defPro.price}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button href="#" className="font-medium text-blue-600 dark:text-blue-500 btn btn-primary" onClick={() => handleEdit(defPro.id, defPro.name, defPro.region, defPro.price, defPro.imgUrl)} >Edit</button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button href="#" className="font-medium text-red-600 dark:text-blue-500 btn btn-danger" onClick={() => handleDelete(defPro.id)}>Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
            </div>
            {showModal &&
                <div id="authentication-modal" tabindex="-1" aria-hidden="true" className=" flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Add your new product
                                </h3>
                                <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" onClick={closeModal}>
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-4 md:p-5">
                                <div className=" sm:mx-auto sm:w-full sm:max-w-sm ">
                                    <div className="w-92 mt-[15px] mb-[15px]">
                                    </div>
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">{t("Name")}</label>
                                        <div className="mt-2">
                                            <input id="name"
                                                onChange={(event) => setName(event.target.value)}
                                                value={name}
                                                type="text"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="surname" className="block text-sm font-medium leading-6 text-gray-900">{t("Price")}</label>
                                        </div>
                                        <div className="mt-2">
                                            <input id="surname"
                                                onChange={(event) => setPrice(event.target.value)}
                                                value={price}
                                                type="text"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="age" className="block text-sm font-medium leading-6 text-gray-900">{t("Region")}</label>
                                        </div>
                                        <div className="mt-2">
                                            <input id="age"
                                                onChange={(event) => setRegion(event.target.value)}
                                                value={region}
                                                type="text"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">{t("Telefonraqam")}</label>
                                        </div>
                                        <div className="mt-2">
                                            <input id="phoneNumber"
                                                onChange={(event) => setPhoneNumber(event.target.value)}
                                                value={phoneNumber}
                                                type="number"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="desc" className="block text-sm font-medium leading-6 text-gray-900">{t("Description")}</label>
                                        </div>
                                        <div className="mt-2">
                                            <input id="desc"
                                                onChange={(event) => setDesc(event.target.value)}
                                                value={desc}
                                                type="text"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div className='py-[10px] mt-[10px]'>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="imgInput" className="block text-sm font-medium leading-6 text-gray-900">{t("prImage")}</label>
                                        </div>
                                        <div className="mt-2">
                                            <input value={img}
                                                onChange={(e) => { setImg(e.target.value); }} type="text" id="email" name="email" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
    
                                        </div>
                                    </div>
                                    <Select className='' label={t("SelectType")} value={selectedType} onChange={value => setSelectedType(value)}>
                                        <Option value='Kids world'>{t("kw")}</Option>
                                        <Option value='Work'>{t("house")}</Option>
                                        <Option value='Fashion'>{t("transport")}</Option>
                                        <Option value='Animal'>{t("work")}</Option>
                                        <Option value='Furniture'>{t("animal")}</Option>
                                        <Option value='Transport'>{t("furniture")}</Option>
                                        <Option value='Electrical Items'>{t("elecItems")}</Option>
                                        <Option value='Sport Items'>{t("services")}</Option>
                                        <Option value='House'>{t("fashion")}</Option>
                                    </Select>
                                    {!show ? <button
                                        onClick={handleSubmit}
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-[15px]">Submit
                                    </button> :
                                        <button
                                            onClick={handleUpdate}
                                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
export default Profile