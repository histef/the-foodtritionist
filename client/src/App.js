import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Compare from './components/ComparePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormGroup, Label, Input, ListGroup, ListGroupItem } from 'reactstrap';
import './App.css';

class App extends Component {

  state = {
    search: '',
    searchListItems: [],
    item1: [],
    item2: [],
    cal1: [],
    vitE1: [],
    fat1: [],
    sugar1: [],
    item1Card: false,
    item2Card: false,
    cal2: [],
    vitE2: [],
    fat2: [],
    sugar2: [],
    openSideBar: false,
    compareBtnClicked: false
  }
  
  onSearch = e => {
    this.setState({
      search: e.target.value
    })
  }

  onSearchSubmit = e => {
    e.preventDefault();

    //handle if user doesn't enter item-->throw error
    if (!this.state.search) {
      //eventually render this message
      console.log('please enter item');
    } else {
    //make fetch call to search for item 1 and 2
    fetch(`https://api.nal.usda.gov/ndb/search/?format=json&q=${this.state.search}&sort=n&max=10&offset=0&api_key=deSFRe23fryJ5XJpEjRJwqWhVGkfFWzXWvpymagG`)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        this.setState({
          searchListItems: data.list.item
        })
      })
      .catch(error => console.log(error))
    }
  }

  onPagination = () => {
    //grab next 10-15 list items...or fetch all then store all data and just render 10-15 at a time...
    //function that knows what array index(dynamic) to start at
    // 10-19, 20-29, etc.
    //each time button is pressed add 10 to a counter.
  }

  checkValues = (nutrient) => {
    if(nutrient === "--"){
      return 0;
    } else {
      return nutrient;
    }
  }

  //user chooses items for search results
  onChooseItem = (e) => {
    const { item1Card, searchListItems } = this.state;
    const item = searchListItems.filter(item => e.target.getAttribute('name') === item.name);
    const itemId = item[0].ndbno;

    //if this.state for item1 is filled, then setState for item2, or else setState to item1
    if (item1Card) {
      fetch(`https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=KqBwC25CfgRxoNXgvoA3ej3Qxv205mji8YsVpvgo&nutrients=203&nutrients=204&nutrients=205&nutrients=208&nutrients=269&nutrients=323&ndbno=${itemId}`)
      .then(resp=>resp.json())
      .then(resp=>{
        this.setState({
          item2: resp.report.foods[0],
          cal2: resp.report.foods[0].nutrients[0].value,
          vitE2: resp.report.foods[0].nutrients[2].value,
          fat2: resp.report.foods[0].nutrients[4].value,
          sugar2: resp.report.foods[0].nutrients[3].value,
          item2Card: true
        })
      })
    } else {
      fetch(`https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=KqBwC25CfgRxoNXgvoA3ej3Qxv205mji8YsVpvgo&nutrients=203&nutrients=204&nutrients=205&nutrients=208&nutrients=269&nutrients=323&ndbno=${itemId}`)
      .then(resp=>resp.json())
      .then(resp=>{
        console.log(resp);
        this.setState({
          item1: resp.report.foods[0],
          cal1: resp.report.foods[0].nutrients[0].value,
          vitE1: resp.report.foods[0].nutrients[2].value,
          fat1: resp.report.foods[0].nutrients[4].value,
          sugar1: resp.report.foods[0].nutrients[3].value,
          item1Card: true,
          openSideBar: true
        })
      })
    }
  }

  render() {

    const { searchListItems, item1, item2 } = this.state;

    return (
      <div className="App">
        <Route exact path='/' render={()=>(
          <div> 
            <header className="App-header">
              <h1>Enter Food</h1>
            </header>
            <Form inline className='searchfield'>
              <FormGroup>
                <Label for='search'>
                  <Input id='search' className='search-text' onChange={e=>this.onSearch(e)} type='search' placeholder='enter food item'/>
                  <Input className='search-btn' type='submit' value='Search' onClick={e=>this.onSearchSubmit(e)}/>
                </Label>
              </FormGroup>
            </Form>
            <ListGroup
              className='list-group'
              onClick={e=>this.onChooseItem(e)}>
            {
              searchListItems.length > 0
              ? searchListItems.map(item => (
                <ListGroupItem
                  className='list-group-item'
                  key={item.ndbno}
                  name={item.name}
                >{item.name}
                </ListGroupItem>
              ))
              : ''
            }
            </ListGroup>
            { this.state.openSideBar
              ? <Sidebar
                  item1={item1}
                  item2={item2}
                />
              : ''
            }
          </div>
        )} />
        <Route path='/comparepage' render={()=>(
          <Compare
          {...this.state}
          />
        )} />
      </div>
    );
  }
}

export default App;