import React from 'react';
import TodoGroupItem from './todo_group_item';
import TodoAddGroup from './todo_add_group';

const todoGroup = (props) => {
  const empty = (props.groups.length === 0);
  const todoGroupItems = props.groups.map((item) => {
    return (
      <TodoGroupItem
        key={props.groups.indexOf(item)}
        onItemSelect={props.onItemSelect}
        onItemRemove={props.onItemRemove}
        onItemEdit={props.onItemEdit}
        onGroupNameChange={props.onGroupNameChange}
        item={item}
        editting={item === props.edittingGroup}
      />
    );
  });
  return (
    <table>
      <tbody>
        {empty ? <tr><td className="td-empty" /><td className="td-center">No TODOs</td></tr> : todoGroupItems}
        <TodoAddGroup
          addGroup={props.addGroup}
          adding={props.edittingGroup === ''}
        />
      </tbody>
    </table>
  );
};

export default todoGroup;
