import React from 'react'
import assets from '../assets/assets'

const ProfilePage = () => {
  return (
    <div className='min-h-screen w-full bg-cover bg-no-repeat flex items-center justify-center'>
      <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
        <form className='flex flex-col gap-5 p-10 flex-1'>
          <h1 className='text-lg'>Profile Details</h1>
          <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
            <input type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden/>
            <img src={assets.gallery_icon} alt="" />
          </label>
        </form>
        <img src="" alt="" />
      </div>
    </div>
  )
}

export default ProfilePage