import React from 'react';
import TodoGroupItem from './todo_group_item';
import TodoAddGroup from './todo_add_group';

const todoGroup = (props) => {
  const empty = (props.groups.length === 0);
  const error = (props.showErrMsg);
  const todoGroupItems = props.groups.map((item) => {
    return (
      <TodoGroupItem
        onItemSelect={props.onItemSelect}
        onItemRemove={props.onItemRemove}
        onEditGroupChange={props.onEditGroupChange}
        onGroupNameChange={props.onGroupNameChange}
        name={item.name}
        id={item.id}
        key={item.id}
        editting={item.id === props.edittingGroupId}
        newGroupName={props.newGroupName}
      />
    );
  });
  return (
    <div className="group-pane">
      <table>
        <tbody>
          {empty ? <tr><td className="td-empty" /><td className="td-center">No TODOs</td></tr> : todoGroupItems}
        </tbody>
      </table>
      {error ? <div className="msg-err"><i className="fa fa-exclamation-triangle" aria-hidden="true" />WARNING: Field is empty or Name exists!</div> : <div />}
      <TodoAddGroup
        addGroup={props.addGroup}
        adding={props.edittingGroupId !== null}
      />
    </div>
  );
};

export default todoGroup;
