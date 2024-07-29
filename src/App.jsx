import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './assets/images/INTO-logo.png'
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import LanguageSelector from './components/LanguageSelector';
import { useTranslation } from 'react-i18next';
import { FaRegHeart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import Home from './components/Home';
import { useEffect } from 'react';
import { SignIn } from './components/Signin';
import Profile from './components/Profile';
import { signOut } from 'firebase/auth';
import { useContext } from 'react';
import { AuthContext } from '../src/context/AuthContext';
import { auth } from '../src/firbese';
import ProductDetails from './components/ProductDetails';
import LikedProducts from './components/LikedProducts';
import Search from './components/Search';
import Aos from 'aos';
import 'aos/dist/aos.css'
import Breadcrumbs from './components/Breadcrumbs';
import Card from './components/Card';
import Futbolka from './components/catagories/Futbolka';
import Kuylak from './components/catagories/Kuylak';
import Batnik from './components/catagories/Fashion';
import { Triko } from './components/catagories/Triko';
import Shortik from './components/catagories/Shortik';
import Tapochka from './components/catagories/Tapochka';
import Dvoyka from './components/catagories/Dvoyka';
import Shim from './components/catagories/Shim';
function App() {
  const { t } = useTranslation()
  useEffect(() => {
    Aos.init()
  })
  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: 'LOGOUT' })
        navigate('/')
      }).catch((err) => {
        console.log(err);
      })
  }
  const items = [
    {
      key: '1',
      label: (
        <button>
          <Link to='/' className='text-black no-underline'><p>{t("Home")}</p></Link>
        </button>
      )
    },
    {
      key: '2',
      label: (
        <button>
          <Link to='/search' className='text-black no-underline'><p>{t("placeholder")}</p></Link>
        </button>
      )
    },
    {
      key: '3',
      label: (
        <button><LanguageSelector /></button>
      )
    },
    {
      key: '4',
      label: (
        <Link to='profile'>
          <button className='py-2 px-6 rounded text-black font-bold text-lg'>
            {t('Admin')}!
          </button>
        </Link>
      )
    },
    {
      key: '5',
      label: (
        <button onClick={handleSignOut} className='logout hover:underline'>Log Out</button>
      )
    },

  ];
  const { currentUser } = useContext(AuthContext);
  const RequiredAuth = ({ children }) => {
    return currentUser ? children : navigate('signin');
  }


  return (
    <>
      <nav className='bg-blue-gray-50 py-2 navs' data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="800">
        <div className="nav-wrapper flex items-center max-w-screen-xl mx-auto justify-between">
          <div className="nav-logo w-20">
            <Link to='/'>
              <img src={logo} alt="Site Logo" />
            </Link>
          </div>
          <div className="nav-right-side flex gap-12 items-center nav-j">
            <div className='flex gap-4 hidden md:flex items-center'>
              <Link to='/' className='text-black text-lg nav-serch no-underline'>
                <p>{t("Home")}</p>
              </Link>
              <Link to='/search' className='text-black text-lg nav-serch no-underline'>
                <p>{t("placeholder")}</p>
              </Link>
              <LanguageSelector className="hover:underline" />
            </div>
            <div className="nav-user-like flex gap-8 items-center">
              <Link to='/card' aria-label="Shopping Cart">
                <i className="fa-solid fa-bucket text-xl text-black hover:text-gray-300"></i>
              </Link>
              <Link to='/likedproducts2' aria-label="Liked Products">
                <FaRegHeart className='text-xl text-black hover:text-gray-300' />
              </Link>
              <Link to='profile'>
                <div className="profile flex items-center gap-4">
                  <FaUser className='text-black no-underline' />
                  <Dropdown menu={{ items }}>
                    <a onClick={(e) => e.preventDefault()} aria-label="Profile Menu" className='profile12'>
                      <Space className='text-black text-lg font-bold cursor-pointer items-center hover:underline'>
                        {t('profile')}
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                </div>
              </Link>
            </div>
            <div className="nav-button">
              <Link to='profile'>
                <button className='bg-white py-2 px-6 rounded text-black font-bold text-lg hover:bg-gray-200'>
                  {t('Admin')}!
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>


      <Breadcrumbs />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='signup' element={<Signup />} /> */}
          <Route path='signin' element={<SignIn />} />
          <Route path='productdetail/:productId' element={<ProductDetails />} />
          <Route path='profile' element={<RequiredAuth> <Profile /></RequiredAuth>} />
          <Route path='likedproducts2' element={<LikedProducts />}></Route>
          <Route path='kuylak' element={<Kuylak />}></Route>
          <Route path='futbolka' element={<Futbolka />}></Route>
          <Route path='shim' element={<Shim />}></Route>
          <Route path='triko' element={<Triko />}></Route>
          <Route path='batnik' element={<Batnik />}></Route>
          <Route path='shortik' element={<Shortik />}></Route>
          <Route path='dvoyka' element={<Dvoyka />}></Route>
          <Route path='tapochka' element={<Tapochka />}></Route>
          <Route path='search' element={<Search />}></Route>
          <Route path='card' element={<Card />}></Route>
        </Routes>
      </main>
    </>
  )
}

export default App

