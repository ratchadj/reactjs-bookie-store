import React from 'react';
import './App.css';
import Header from './Header';
import Search from './Search';
import ListCategories from './ListCategories';
import ListCurrently from './ListCurrently';
import ListRead from './ListRead';
import axios from 'axios';

class App extends React.Component {

  state = {
    query: '',
    products: [],
    readings: [],
    reads: [],
    displayProducts: [],
    displayReadProducts: [],
    displayReadingProducts: []
  }
  componentDidMount() {
    this.setProductsWantToReadCollection();
    this.setProductsReadingCollection();
    this.setProductsReadCollection();
  }

  updateTag = (productId, tag) => {
    return {
      "product": {
        "id": productId,
        "tags": tag
      }
    }
  }

  updatePrroductAttribute = (productId, body) => {
    const url = "http://localhost:8080/updatePrroductAttribute/" + productId
    axios.put(url, body).then(function(response){
        console.log("updatePrroductAttribute:",response);
    })
    .catch((error) => {
        // Error
        if (error.response) {
            console.log(error.response.data);

        } 
        else if (error.request) {
            console.log(error.request);
        } 
        else {
            console.log('Error', error.message);
        }
    });
  }

  setProductsWantToReadCollection = async () => {
      const url = "http://localhost:8080/getProductsByCollection/181339193482"
      let response = await axios.get(url);
      console.log("setProductsWantToReadCollection", response.data.products)
      this.setState((currentState) => ({
        products: response.data.products,
        displayProducts: response.data.products
      }))
  };

  setProductsReadCollection = async () => {
      const url = "http://localhost:8080/getProductsByCollection/181340897418"
      let response = await axios.get(url);
      console.log("setProductsReadCollection", response.data.products)
      this.setState((currentState) => ({
        reads: response.data.products,
        displayReadProducts: response.data.products
      }))
  };

  setProductsReadingCollection = async () => {
    const url = "http://localhost:8080/getProductsByCollection/181341126794"
    let response = await axios.get(url);
    console.log("setProductsReadingCollection", response.data.products)
    this.setState((currentState) => ({
        readings: response.data.products,
        displayReadingProducts: response.data.products
    }))
  };

  addToReadingList = (product) => {
    const productId = product.id
    const body = this.updateTag(productId, 'reading')
    this.updatePrroductAttribute(productId, body)

    this.setState((currentState) => ({
      products: currentState.products.filter((c) => c.id !== product.id),
      displayProducts: currentState.products.filter((c) => c.id !== product.id),
      readings: currentState.readings.concat(product),
      displayReadingProducts: currentState.readings.concat(product)
    }))
  }

  addToReadList = (product) => {
    const productId = product.id
    const body = this.updateTag(productId, 'read')
    this.updatePrroductAttribute(productId, body)

    this.setState((currentState) => ({
      readings: currentState.readings.filter((c) => c.id !== product.id),
      displayReadingProducts: currentState.readings.filter((c) => c.id !== product.id),
      reads: currentState.reads.concat(product),
      displayReadProducts: currentState.reads.concat(product)
    }))
  }

  addToCategoriesList = (product) => {
    const productId = product.id
    const body = this.updateTag(productId, 'want_to_read')
    this.updatePrroductAttribute(productId, body)

    this.setState((currentState) => ({
      products: currentState.products.concat(product),
      displayProducts: currentState.products.concat(product),
      readings: currentState.readings.filter((c) => c.id !== product.id),
      displayReadingProducts: currentState.readings.filter((c) => c.id !== product.id),
    }))
  }

  updateQuery = (query) => {
    // console.log("query",query)
    query = query.trim()
    this.setState((currentState) => ({
        displayProducts: query === '' ? currentState.products : currentState.products.filter((c) => c.title.toLowerCase().includes(query.toLowerCase())),
        displayReadProducts: query === '' ? currentState.reads : currentState.reads.filter((c) => c.title.toLowerCase().includes(query.toLowerCase())),
        displayReadingProducts: query === '' ? currentState.readings : currentState.readings.filter((c) => c.title.toLowerCase().includes(query.toLowerCase())),
        query: query
    }))
  }

  render(){
    return (
      <div>
        <Header />
        <Search onUpdateQuery={this.updateQuery}/>
        <ListCategories products={this.state.displayProducts} onAddToReadingList={this.addToReadingList}/>
        {Object.keys(this.state.displayReadingProducts).length ? <ListCurrently readings={this.state.displayReadingProducts} onAddToReadList={this.addToReadList} onAddToCategoriesList={this.addToCategoriesList}/> : ''}
        {Object.keys(this.state.displayReadProducts).length ? <ListRead read={this.state.displayReadProducts} /> : ''}
      </div>
    );
  }
}

export default App;
