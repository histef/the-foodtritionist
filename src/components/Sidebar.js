import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap'
import './Sidebar.css';

const Sidebar = ({ item1, item2, removeChosenItem}) => {
  return (
    <div className='side-bar'>
      <div className='comp-list-item item1'>
        <p
        className='close-btn'
        onClick={e => removeChosenItem(e)}
        >X</p>
        <p className="item-title">{item1.name}</p>
      </div>
      <div className='comp-list-item item2'>
        <p
          className='close-btn'
          onClick={e => removeChosenItem(e)}
        >X</p>
        <p className="item-title">{item2.name}</p>
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