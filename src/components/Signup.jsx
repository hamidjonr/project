import React, { useContext, useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firbese';
import {AuthContext} from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom';
import { Input } from 'antd';
export const Signup = () => {
    const navigate = useNavigate()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const {dispatch} = useContext(AuthContext)
    const handleSignUp = ()=>{
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            dispatch({type:'LOGIN',payload:user.uid})
            navigate('/profile')
        })
        .catch((error) => {
            console.log(error);
        });
        setEmail('')
        setPassword('')
    }
    return (
        // <div>
        //     <h1 className='text-3xl'>Sign Up</h1>
        //     <br /><br />
        //     <label>
        //         <span>Email</span>
        //         <input value={email} type="email" onChange={(e)=>setEmail(e.target.value)}/>
        //     </label><br />
        //     <label className='mt-[20px]'>
        //         <span>Password</span>
        //         <input value={password} type="password" onChange={(e)=>setPassword(e.target.value)}/>
        //     </label><br />
        //     <button onClick={handleSignUp}>Sign Up</button>
        // </div>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create your new account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6">
      <div>
        <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div className="mt-2">
          <input id="email" value={email} onChange={(e)=>setEmail(e.target.value)} type="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
        </div>
        <div className="mt-2">
         <Input.Password  onChange={(e)=>setPassword(e.target.value)} value={password} id="password" type="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></Input.Password>
        </div>
      </div>

      <div>
        <button onClick={handleSignUp} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm text-gray-500">
    Already have an account? 
      <Link to='/signin'><button className='ml-[20px]'>Sign In</button></Link>
    </p>
  </div>
</div>
    )
}