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
          note: 'Before 10p.m.',
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
    };
  }

  removeGroup(name) {
    if (!this.state.nameLegal) {
      return;
    }
    const index = this.state.groups.indexOf(name);
    const newGroups = this.state.groups;
    newGroups.splice(index, 1);
    this.setState({
      groups: newGroups,
      selectedGroup: null,
      edittingGroup: null,
    });
  }

  containSameOrEmpty(name) {
    const self = this;
    const res = this.state.groups.map((item) => {
      return (name === '' || (item === name && item !== self.state.edittingGroup));
    });
    console.log(res);
    return (res.indexOf(true) !== -1);
  }

  editGroupName(newName) {
    const result = this.containSameOrEmpty(newName);
    this.setState({
      nameLegal: !result,
      newGroupName: newName,
    });
  }

  addGroup() {
    const newGroups = this.state.groups;
    newGroups.push('');
    this.setState({
      groups: newGroups,
      selectedGroup: '',
      edittingGroup: '',
      nameLegal: false,
      newGroupName: '',
    });
  }

  editGroupChange(name) {
    if (this.state.nameLegal) {
      const index = this.state.groups.indexOf(this.state.edittingGroup);
      const newGroups = this.state.groups;
      newGroups[index] = this.state.newGroupName;
      this.setState({
        groups: newGroups,
        edittingGroup: name,
        newGroupName: name,
      });
    }
  }

  changeList(groupName) {
    const newFilteredList = this.state.list.filter((item) => {
      return (item.group === groupName);
    });
    this.setState({
      filteredList: newFilteredList,
      selectedGroup: groupName,
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
