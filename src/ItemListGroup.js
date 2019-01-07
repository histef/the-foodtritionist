import React from 'react';
import { ListGroupItem } from 'reactstrap';

const ItemListGroup = ({ adjSearchListItems }) => {
  return (
    adjSearchListItems.map(item =>
    (
      <ListGroupItem
        className='list-group-item'
        key={item.ndbno}
        name={item.name}
      >{item.displayName}
      </ListGroupItem>
    ))
  )
}

export default ItemListGroup;