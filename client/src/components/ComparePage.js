import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardTitle, CardText } from 'reactstrap';
import './Compare.css';

class Compare extends Component {
  render(){

    const { item1, cal1, cal2, vitE1, vitE2, item2, fat1, fat2, sugar1, sugar2 } = this.props;

    return (
      <div className='body'>
        <main style={{display: 'flex', alignItems: 'center'}}>
          <Card body className="text-center display">
            <CardTitle>{item1.name}</CardTitle>
            <CardText>calories: {cal1}</CardText>
            <CardText>fat: {fat1}grams</CardText>
            <CardText>vitamin E: {vitE1}</CardText>
            <CardText>sugar: {sugar1}g</CardText>
          </Card>
          <h1 id='versus'>vs</h1>
          <Card body className="text-center display">
          <CardTitle>{item2.name}</CardTitle>
            <CardText>calories: {cal2}</CardText>
            <CardText>fat: {fat2}grams</CardText>
            <CardText>vitamin E: {vitE2}</CardText>
            <CardText>sugar: {sugar2}g</CardText>
          </Card>
        </main>
        <Link to='/'>
          <p className='link'>compare two other items...</p>
        </Link>
        </div>
    )
  }
}

export default Compare;