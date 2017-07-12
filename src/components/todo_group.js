import React from 'react';
import TodoGroupItem from './todo_group_item';
import TodoAddGroup from './todo_add_group';

const todoGroup = (props) => {
  const empty = (props.groups.length === 0);
  const error = (props.showErrMsg);
  const todoGroupItems = props.groups.map((item) => {
    return (
      <TodoGroupItem
        key={props.groups.indexOf(item)}
        onItemSelect={props.onItemSelect}
        onItemRemove={props.onItemRemove}
        onEditGroupChange={props.onEditGroupChange}
        onGroupNameChange={props.onGroupNameChange}
        item={item}
        editting={item === props.edittingGroup}
        newGroupName={props.newGroupName}
      />
    );
  });
  return (
    <div>
      {error ? <div className="msg-err"><i className="fa fa-exclamation-triangle" aria-hidden="true" />WARNING: Field is empty or Name exists!</div> : <div />}
      <table>
        <tbody>
          {empty ? <tr><td className="td-empty" /><td className="td-center">No TODOs</td></tr> : todoGroupItems}
        </tbody>
      </table>
      <TodoAddGroup
        addGroup={props.addGroup}
        adding={props.edittingGroup === ''}
      />
    </div>
  );
};

export default todoGroup;
