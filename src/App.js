import React, {Component} from 'react';
import './App.css';
import data from './data.json';
import Products from './components/products/products.component';
import Filter from './components/filter/filter.component';
import Cart from './components/cart/cart.component';

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      category: "",
      cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
    }
  }

  //adding items to cart
  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach(item => {
      if(item.id === product.id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if(!alreadyInCart) {
      cartItems.push({...product, count: 1});
    }
    this.setState({cartItems});
  //adding cart items to browser's local storage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  //remove items from cart
  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({cartItems: cartItems.filter(x => x.id !== product.id)});
  //remove items from browser's local storage
    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter(x => x.id !== product.id))); 
  }

  //filter items against category
  filterCategory = (event) => {
    console.log(event.target.value);
    if(event.target.value === "") {
      this.setState({
        category: event.target.value,
        products: data.products
      })
    } else {
      this.setState({
        category: event.target.value,
        products: data.products.filter(product => product.category === event.target.value)
      })
    }
  }

  //method for saving the order
  saveOrder = (order) => {
    alert("need to save order for " + order.name);
  }

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">MoodyFoody</a>
        </header>

        <main>
          <div className="content">
            <div className="main">
              <Filter 
                count={this.state.products.length} 
                category={this.state.category} 
                filterCategory={this.filterCategory}
              />
              <Products products={this.state.products} addToCart={this.addToCart} />
            </div>
            <div className="sidebar">
              <Cart cartItems={this.state.cartItems} removeFromCart={this.removeFromCart} saveOrder={this.saveOrder}/>
            </div>
          </div>
        </main>

        <footer>
          All right is reserved @Jit Chanda
        </footer>
      </div>
    );
  }
  
}

export default App;
