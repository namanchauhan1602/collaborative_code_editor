import React from 'react'
import Avatar from 'react-avatar'

function Client({ username }) {
    return (
        <div className='flex items-center gap-2'>
            <Avatar name={username.toString()} size={40} round={true} />
            <p className='text-white'>{username.toString()}</p>
        </div>
    )
}

export default Client