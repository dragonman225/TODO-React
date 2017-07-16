import React, { Component } from 'react';

class todoItem extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getColor(priority, completed) {
    const itemDesc = this.props.desc;
    console.log(`[Debug]getting color for ${itemDesc}`);
    if (completed) {
      return '#757575';
    } else {
      switch (priority) {
        case 0:
          return '#ff1744';
        case 1:
          return '#ffea00';
        case 2:
          return '#00e676';
        default:
          console.log('[Debug]invalid priority');
      }
    }
    console.log('[Debug]invalid priority and completed');
    return 0;
  }

  render() {
    const p = this.props;
    const color = this.getColor(p.priority, p.completed);
    const css = {
      borderRadius: '50%',
      width: '4.5rem',
      backgroundColor: `${color}`,
    };
    return (
      <tr>
        <td className="td-empty" />
        <td className="td-indicator" style={css} />
        {
          p.completed ?
          <td className="td-checkbox" onClick={() => p.onCompleteCheck(p.id)}><i className="fa fa-check-square-o" aria-hidden="true" /></td> :
          <td className="td-checkbox" onClick={() => p.onCompleteCheck(p.id)}><i className="fa fa-square-o" aria-hidden="true" /></td>
        }
        <td className="td-center" onClick={() => p.onTodoItemSelect(p.id)}>{p.desc}</td>
        <td className="td-primary" onClick={() => p.onTodoItemEdit(p.id)}>
          <i className="fa fa-pencil" aria-hidden="true" />
        </td>
        <td className="td-danger" onClick={() => p.onTodoItemRemove(p.id)}>
          <i className="fa fa-times" aria-hidden="true" />
        </td>
      </tr>
    );
  }
}

export default todoItem;
