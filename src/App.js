import React from 'react';
import './App.css';
import Header from './Header';
import ListCategories from './ListCategories';
import ListCurrently from './ListCurrently';
import ListRead from './ListRead';

import Client from 'shopify-buy';

// Initializing a client
const client = Client.buildClient({
  domain: 'pao-pao-demo-dev.myshopify.com',
  storefrontAccessToken: '3bd58e34aef0c3ae62c4413990451169'
});

class App extends React.Component {

  state = {
    products: [],
    readings: [],
    reads: []
  }
  componentDidMount() {
    // Fetch all products in shop
    client.product.fetchAll().then((products) => {
      // console.log(products);
      this.setState(() => ({
        products
      }))
    });
  }

  addToReadingList = (product) => {
    // const key = product.id
    console.log("product", typeof(product))
    this.setState((currentState) => ({
      products: currentState.products.filter((c) => c.id !== product.id),
      readings: currentState.readings.concat(product),
    }))
  }

  addToReadList = (product) => {
    this.setState((currentState) => ({
      products: currentState.products,
      readings: currentState.readings.filter((c) => c.id !== product.id),
      reads: currentState.reads.concat(product)
    }))
  }

  addToCategoriesList = (product) => {
    this.setState((currentState) => ({
      products: currentState.products.concat(product),
      readings: currentState.readings.filter((c) => c.id !== product.id),
    }))
  }

  render(){
    return (
      <div>
        <Header />
        <ListCategories products={this.state.products} onAddToReadingList={this.addToReadingList}/>
        {Object.keys(this.state.readings).length ? <ListCurrently readings={this.state.readings} onAddToReadList={this.addToReadList} onAddToCategoriesList={this.addToCategoriesList}/> : ''}
        {Object.keys(this.state.reads).length ? <ListRead read={this.state.reads} /> : ''}
      </div>
    );
  }
}

export default App;
