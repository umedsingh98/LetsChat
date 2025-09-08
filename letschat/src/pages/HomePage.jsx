import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import RightSidebar from '../components/RightSidebar'
import ChatContainer from '../components/ChatContainer'

const HomePage = () => {

  const [selectedUser, setSelectedUser] = useState(false);
  return (
    <div className='min-h-screen w-full text-white sm:px-[12%] sm:py-[5%]'>
      <div className={`h-[100%] backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden grid grid-cols-1 relative ${selectedUser ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' : 'md:grid-cols-2'}`}>
      <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      <ChatContainer selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
      <RightSidebar selectedUser={selectedUser}/>
    </div>
    </div>
  )
}

export default HomePage