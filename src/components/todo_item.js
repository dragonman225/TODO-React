import React from 'react';

const todoItem = (props) => {
  const p = props.item;
  const css = {
    width: '4.5rem',
    backgroundColor: '#f44336',
  };
  return (
    <tr>
      <td className="td-empty" />
      <td className="td-center">{p.description}</td>
      <td className="td-indicator" style={css} />
    </tr>
  );
};

export default todoItem;
