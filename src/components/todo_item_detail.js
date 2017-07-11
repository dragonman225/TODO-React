import React from 'react';

const todoItemDetail = (props) => {
  if (!props.detail) return <div>No item seleted.</div>;
  console.log(props.detail);
  const p = props.detail;
  return (
    <div>
      <div>
        <h3>Description</h3>
        {p.description}
      </div>
      <div>
        <h3>Note</h3>
        {p.note}
      </div>
      <div>
        <h3>Priority</h3>
        {p.priority}
      </div>
    </div>
  );
};

export default todoItemDetail;
