import React, {Component} from 'react';
import './cart.styles.css';
import Fade from 'react-reveal/Fade';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            contact: '',
            address: '',
            showCheckout: false
        }
    }

    //method to put checkout-form data into state
    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    //method for creating the order
    createOrder = (e) => {
        e.preventDefault();
        const order = {
            name: this.state.name,
            contact: this.state.contact,
            address: this.state.address,
            cartItems: this.props.cartItems
        };
        this.props.saveOrder(order);
    }

    render() {
        const {cartItems} = this.props;
        return(
            
                <div>
                    {cartItems.length === 0 ? <div className="cart cart-header">Cart Is Empty</div>
                    : <div className="cart cart-header">You've {cartItems.length} item in the cart {" "}</div>
                    }

                    <div>
                        <div className="cart">
                        <Fade left cascade={true}>
                            <ul className="cart-items">
                                {cartItems.map(item => (
                                    <li key={item.id}>
                                        <div>
                                            <img src={item.image} alt={item.tilte}></img>
                                        </div>
                                        <div>
                                            <div>{item.title}</div>
                                            <div className="right">
                                                ${item.price} x {item.count} {" "}
                                                <button className="button" onClick={ () => this.props.removeFromCart(item)}>Remove</button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Fade>    
                        </div>
                        {/* Calculating total price if cartItem is not empty */}
                        {cartItems.length !==0 && (
                            <div>
                                <div className="cart">
                                    <div className="total">
                                        <div>
                                            Total Price: {""}
                                            {/* reduce method takes two param,accumulator and current item */}
                                            ${cartItems.reduce((a, c) => a + c.price * c.count, 0)}
                                        </div>
                                        <button onClick={() => {this.setState({showCheckout: true})}} className="button primary">Proceed</button>
                                    </div>
                                </div>
                                {/* if showCheckout is true then following code will run */}
                                {this.state.showCheckout && (
                                    <div className="cart">
                                        <Fade right cascade={true}>
                                        <form onSubmit={this.createOrder} >
                                            <ul className="form-container">
                                                <li>
                                                    <label>Name</label>
                                                    <input type="text" name="name" required onChange={this.handleInput}></input>
                                                </li>
                                                <li>
                                                    <label>Contact Number</label>
                                                    <input type="text" name="contact" required onChange={this.handleInput}></input>
                                                </li>
                                                <li>
                                                    <label>Address</label>
                                                    <input type="text" name="address" required onChange={this.handleInput}></input>
                                                </li>
                                                <li>
                                                    <button type="submit" className="button primary">Checkout</button>
                                                </li>
                                            </ul>
                                        </form>
                                        </Fade>
                                    </div>
                                )}
                           </div> 
                        )}
                    </div>
                </div>
                    
        )
    }
}

export default Cart;

