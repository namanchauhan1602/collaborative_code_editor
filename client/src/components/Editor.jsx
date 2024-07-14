import React, { useState } from 'react'
import Client from './Client'
import EditorPortal from './EditorPortal'

function Editor() {

  const [clients, setClients] = useState([
    { socketId: 1, username: 'naman' },
    { socketId: 2, username: 'gaman' },
    { socketId: 3, username: 'haman' },
    { socketId: 4, username: 'oaman' }
  ])

  return (
    <div className='flex gap-6 h-screen'>
      {/* left side div to show session members */}
      <div className='flex flex-col max-w-[20%] bg-gray-950 pt-8'>


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
      <div className='flex-1 m-5 border-white border-2'>
        <EditorPortal />
      </div>
    </div>
  )
}

export default Editor