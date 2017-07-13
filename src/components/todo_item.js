import React from 'react';

const todoItem = (props) => {
  const p = props;
  const color = (p.item.priority === 0) ? '#ff1744' : ((p.item.priority === 1) ? '#ffea00' : '#00e676');
  const css = {
    borderRadius: '50%',
    width: '4.5rem',
    backgroundColor: `${color}`,
  };
  return (
    <tr>
      <td className="td-empty" />
      <td className="td-indicator" style={css} />
      <td className="td-center" onClick={() => p.onTodoItemSelect(p.item)}>{p.item.description}</td>
      <td className="td-primary" onClick={() => p.onTodoItemEdit(p.item)}>
        <i className="fa fa-pencil" aria-hidden="true" />
      </td>
      <td className="td-danger" onClick={() => p.onTodoItemRemove(p.item)}>
        <i className="fa fa-times" aria-hidden="true" />
      </td>
    </tr>
  );
};

export default todoItem;
