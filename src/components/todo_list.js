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
    const update = ((this.props.filteredList !== nextProps.filteredList) || (this.props.groups !== nextProps.groups) || (this.props.selectedGroup !== nextProps.selectedGroup));
    console.log(true);
    if (update) {
      const todoItems = this.makeTodoItemsJSX(nextProps.filteredList);
      this.setState({
        todoItems,
        selectedItem: null,
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
          onTodoItemRemove={itemRemove => this.props.removeTodoItem(itemRemove)}
        />
      );
    });
  }

  startEditItem(dat) {
    this.props.edittingDetail(true);
    this.setState({
      selectedItem: dat,
      isEdittingDetail: true,
      edittingNew: false,
      edittingItem: {
        oldEventName: dat.description,
        newDetail: dat,
      },
    });
  }

  editNewDetail() {
    if(this.props.selectedGroup === null) return;
    this.props.edittingDetail(true);
    this.setState({
      isEdittingDetail: true,
      edittingNew: true,
      edittingItem: {
        oldEventName: null,
        newDetail: {
          group: this.props.selectedGroup,
          description: '',
          note: '',
          priority: 0,
        },
      },
    });
  }

  cancelEdit() {
    this.props.edittingDetail(false);
    this.setState({
      isEdittingDetail: false,
      edittingNew: false,
      edittingItem: {
        oldEventName: null,
        newDetail: {},
      },
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
    n.newDetail.priority = parseInt(d);
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

export default todoList;
