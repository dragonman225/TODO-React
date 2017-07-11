import React from 'react';

const todoAddGroup = (props) => {
  if (props.adding) return <tr />;
  return (
    <tr>
      <td className="td-empty" />
      <td className="td-center" onClick={() => props.addGroup()}><i className="fa fa-plus" aria-hidden="true" /></td>
    </tr>
  );
}

export default todoAddGroup;
