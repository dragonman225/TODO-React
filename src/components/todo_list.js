import React, { Component } from 'react';
import TodoItem from './todo_item';
import TodoItemDetail from './todo_item_detail';

class todoList extends Component {
  constructor(props) {
    super(props);

    const todoItems = this.makeTodoItemsJSX(props.filteredList);
    this.state = {
      todoItems,
      selectedItem: props.filteredList[0],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      const todoItems = this.makeTodoItemsJSX(nextProps.filteredList);
      this.setState({
        todoItems,
        selectedItem: nextProps.filteredList[0],
      });
    }
  }

  makeTodoItemsJSX(list) {
    return list.map((item) => {
      return (
        <TodoItem
          key={list.indexOf(item)}
          item={item}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <div className="title">
          <h2>{ this.props.selectedGroup }</h2>
        </div>
        <div className="row">
          <div className="column column-60">
            <table>
              <tbody>
                { (this.props.selectedGroup !== null) ? this.state.todoItems : <tr /> }
              </tbody>
            </table>
          </div>
          <div className="column column-40">
            <TodoItemDetail
              detail={this.state.selectedItem}
            />
          </div>
        </div>
      </div>
    );
  }
}

/*
const todoList = (props) => {
  const todoItems = props.filteredList.map((item) => {
    return (
      <TodoItem
        key={props.filteredList.indexOf(item)}
        item={item}
      />
    );
  });

  return (
    <div>
      <div className="title">
        <h2>{ props.selectedGroup }</h2>
      </div>
      <div className="row">
        <div className="column column-60">
          <table>
            <tbody>
              { (props.selectedGroup !== null) ? todoItems : <tr /> }
            </tbody>
          </table>
        </div>
        <div className="column column-40">
          <TodoItemDetail />
        </div>
      </div>
    </div>
  );
};
*/

export default todoList;
