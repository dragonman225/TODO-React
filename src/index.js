import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TodoGroup from './components/todo_group';
import TodoList from './components/todo_list';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groups: ['Work', 'Play', 'Reading', 'Music'],
      list: [
        {
          group: 'Work',
          description: 'Finish project A.',
          note: 'Before 10p.m. Call S for demo time appointment. Cannot delay.',
          priority: 1,
        },
        {
          group: 'Work',
          description: 'Finish project B.',
          note: 'Deadline is next Monday. Contact Baby in advance to check for his progress. ',
          priority: 0,
        },
        {
          group: 'Play',
          description: 'GTAV',
          note: 'Mission 45',
          priority: 2,
        },
      ],
      filteredList: [],
      selectedGroup: null,
      edittingGroup: null,
      newGroupName: null,
      nameLegal: true,
      edittingDetail: false,
    };
  }

  removeGroup(name) {
    if (!this.state.nameLegal || this.state.edittingDetail) {
      return;
    }
    const index = this.state.groups.indexOf(name);
    const newGroups = this.state.groups;
    const newList = this.state.list.filter((item) => {
      return (item.group !== name);
    });
    newGroups.splice(index, 1);
    this.setState({
      groups: newGroups,
      list: newList,
      selectedGroup: null,
      edittingGroup: null,
    });
  }

  containSameOrEmpty(name) {
    const self = this;
    const res = this.state.groups.map((item) => {
      return (name === '' || (item === name && item !== self.state.edittingGroup));
    });
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
    const newGroups = this.state.groups;
    newGroups.push('');
    this.setState({
      groups: newGroups,
      selectedGroup: null,
      edittingGroup: '',
      nameLegal: false,
      newGroupName: '',
      filteredList: [],
    });
  }

  editGroupChange(name) {
    if (this.state.nameLegal && !this.state.edittingDetail) {
      const index = this.state.groups.indexOf(this.state.edittingGroup);
      const newGroups = this.state.groups;
      const newList = this.state.list;
      newGroups[index] = this.state.newGroupName;
      newList.forEach((item) => {
        if (item.group === this.state.edittingGroup) item.group = this.state.newGroupName;
      });
      this.setState({
        list: newList,
        groups: newGroups,
        edittingGroup: name,
        newGroupName: name,
      });
    }
  }

  filterAndSort(list, groupName) {
    const priorityHigh = [];
    const priorityMed = [];
    const priorityLow = [];
    for (let i = 0; i < list.length; i += 1) {
      if (list[i].group === groupName) {
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
            console.log('Priority is not valid.');
        }
      }
    }
    return priorityHigh.concat(priorityMed, priorityLow);
  }

  changeList(groupName) {
    if (this.state.edittingDetail) return;
    const newFilteredList = this.filterAndSort(this.state.list, groupName);
    this.setState({
      filteredList: newFilteredList,
      selectedGroup: groupName,
    });
  }

  addItem(newItem) {
    console.log('add');
    const newList = this.state.list;
    newList.push(newItem);
    const newFilteredList = this.filterAndSort(newList, this.state.selectedGroup);
    this.setState({
      list: newList,
      filteredList: newFilteredList,
      edittingDetail: false,
    });
  }

  editItem(oldEventName, modifiedItem) {
    console.log('edit');
    const newList = this.state.list;
    newList.forEach((item) => {
      if (item.description === oldEventName) item = modifiedItem;
    });
    const newFilteredList = this.filterAndSort(newList, this.state.selectedGroup);
    this.setState({
      list: newList,
      filteredList: newFilteredList,
      edittingDetail: false,
    });
  }

  removeTodoItem(item) {
    console.log('remove');
    const newList = this.state.list.filter((i) => {
      return (i !== item);
    });
    const newFilteredList = this.filterAndSort(newList, this.state.selectedGroup);
    this.setState({
      list: newList,
      filteredList: newFilteredList,
    });
  }

  render() {
    return (
      <div className="row">
        <div className="column column-25 left-bar">
          <div className="title">
            <h2>TODOs</h2>
          </div>
          <TodoGroup
            onItemSelect={selectedGroup => this.changeList(selectedGroup)}
            onItemRemove={name => this.removeGroup(name)}
            onEditGroupChange={name => this.editGroupChange(name)}
            onGroupNameChange={newName => this.editGroupName(newName)}
            groups={this.state.groups}
            edittingGroup={this.state.edittingGroup}
            newGroupName={this.state.newGroupName}
            showErrMsg={!this.state.nameLegal}
            addGroup={() => this.addGroup()}
          />
        </div>
        <div className="column column-75 main-area">
          <TodoList
            edittingDetail={val => this.setState({ edittingDetail: val })}
            editItem={(oldEventName, item) => this.editItem(oldEventName, item)}
            addItem={item => this.addItem(item)}
            removeTodoItem={item => this.removeTodoItem(item)}
            groups={this.state.groups}
            filteredList={this.state.filteredList}
            selectedGroup={this.state.selectedGroup}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
