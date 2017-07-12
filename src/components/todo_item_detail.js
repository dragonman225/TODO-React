import React from 'react';

const todoItemDetail = (props) => {
  const p = props.detail;
  const pn = props.newDetail;
  const focus = props.isEdittingDetail;
  const isNew = props.edittingNew;
  const css = focus ? { transform: 'translateX(-83%)', width: '200%' } : { transform: 'translateX(0rem)' };
  if (!p) {
    if (!focus) {
      return (
        <div className="detail-pane" style={css}>
          <div className="msg-empty">
            <h4>No item seleted.</h4>
          </div>
        </div>
      );
    }
    return (
      <div className="detail-pane" style={css}>
        <div className="detail-card">
          <h3>Event</h3>
          <input value={pn.description} onChange={event => props.onDescChange(event.target.value)} />
        </div>
        <div className="detail-card">
          <h3>Note</h3>
          <textarea value={pn.note} onChange={event => props.onNoteChange(event.target.value)} />
        </div>
        <div className="detail-card">
          <h3>Priority</h3>
          <form>
            <input type="radio" name="priority" /> High
            <input type="radio" name="priority" /> Medium
            <input type="radio" name="priority" /> Low
          </form>
        </div>
        <div className="detail-card">
          <button onClick={() => props.cancelEdit()}>Cancel</button>
          <button onClick={() => props.summitEdit(true)}>Add</button>
        </div>
      </div>
    );
  }
  if (focus) {
    return (
      <div className="detail-pane" style={css}>
        <div className="detail-card">
          <h3>Event</h3>
          <input value={pn.description} onChange={event => props.onDescChange(event.target.value)} />
        </div>
        <div className="detail-card">
          <h3>Note</h3>
          <textarea value={pn.note} onChange={event => props.onNoteChange(event.target.value)} />
        </div>
        <div className="detail-card">
          <h3>Priority</h3>
          <form>
            <input type="radio" name="priority" /> High
            <input type="radio" name="priority" /> Medium
            <input type="radio" name="priority" /> Low
          </form>
        </div>
        <div className="detail-card">
          <button onClick={() => props.cancelEdit()}>Cancel</button>
          <button onClick={() => props.summitEdit(isNew)}>{isNew ? 'Add' : 'Modify'}</button>
        </div>
      </div>
    );
  }
  return (
    <div className="detail-pane" style={css}>
      <div className="detail-card">
        <h3>Event</h3>
        <h4>{p.description}</h4>
      </div>
      <div className="detail-card">
        <h3>Note</h3>
        {p.note}
      </div>
      <div className="detail-card">
        <h3>Priority</h3>
        {p.priority}
      </div>
    </div>
  );
};

export default todoItemDetail;
