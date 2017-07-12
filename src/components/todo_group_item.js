import React from 'react';

const TodoGroupItem = (props) => {
  const p = props;
  return (
    <tr>
      <td className="td-empty" />
      <td className="td-center" onClick={() => p.onItemSelect(p.editting ? null : p.item)}>
        {
          p.editting ?
            <input className="input-custom" type="text" value={p.newGroupName} onChange={event => p.onGroupNameChange(event.target.value)} /> :
            <span>{p.item}</span>
        }
      </td>
      <td className="td-primary" onClick={() => p.onEditGroupChange(p.editting ? null : p.item)}>
        {
          p.editting ?
            <i className="fa fa-check" aria-hidden="true" /> :
            <i className="fa fa-pencil" aria-hidden="true" />
        }
      </td>
      <td className="td-danger" onClick={() => p.onItemRemove(p.item)}>
        <i className="fa fa-times" aria-hidden="true" />
      </td>
      <td className="td-empty" />
    </tr>
  );
};

export default TodoGroupItem;
