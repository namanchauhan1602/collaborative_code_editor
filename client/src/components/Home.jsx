import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [roomID, setRoomID] = useState('')
  const [username, setUsername] = useState('')
  const navigater = useNavigate()

  const createNewRoom = (e) => {
    e.preventDefault()
    const id = nanoid(16)
    setRoomID(id)
    toast.success('New RoomID Generated')
  }
  
  const joinRoom = () => {
    if (roomID === '' || username === '') {
      toast.error('Please fill all the fields')
      return
    }
    navigater(`/editor/${roomID}`, {
      state: { username: username }
    })
    toast.success('New Room Created')
  }

  return (
    <>
      <div className='flex justify-center items-center p-4 h-screen'>
        <div className='flex flex-col border-white p-14 min-w-[700px] border-4 rounded-lg bg-gray-950'>


          {/* image and logo section */}
          <div className='flex justify-center gap-6 items-center w-full'>
            <img className='rounded-full w-[15%] h-[15%]' src="https://encrypted-tbn0.gstatic.com/
              images?q=tbn:ANd9GcQ9RdrLRdPpAGt2MZ08BUa6Jprv7KSisVarb_myM7wN5
              -UrmjIdgsj7WBK8SqBzTCcXrOw&usqp=CAU" alt="" />
            <div className=' min-h-[80px] border-white border-l-2'></div>
            <h1 className='text-white text-4xl'>CodeShow</h1>
          </div>


          {/* form section */}
          <div className='flex flex-col items-center mt-16'>
            <p className='text-white mb-8 text-2xl text-center'>Enter the room ID</p>
            <form className='w-[60%] flex flex-col gap-4' action="">
              <input className='p-3 rounded-3xl outline-none'
                type="text" name="" id="" placeholder='Room ID' value={roomID}
                onChange={(e) => setRoomID(e.target.value)}
              />
              <input className='p-3 rounded-3xl outline-none'
                type="text" name="" id="" placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button type='submit' className='rounded-3xl p-4
               bg-gray-600 max-w-24 
               hover:bg-gray-900 hover:text-white font-semibold'
                onClick={joinRoom}
              >Join</button>
            </form>
            <p className='text-white mt-4'>Don't have a Room ID? Create <span className='text-green-500 hover:text-green-800 cursor-pointer'
              onClick={createNewRoom}
            >New Room</span>.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home