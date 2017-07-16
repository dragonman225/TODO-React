import React, { Component } from 'react';
import uuid from 'uuid/v4';
import TodoItem from './todo_item';
import TodoItemDetail from './todo_item_detail';

class todoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: props.listObj,
      selectedItemId: null,
      isEdittingDetail: false,
      edittingNew: false,
      edittingItem: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    const update = ((this.props.listObj !== nextProps.listObj));
    if (update) {
      console.log('[Debug]change list');
      this.setState({
        list: nextProps.listObj,
        selectedItemId: null,
      });
    }
  }

  startEditItem(id) {
    this.props.edittingDetail(true);
    const itemDetail = this.props.listObj.list.find(item => (item.id === id));
    this.setState({
      selectedItemId: id,
      isEdittingDetail: true,
      edittingNew: false,
      edittingItem: itemDetail,
    });
  }

  editNewDetail() {
    if (typeof this.props.listObj === 'undefined') return;
    this.props.edittingDetail(true);
    const newId = uuid();
    this.setState({
      isEdittingDetail: true,
      edittingNew: true,
      edittingItem: {
        id: newId,
        description: '',
        note: '',
        priority: 0,
        completed: false,
      },
    });
  }

  cancelEdit() {
    this.props.edittingDetail(false);
    this.setState({
      isEdittingDetail: false,
      edittingNew: false,
      edittingItem: {},
    });
  }

  updateDesc(d) {
    const n = this.state.edittingItem;
    n.description = d;
    this.setState({
      edittingItem: n,
    });
  }

  updateNote(d) {
    const n = this.state.edittingItem;
    n.note = d;
    this.setState({
      edittingItem: n,
    });
  }

  updatePri(d) {
    const n = this.state.edittingItem;
    n.priority = parseInt(d);
    this.setState({
      edittingItem: n,
    });
  }

  summitEdit(isNew) {
    const n = this.state.edittingItem;
    if (isNew) {
      this.props.addItem(n, this.props.listObj.id);
    } else this.props.editItem(n, n.id);
    this.props.edittingDetail(false);
    this.setState({
      isEdittingDetail: false,
      edittingNew: false,
    });
  }

  sortList(list) {
    const priorityHigh = [];
    const priorityMed = [];
    const priorityLow = [];
    const completed = [];
    for (let i = 0; i < list.length; i += 1) {
      if (!list[i].completed) {
        switch (list[i].priority) {
          case 0:
            priorityHigh.push(list[i]);
            break;
          case 1:
            priorityMed.push(list[i]);
            break;
          case 2:
            priorityLow.push(list[i]);
            break;
          default:
            console.log('[Debug]Priority is not valid.');
        }
      } else {
        completed.push(list[i]);
      }
    }
    return priorityHigh.concat(priorityMed, priorityLow, completed);
  }

  render() {
    const s = this.state;
    let todoItems;
    let selectedItem;
    console.log(this.props.listObj);
    if (typeof this.props.listObj === 'undefined') {
      todoItems = <tr />;
      selectedItem = null;
    } else {
      const sortedList = this.sortList(this.props.listObj.list);
      todoItems = sortedList.map(item => (
        <TodoItem
          key={item.id}
          id={item.id}
          desc={item.description}
          priority={item.priority}
          completed={item.completed}
          onTodoItemSelect={selectedItemId => this.setState({ selectedItemId })}
          onTodoItemEdit={itemId => this.startEditItem(itemId)}
          onTodoItemRemove={trashItemId => this.props.removeTodoItem(trashItemId)}
          onCompleteCheck={itemId => this.props.checkComplete(itemId)}
        />
      ));
      selectedItem = this.props.listObj.list.find(item => (item.id === s.selectedItemId));
    }
    return (
      <div>
        <div className="title">
          <h2>{ (typeof this.props.listObj === 'undefined') ? 'No Group Selected' : this.props.listObj.name }</h2>
        </div>
        <div className="row">
          <div className="column column-60">
            <div className="list-pane">
              <table>
                <tbody>
                  {todoItems}
                </tbody>
              </table>
              <button className="btn-add" onClick={() => this.editNewDetail()}>
                <i className="fa fa-plus" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="column column-40">
            <TodoItemDetail
              detail={selectedItem}
              newDetail={this.state.edittingItem}
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
