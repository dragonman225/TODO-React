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
      isEdittingDetail: false,
      edittingNew: false,
      edittingItem: {
        oldEventName: null,
        newDetail: {},
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      const todoItems = this.makeTodoItemsJSX(nextProps.filteredList);
      this.setState({
        todoItems,
      });
    }
  }

  makeTodoItemsJSX(list) {
    return list.map((item) => {
      return (
        <TodoItem
          key={list.indexOf(item)}
          item={item}
          onTodoItemSelect={selectedItem => this.setState({ selectedItem })}
          onTodoItemEdit={oldItem => this.startEditItem(oldItem)}
        />
      );
    });
  }

  startEditItem(item) {
    console.log(item);
    this.props.edittingDetail(true);
    this.setState({
      edittingItem: {
        oldEventName: item.description,
        newDetail: item
      },
      selectedItem: item,
      isEdittingDetail: true,
      edittingNew: false,
    });
  }

  editNewDetail() {
    this.props.edittingDetail(true);
    this.setState({
      edittingItem: {
        oldEventName: null,
        newDetail: {
          group: this.props.selectedGroup,
          description: '',
          note: '',
          priority: 0,
        },
      },
      isEdittingDetail: true,
      edittingNew: true,
    });
  }

  cancelEdit() {
    this.props.edittingDetail(false);
    this.setState({
      isEdittingDetail: false,
      edittingNew: false,
    });
  }

  updateDesc(d) {
    const n = this.state.edittingItem;
    n.newDetail.description = d;
    this.setState({
      edittingItem: n,
    });
  }

  updateNote(d) {
    const n = this.state.edittingItem;
    n.newDetail.note = d;
    this.setState({
      edittingItem: n,
    });
  }

  updatePri(d) {
    const n = this.state.edittingItem;
    n.newDetail.priority = d;
    this.setState({
      edittingItem: n,
    });
  }

  summitEdit(isNew) {
    const d = this.state.edittingItem;
    if (isNew) {
      this.props.addItem(d.newDetail);
    } else this.props.editItem(d.oldEventName, d.newDetail);
    this.props.edittingDetail(false);
    this.setState({
      isEdittingDetail: false,
      edittingNew: false,
    });
  }

  render() {
    return (
      <div>
        <div className="title">
          <h2>{ (this.props.selectedGroup !== null) ? this.props.selectedGroup : 'No Group Selected' }</h2>
        </div>
        <div className="row">
          <div className="column column-60">
            <div className="list-pane">
              <table>
                <tbody>
                  { (this.props.selectedGroup !== null) ? this.state.todoItems : <tr /> }
                </tbody>
              </table>
              <button className="btn-add" onClick={() => this.editNewDetail()}>
                <i className="fa fa-plus" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="column column-40">
            <TodoItemDetail
              detail={this.state.selectedItem}
              newDetail={this.state.edittingItem.newDetail}
              onDescChange={desc => this.updateDesc(desc)}
              onNoteChange={note => this.updateNote(note)}
              onPriorityChange={p => this.updatePri(p)}
              isEdittingDetail={this.state.isEdittingDetail}
              edittingNew={this.state.edittingNew}
              cancelEdit={() => this.cancelEdit()}
              summitEdit={isNew => this.summitEdit(isNew)}
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
