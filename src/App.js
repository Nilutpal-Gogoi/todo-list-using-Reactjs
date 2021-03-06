import React, { Component } from 'react'
import { v4 as uudiv4} from "uuid";
import 'bootstrap/dist/css/bootstrap.min.css'
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"

export default class App extends Component {
  state={
    items:[],
    id: uudiv4(),
    item:'',
    editItem: false
  };
  handleChange = (e) => {
    this.setState({
      item:e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id:this.state.id,
      title:this.state.item
    }
    const updatedItems = [...this.state.items,newItem]

    this.setState({
      items:updatedItems,
      item:'',
      id: uudiv4(),
      editItem: false
    });

  }
  clearList = () => {
    this.setState({
      items: []
    });
  };

  // The logic here is that we will filter the items that are not equal to the id and replace the items with that filtered items. 
  handleDelete = (id) => {
    const filteredItems = this.state.items.filter(item=>item.id !== id);
    this.setState({
      items: filteredItems
    });
  };

  // The logic here is that first we will filter the items that are not equal to the id and then get the specific item that is selected (this is done by "find" ARRAY method)
  handleEdit = (id) => {
    const filteredItems = this.state.items.filter(item=> item.id !== id);
    const selectedItem = this.state.items.find(item => item.id === id);
    this.setState({
      items:filteredItems,
      item:selectedItem.title,
      id:id,
      editItem: true
    })
  }  

  render() {
    return (
        <div className= "container">
          <div className="row">
            <div className="col-10 mx-auto col-md-8 mt-5">
              <h3 className="text-capitalize text-center">Todo Input</h3>
              <TodoInput 
                item={this.state.item} 
                handleChange={this.handleChange} 
                handleSubmit={this.handleSubmit} 
                editItem={this.state.editItem}
              ></TodoInput> 
              <TodoList 
                items={this.state.items} 
                clearList={this.clearList} 
                handleDelete={this.handleDelete} 
                handleEdit={this.handleEdit}
              ></TodoList>
            </div>
          </div>
        </div>
    )
  }
}
