import React, { Component } from 'react';
import '../styles/dropdown.css'

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false,
      filter: '',
    }
  }

  toggleDropdown() {
    this.setState({
      showDropdown: !this.state.showDropdown,
      filter: '',
    });
  }

  handleOnChange(e) {
    this.setState({
      filter: e.target.value,
    })
  }

  render() {
    const { title, options, hasFilter, callback } = this.props;
    const { filter } = this.state;

    return (
      <div className="dropdown">
        <button
          className="title"
          onClick={() => { this.toggleDropdown(); }}
        >
          <h3>{title}</h3>
        </button>
        <div className={`${this.state.showDropdown ? 'show' : 'hide'}`}>
          <div className="backdrop" onClick={() => { this.toggleDropdown(); }}/>
          <div className="dropdown-options">
            <div className="filter-container">
              <h5>Filter by {title.toLowerCase()}</h5>
              {hasFilter ? <input
                type="text"
                placeholder={`Filter ${title.toLowerCase()}`}
                onChange={(e) => { this.handleOnChange(e); }}
                value={filter}
                /> : null}
            </div>
            <div className="options-container">
              {
                options.map((option) => {
                  if (option.indexOf(filter) !== -1) {
                    return (
                      <button
                        className="options"
                        onClick={() => {
                          callback(option, title);
                          this.toggleDropdown();
                        }}
                        key={option+'key'}
                        >
                        {option}
                      </button>
                    );
                  }
                  return null;
                })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dropdown.defaultProps = {
  options: [],
}

export default Dropdown
