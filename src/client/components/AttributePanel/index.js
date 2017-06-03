/**
 * Created by Leonid on 24/05/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import Icon from '../Icon';
import './style.less';

export default class AttributePanel extends Component {
  static propTypes = {
    attributes: PropTypes.objectOf(PropTypes.shape({
      type: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })),
    onAttributeChange: PropTypes.func,
  };

  state = {
    active: false,
  };

  getAttributes() {
    const { attributes, onAttributeChange } = this.props;
    const rendered = [];

    for (const attr of Object.keys(attributes)) {
      const curr = attributes[attr];
      const { label = attr, value = '', type = 'text' } = curr;

      rendered.push((
        <div className="attribute" key={attr}>
          <div className="attribute-label">{attr.charAt(0)}</div>
          <div>
            <Input
              onChange={onAttributeChange}
              label={label} name={attr} value={value} type={type}
            />
          </div>
        </div>
      ));
    }

    return rendered;
  }

  render() {
    const attributes = this.getAttributes();
    const { active } = this.state;
    return (
      <section
        className={`attribute-panel ${active && 'active' || ''}`}
      >
        <div className="attribute-control">
          <div
            className="toggle-button"
            onClick={() => this.setState({ active: !active })}
          ><Icon type={'caret'} /></div>
        </div>
        {attributes}
      </section>
    );
  }
}

