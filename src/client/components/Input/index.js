import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.less';
import Icon from '../Icon';

const { string, func, bool, oneOfType, number } = PropTypes;

export default class extends Component {

  static propTypes = {
    value: oneOfType([string, number]),
    label: string,
    hidden: bool,
    error: bool,
    errorMessage: string,
    onChange: func,
    name: string,
    isTextArea: bool,
    type: string,
  };

  static defaultProps = {
    value: '',
    label: '',
    hidden: false,
    error: false,
    errorMessage: '',
    onChange: () => false,
    name: '',
    isTextArea: false,
    type: '',
  };

  constructor(props, ...args) {
    super(props, ...args);

    this.state = {
      showHidden: false,
    };
  }

  render() {
    const { value, label, hidden, error,
      onChange, name, errorMessage, isTextArea, type } = this.props;
    const { showHidden } = this.state;
    const id = `inputComponent${name}${label}`;
    const inputAttrs = {
      type: hidden && !showHidden && 'password' || type || 'text',
      onChange,
      value,
      name,
      id,
    };
    return (
      <div className={`input-component ${value && 'with-value' || ''}`}>
        {
            error && <span className="error-message">{errorMessage}</span>
        }
        {
          isTextArea && <textarea
            {...inputAttrs}
            onChange={(e) => {
              e.persist();
              const target = e.currentTarget;

              target.style.height = `${target.scrollHeight}px`;
              onChange(e);

              if (!this.tm) {
                this.tm = setTimeout(() => {
                  while (target.clientHeight >= target.scrollHeight) {
                    target.style.height = `${target.clientHeight - 1}px`;
                  }

                  this.tm = null;
                }, 50);
              }
            }}
          /> || <input {...inputAttrs} />
        }

        <label htmlFor={id}>{label}</label>
        {
            hidden && <span
              className="show-hidden"
              onClick={() => this.setState({ showHidden: !showHidden })}
            >
              <Icon type={'eye'} />
            </span>
        }

      </div>
    );
  }
}
