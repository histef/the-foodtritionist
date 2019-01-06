import React, { Component } from 'react';
import { ListGroupItem } from 'reactstrap';


class ItemListGroup extends Component {
  render() {
    return (
      this.props.searchListItems.map(item =>
      (
        <ListGroupItem
          className='list-group-item'
          key={item.ndbno}
          name={item.name}
        >{this.props.displayListName(`${item.name}`)}
        </ListGroupItem>
      ))
    )
  }
}

export default ItemListGroup;