import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TodoGroup from './components/todo_group';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groups: ['aaa', 'bbb', 'ccc'],
      selectedGroup: null,
      edittingGroup: null,
    };
  }

  removeGroup(name) {
    const index = this.state.groups.indexOf(name);
    const newGroups = this.state.groups;
    newGroups.splice(index, 1);
    this.setState({
      groups: newGroups,
      selectedGroup: null,
      edittingGroup: null,
    });
  }

  editGroupName(name, newName) {
    const index = this.state.groups.indexOf(name);
    const newGroups = this.state.groups;
    newGroups[index] = newName;
    this.setState({
      groups: newGroups,
      selectedGroup: newName,
      edittingGroup: newName,
    });
  }

  addGroup() {
    const newGroups = this.state.groups;
    newGroups.push('');
    this.setState({
      groups: newGroups,
      selectedGroup: '',
      edittingGroup: '',
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
            onItemSelect={selectedGroup => this.setState({ selectedGroup })}
            onItemRemove={name => this.removeGroup(name)}
            onItemEdit={edittingGroup => this.setState({ edittingGroup })}
            onGroupNameChange={newName => this.editGroupName(this.state.edittingGroup, newName)}
            groups={this.state.groups}
            edittingGroup={this.state.edittingGroup}
            addGroup={() => this.addGroup()}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
