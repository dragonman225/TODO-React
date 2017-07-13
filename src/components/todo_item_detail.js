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
        <button className="btn-close" onClick={() => props.cancelEdit()}>
          <i className="fa fa-times" aria-hidden="true" />
        </button>
        <div className="detail-card">
          <h3>Event</h3>
          <input className="input-custom" type="text" value={pn.description} onChange={event => props.onDescChange(event.target.value)} />
        </div>
        <div className="detail-card">
          <h3>Note</h3>
          <textarea className="input-custom" value={pn.note} onChange={event => props.onNoteChange(event.target.value)} />
        </div>
        <div className="detail-card">
          <h3>Priority</h3>
          <form>
            <input type="radio" name="priority" value="0" checked={pn.priority === 0} onChange={event => props.onPriorityChange(event.target.value)} /> High
            <input type="radio" name="priority" value="1" checked={pn.priority === 1} onChange={event => props.onPriorityChange(event.target.value)} /> Medium
            <input type="radio" name="priority" value="2" checked={pn.priority === 2} onChange={event => props.onPriorityChange(event.target.value)} /> Low
          </form>
        </div>
        <div className="detail-card">
          <button className="btn-add" onClick={() => props.summitEdit(true)}>Add</button>
        </div>
      </div>
    );
  }
  if (focus) {
    return (
      <div className="detail-pane" style={css}>
        <button className="btn-close" onClick={() => props.cancelEdit()}>
          <i className="fa fa-times" aria-hidden="true" />
        </button>
        <div className="detail-card">
          <h3>Event</h3>
          <input className="input-custom" type="text" value={pn.description} onChange={event => props.onDescChange(event.target.value)} />
        </div>
        <div className="detail-card">
          <h3>Note</h3>
          <textarea className="input-custom" value={pn.note} onChange={event => props.onNoteChange(event.target.value)} />
        </div>
        <div className="detail-card">
          <h3>Priority</h3>
          <form>
            <input type="radio" name="priority" value="0" checked={pn.priority === 0} onChange={event => props.onPriorityChange(event.target.value)} /> High
            <input type="radio" name="priority" value="1" checked={pn.priority === 1} onChange={event => props.onPriorityChange(event.target.value)} /> Medium
            <input type="radio" name="priority" value="2" checked={pn.priority === 2} onChange={event => props.onPriorityChange(event.target.value)} /> Low
          </form>
        </div>
        <div className="detail-card">
          <button className="btn-add" onClick={() => props.summitEdit(isNew)}>{isNew ? 'Add' : 'Modify'}</button>
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
        {(p.priority === 0) ? 'High' : ((p.priority === 1) ? 'Medium' : 'Low')}
      </div>
    </div>
  );
};

export default todoItemDetail;
