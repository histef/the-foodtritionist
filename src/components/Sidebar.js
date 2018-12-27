import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap'
import './Sidebar.css';

const Sidebar = ({ item1, item2}) => {
  return (
    <div className='side-bar'>
      <div className='comp-list-item'>
        <p>{item1.name}</p>
      </div>
      <div className='comp-list-item'>
       <p>{item2.name}</p>
      </div>
        <Link to='/comparepage'>
          <Button
            className='compare-btn'
          >Compare</Button>
        </Link>
    </div>
  )
}

export default Sidebar;