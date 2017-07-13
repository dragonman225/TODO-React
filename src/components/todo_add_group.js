import React from 'react';

const todoAddGroup = (props) => {
  if (props.adding) return <div />;
  return (
    <button className="btn-add" onClick={() => props.addGroup()}>
      <i className="fa fa-plus" aria-hidden="true" />
    </button>
  );
};

export default todoAddGroup;
