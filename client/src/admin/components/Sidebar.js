import React, { useContext } from 'react'
import { UserContext } from '../../shared/components/UserContext';

function Sidebar(props) {
    const {user} = useContext(UserContext);
    
    
   
    const {setCurrentPage} = props;
    const handleClick = (page) => {
        setCurrentPage(page);
    }
  return (
    <div className='bg-white sidebar p-2'>
        <div className='m-2'>
            <i className='bi bi-bootstrap-fill me-3 fs-4'></i>
            <span className='brand-name fs-4'>{user ? user.user.username : 'Welcome'}</span>
        </div>
        <hr className='text-dark' />
        <div className='list-group list-group-flush'>
            <a className='list-group-item py-2' onClick={() => handleClick('dashboard')}>
                <i className='bi bi-speedometer2 fs-5 me-3'></i>
                <span className='fs-5'>Dashboard</span>
            </a>
            <a className='list-group-item py-2' onClick={() => handleClick('home')}>
                <i className='bi bi-house fs-5 me-3'></i>
                <span className='fs-5'>Home</span>
            </a>
            <a className='list-group-item py-2' onClick={() => handleClick('employees')}>
                <i className='bi bi-people fs-5 me-3'></i>
                <span className='fs-5'>Employees</span>
            </a>
            <a className='list-group-item py-2' onClick={() => handleClick('shifts')}>
                <i className='bi bi-table fs-5 me-3'></i>
                <span className='fs-5'>Shifts</span>
                
            </a>
            <a className='list-group-item py-2'>
                <i className='bi bi-power fs-5 me-3'></i>
                <span className='fs-5'>Logout</span>
                
            </a>
            
        </div>
    </div>
  )
}

export default Sidebar;