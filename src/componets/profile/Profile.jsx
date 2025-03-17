import React from 'react'
import ProfileNavbar from './Navbar/ProfileNavbar'
import cat from '../../assets/profileImg/user.png'
import Footer from '../Footer/Footer'
import Leson from './lessons/Lesons'
function Profile() {
  const storedArray = JSON.parse(localStorage.getItem("myArray"));
  return (
    <div className='text-white bg-slate-900 min-h-[100vh] flex flex-col'>
      <ProfileNavbar />
      <div className='flex-grow'>
        <div className='mt-6 text-center pt-20'>
          <img src={cat} alt="user" className='w-[200px] h-[200px] object-cover rounded-full mix-blend-screen mx-auto border p-1' />
          <h1 className="text-[24px] mt-3 font-semibold">{storedArray?.firstname} {storedArray?.lastname}</h1>
        </div>
        <h1 className='max-sm:ml-6 sm:ml-6 md:ml-12 text-3xl mt-12 max-sm:text-2xl '>Fanlar</h1>
        <Leson />
      </div>
      <Footer />
    </div>
  )
}

export default Profile

