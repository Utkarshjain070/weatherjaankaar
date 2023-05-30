import React from 'react';
import {Link} from 'react-router-dom'

const Nav = () => {
    return (
        <div className='bg-blue-400 flex justify-center items-center text-center p-2'>
            <div className='m-2'>
                <Link to="/">
<img src='./logo5.png' className='w-10' ></img></Link>
            </div>
            <div className='m-2 text-2xl font-sans font-medium'>
                Weather Jaankaar
            </div>
            
        </div>
    );
}

export default Nav;
