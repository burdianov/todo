import React, { Component } from "react";

import "./ItemAddForm.css";

class ItemAddForm extends Component {
  render() {
    return (
      <div className="item-add-form">
        <button
          className="btn btn-outline-secondary"
          onClick={() => this.props.onItemAdded("Hello world")}
        >
          Add Item
        </button>
      </div>
    );
  }
}

export default ItemAddForm;
