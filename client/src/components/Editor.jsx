import React, { useEffect, useRef, useState } from 'react'
import Client from './Client'
import EditorPortal from './EditorPortal'
import { initSocket } from '../socket/socket'
import { useLocation, useParams, useNavigate, Navigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'



function Editor() {
  const [clients, setClients] = useState([])
  const socketRef = useRef(null)
  const location = useLocation()
  const { roomId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket()
      socketRef.current.on('connect_error', (err) => handleErrors(err))
      socketRef.current.on('connect_failed', (err) => handleErrors(err))

      const handleErrors = (err) => {
        console.log('Socket connection error', err)
        toast.error('Socket connection error')
        navigate('/')
      }
      socketRef.current.emit('join', {
        roomId: roomId,
        username: location.state?.username
      })
      // emitting other users if new user joins the room
      socketRef.current.on('new-user-joined', ({ clients, username, socketId }) => {
        if (username !== location.state?.username) {
          toast.success(`${username} joined the room`)
        }
        setClients(clients)
        socketRef.current.emit('sync-code', {code}) 
      })

      // disconnecting the user
      socketRef.current.on('disconnected', ({ socketId, username }) => {
        toast(`${username} left the room`)
        setClients((prevClients) => prevClients.filter((client) => client.socketId !== socketId))
      })
    }
    init()
    return () => {
      socketRef.current.disconnect()
      socketRef.current.off('joined')
      socketRef.current.off('disconnected')
    }
  }, [])

  if (!location.state) {
    return <Navigate to='/' />
  }

  return (
    <div className='flex gap-6 h-screen'>
      {/* left side div to show session members */}
      <div className='flex flex-col min-w-[20%] max-w-[20%] bg-gray-950 pt-8'>


        {/* logo and app name part */}
        <div className='flex justify-center gap-6 items-center w-full'>
          <img className='rounded-full w-[70px] h-[70px%]' src="https://encrypted-tbn0.gstatic.com/
              images?q=tbn:ANd9GcQ9RdrLRdPpAGt2MZ08BUa6Jprv7KSisVarb_myM7wN5
              -UrmjIdgsj7WBK8SqBzTCcXrOw&usqp=CAU" alt="" />
          <div className=' min-h-[80px] border-white border-l-2'></div>
          <h1 className='text-white text-2xl'>CodeShow</h1>
        </div>
        <div className='w-[80%] ml-[10%] border-white border-b-[1px] mt-8'></div>


        {/* middle part for session members */}
        <div className='flex-1 pl-6 mt-4 max-w-full'>
          <p className='text-white'>Members</p>
          <div className='flex flex-wrap gap-8 mt-6'>
            {
              clients.map((client) => (
                <Client key={client.socketId} username={client.username} />
              ))
            }
          </div>
        </div>
        <div className='w-[75%] ml-[10%] border-white border-b-[1px] mt-8'>
        </div>


        {/* bottom buttons part */}
        <div className='w-full mb-8 pt-10'>
          <div className='flex justify-around '>
            <button className='bg-green-600 p-4 rounded-full hover:bg-green-900 hover:text-white'>Copy Room ID</button>
            <button className='bg-red-500 p-4 rounded-full hover:bg-red-900 hover:text-white'>Leave Room</button>
          </div>
        </div>
      </div>


      {/* right side div where the codemirror screen will come */}
      <div className='flex-1 m-5'>
        <EditorPortal socketRef = {socketRef} roomId = {roomId}/>
      </div>
    </div>
  )
}

export default Editor