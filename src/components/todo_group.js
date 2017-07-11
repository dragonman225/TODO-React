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
      <div className="msg-err">{error ? <i className="fa fa-exclamation-triangle" aria-hidden="true" /> : ''}{error ? 'WARNING: Field is empty or Name exists!' : ''}</div>
      <table>
        <tbody>
          {empty ? <tr><td className="td-empty" /><td className="td-center">No TODOs</td></tr> : todoGroupItems}
          <TodoAddGroup
            addGroup={props.addGroup}
            adding={props.edittingGroup === ''}
          />
        </tbody>
      </table>
    </div>
  );
};

export default todoGroup;
