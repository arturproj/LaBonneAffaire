import React from 'react';

class Button extends React.Component {

  render() {
    // console.log('Button#render');
    const { isSelected = true } = this.props;
    const type = isSelected ? 'secondary' : 'outline-secondary';

    return (
      <button
        className={`btn btn-${type}`}
        onClick={this.props.onClick}
        style={{
          backgroundColor: color
        }}>
        {this.props.children}
      </button>
    );
  }
}

export default Button;