import React from 'react';

const todoItem = (props) => {
  const p = props;
  const css = {
    width: '4.5rem',
    backgroundColor: '#f44336',
  };
  return (
    <tr>
      <td className="td-empty" />
      <td className="td-center" onClick={() => p.onTodoItemSelect(p.item)}>{p.item.description}</td>
      <td className="td-primary" onClick={() => p.onTodoItemEdit(p.item)}>
        <i className="fa fa-pencil" aria-hidden="true" />
      </td>
      <td className="td-indicator" style={css} />
    </tr>
  );
};

export default todoItem;
