import React from 'react'
import Button from './Button'

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between px-8 h-16'>
        <h2 className='text-lg font-semibold'>Task Manager</h2>  
        
        <div>
            <Button text={'Login'} bg={'bg-[rgba(39, 44, 53, 0.792)]'} color={'text-white'}/>
            <Button text={'Sign Up'}/>
        </div>
    </nav>
  )
}

export default Navbar
