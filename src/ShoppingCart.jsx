import React, { Component } from "react";
import Product from "./Product";

export default class ShoppingCart extends Component {
  //Executes when the component is mounted
  constructor(props) {
    // console.log("constructor - ShoppingCart");
    super(props); // calling super class' constructor
    //initialization of the state
    this.state = {
      products: [],
    };
  }

  render() {
    // console.log("render - ShoppingCart");
    return (
      <div>
        <h4>Shopping Cart</h4>

        <div className="row">
          {this.state.products.map((prod) => {
            return (
              <Product
                key={prod.id}
                product={prod}
                onIncrement={this.handleIncrement}
                onDecrement={this.handleDecrement}
                onDelete={this.handleDelete}
              >
                <button className="btn btn-primary">Buy Now</button>
              </Product>
            );
          })}
        </div>
      </div>
    );
  }

  // Executes after constructor and render method (includes life cycle of child component, if any) of crrent component
  componentDidMount = async () => {
    //fetch data from data source
    // console.log("componentDidMount - ShoppingCart");
    // console.log();
    var response = await fetch("http://localhost:5000/products", {
      method: "GET",
    });
    var prods = await response.json();
    console.log(prods);

    this.setState({ products: prods });
  };

  componentDidUpdate(prevProps, prevState) {
    // console.log(
    //   "componentDidUpdate - Shopping Cart",
    //   prevProps,
    //   prevState,
    //   this.props,
    //   this.state
    // );
  }

  //Executes when the current instance of current component is being deleted from memory

  componentWillUnmount() {
    // console.log("componentWillUnmount - ShoppingCart");
  }

  componentDidCatch(error, info) {
    // console.log("componentWillUnmount - ShoppingCart");
    // console.log(error, info);
    // localStorage.lastError = `${error}\n${JSON.stringify(info)}`;
  }

  //executes when user clicks on + button
  handleIncrement = (product, maxValue) => {
    //get index of selected product
    let allProducts = [...this.state.products];
    let index = allProducts.indexOf(product);

    if (allProducts[index].quantity < maxValue) {
      allProducts[index].quantity++;

      // update the state of current component (parent Component)
      this.setState({ products: allProducts });
    }
  };

  handleDecrement = (product, minValue) => {
    console.log("handleDecrement", product);

    let allProducts = [...this.state.products];
    let index = allProducts.indexOf(product);
    if (allProducts[index].quantity > minValue) {
      allProducts[index].quantity--;

      this.setState({ products: allProducts });
    }
  };

  //executes when user clicks on delete(x) button in the product component.
  handleDelete = (product) => {
    let allProducts = [...this.state.products];
    let index = allProducts.indexOf(product);

    if (window.confirm("Are you sure to delete?")) {
      //delete product based on indexOf
      allProducts.splice(index, 1);
      this.setState({ products: allProducts });
    }
  };
}
