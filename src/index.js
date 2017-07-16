import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid/v4';
import TodoGroup from './components/todo_group';
import TodoList from './components/todo_list';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoLists: [
        {
          name: 'Work',
          id: '1572527',
          list: [
            {
              id: '32332',
              description: 'Finish project A.',
              note: 'Before 10p.m. Call S for demo time appointment. Cannot delay.',
              priority: 1,
              completed: false,
            },
            {
              id: '8739293',
              description: 'Finish project B.',
              note: 'Deadline is next Monday. Contact Baby in advance to check for his progress. ',
              priority: 0,
              completed: false,
            },
          ],
        },
        {
          name: 'Play',
          id: '63826382783',
          list: [
            {
              id: '77927480',
              description: 'GTAV',
              note: 'Mission 45',
              priority: 2,
              completed: false,
            },
          ],
        },
        {
          name: 'Music',
          id: '18738739',
          list: [],
        },
      ],
      selectedGroupId: null,
      edittingGroupId: null,
      newGroupName: null,
      nameLegal: true,
      edittingDetail: false,
    };
  }

  getItemIndex(itemId) {
    const newTodoLists = this.state.todoLists;
    for (let i = 0; i < newTodoLists.length; i += 1) {
      for (let j = 0; j < newTodoLists[i].list.length; j += 1) {
        if (newTodoLists[i].list[j].id === itemId) return [i, j];
      }
    }
    return [null, null];
  }

  removeGroup(id) {
    if (!this.state.nameLegal || this.state.edittingDetail) {
      return;
    }
    const newTodoLists = this.state.todoLists.filter(item => (item.id !== id));
    this.setState({
      todoLists: newTodoLists,
      selectedGroupId: null,
      edittingGroupId: null,
    });
  }

  containSameOrEmpty(name) {
    const self = this;
    const res = this.state.todoLists.map(item => (name === '' || (item.name === name && item.name !== self.state.edittingGroup)));
    return (res.indexOf(true) !== -1);
  }

  editGroupName(newName) {
    const validatePass = !this.containSameOrEmpty(newName);
    this.setState({
      nameLegal: validatePass,
      newGroupName: newName,
    });
  }

  addGroup() {
    if (this.state.edittingDetail) return;
    const newId = uuid();
    const newTodoLists = this.state.todoLists;
    newTodoLists.push({
      name: '',
      id: newId,
      list: [],
    });
    this.setState({
      selectedGroupId: null,
      edittingGroupId: newId,
      nameLegal: false,
      newGroupName: '',
    });
  }

  editGroupChange(id) {
    if (this.state.nameLegal && !this.state.edittingDetail) {
      const edittingGroup = this.state.todoLists.find(item => (item.id === id));
      const edittingGroupName = edittingGroup ? edittingGroup.name : null;
      const newTodoLists = this.state.todoLists;
      newTodoLists.forEach((item) => {
        if (item.id === this.state.edittingGroupId) item.name = this.state.newGroupName;
      });
      this.setState({
        todoLists: newTodoLists,
        edittingGroupId: id,
        newGroupName: edittingGroupName,
      });
    }
  }

  changeList(groupId) {
    if (this.state.edittingDetail) return;
    this.setState({
      selectedGroupId: groupId,
    });
  }

  addItem(newItem, listId) {
    console.log('[Debug]add item');
    const newTodoLists = this.state.todoLists;
    const targetList = newTodoLists.find(item => (item.id === listId));
    const index = newTodoLists.indexOf(targetList);
    newTodoLists[index].list.push(newItem);
    this.setState({
      todoLists: newTodoLists,
      edittingDetail: false,
    });
  }

  editItem(modifiedItem, itemId) {
    console.log('[Debug]edit item');
    const newTodoLists = this.state.todoLists;
    const index = this.getItemIndex(itemId);
    if (index[0] !== null) {
      newTodoLists[index[0]].list.splice(index[1], 1, modifiedItem);
    } else {
      console.log(`[Debug]item ${itemId} not found`);
    }
    this.setState({
      todoLists: newTodoLists,
      edittingDetail: false,
    });
  }

  removeTodoItem(itemId) {
    console.log(`[Debug]removing item ${itemId}`);
    const newTodoLists = this.state.todoLists;
    const index = this.getItemIndex(itemId);
    if (index[0] !== null) {
      newTodoLists[index[0]].list.splice(index[1], 1);
    } else {
      console.log(`[Debug]item ${itemId} not found`);
    }
    this.setState({
      todoLists: newTodoLists,
    });
  }

  checkComplete(itemId) {
    const index = this.getItemIndex(itemId);
    const newTodoLists = this.state.todoLists;
    if (index[0] !== null) {
      const c = newTodoLists[index[0]].list[index[1]].completed;
      newTodoLists[index[0]].list[index[1]].completed = !c;
    } else {
      console.log(`[Debug]item ${itemId} not found`);
    }
    this.setState({
      todoLists: newTodoLists,
    });
  }

  calculateCompleted() {
    const todoLists = this.state.todoLists;
    let completedNum = 0;
    let unCompletedNum = 0;
    for (let i = 0; i < todoLists.length; i += 1) {
      for (let j = 0; j < todoLists[i].list.length; j += 1) {
        if (todoLists[i].list[j].completed === true) {
          completedNum += 1;
        } else {
          unCompletedNum += 1;
        }
      }
    }
    return [completedNum, unCompletedNum];
  }

  render() {
    console.log('[Debug]render app');
    const s = this.state;
    const groups = s.todoLists.map((item) => {
      const obj = {
        name: item.name,
        id: item.id,
      };
      return obj;
    });
    const listToShow = s.todoLists.find(item => (item.id === s.selectedGroupId));
    const stat = this.calculateCompleted();
    return (
      <div className="row">
        <div className="column column-25 left-bar">
          <div className="title">
            <h2>TODOs</h2>
          </div>
          <TodoGroup
            onItemSelect={selectedGroupId => this.changeList(selectedGroupId)}
            onItemRemove={id => this.removeGroup(id)}
            onEditGroupChange={id => this.editGroupChange(id)}
            onGroupNameChange={newName => this.editGroupName(newName)}
            groups={groups}
            edittingGroupId={s.edittingGroupId}
            newGroupName={s.newGroupName}
            showErrMsg={!s.nameLegal}
            addGroup={() => this.addGroup()}
          />
          <div className="stat">
            <div className="row">
              <div className="column column-40 column-offset-10">
                <h1 style={{ color: '#00c853' }}>{stat[0]}</h1>
                <h4>Completed</h4>
              </div>
              <div className="column column-40">
                <h1 style={{ color: '#f44336' }}>{stat[1]}</h1>
                <h4>Left</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="column column-75 main-area">
          <TodoList
            edittingDetail={val => this.setState({ edittingDetail: val })}
            addItem={(item, listId) => this.addItem(item, listId)}
            editItem={(item, itemId) => this.editItem(item, itemId)}
            removeTodoItem={itemId => this.removeTodoItem(itemId)}
            checkComplete={itemId => this.checkComplete(itemId)}
            listObj={listToShow}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
