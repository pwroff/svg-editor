/**
 * Created by Leonid on 05/12/16.
 */
import React, { Component } from 'react';
import AttributePanel from '../AttributePanel';
import SvgCanvas from '../SvgCanvas';
import Path from './shapes/Path';
const ATTRIBUTE_TYPES = {
  COLOR: 'COLOR',
  OPACITY: 'OPACITY',
  NUMBER: 'NUMBER',
};

export default class Drawer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      attributes: {
        fill: {
          type: ATTRIBUTE_TYPES.COLOR,
          value: '#ffffff',
        },
        fillOpacity: {
          type: ATTRIBUTE_TYPES.OPACITY,
          value: 1,
        },
        stroke: {
          type: ATTRIBUTE_TYPES.COLOR,
          value: '#ffffff',
        },
        strokeOpacity: {
          type: ATTRIBUTE_TYPES.OPACITY,
          value: 1,
        },
        strokeWidth: {
          value: 1,
          type: ATTRIBUTE_TYPES.NUMBER,
        },
      },
      shapes: [],
      activeShape: null,
    };
  }

  onAttChange = (e) => {
    const { attributes } = Object.assign({}, this.state);

    attributes[e.target.name].value = e.target.value;
    this.setState({ attributes });
  };

  initShape = ({ x, y }) => {
    const { attributes } = this.state;
    const initAttrs = {};
    Object.keys(attributes).forEach((a) => {
      initAttrs[a] = attributes[a].value;
    });
    const shape = new Path(x, y, initAttrs);

    this.setState({
      activeShape: shape,
    });
  };

  drawShape = ({ x, y }) => {
    const { activeShape } = Object.assign({}, this.state);

    activeShape.draw(x, y);

    this.setState({ activeShape });
  };

  saveShape = ({ x, y }) => {
    const { activeShape, shapes } = Object.assign({}, this.state);

    activeShape.draw(x, y);

    this.setState({
      activeShape: null,
      shapes: [].concat(shapes, activeShape),
    });
  };

  render() {
    return (
      <section className="drawer">
        <AttributePanel
          attributes={this.state.attributes}
          onAttributeChange={this.onAttChange}
        />
        <SvgCanvas
          onDrawStart={this.initShape}
          onDraw={this.drawShape}
          onDrawEnd={this.saveShape}
          shapes={this.state.shapes}
          activeShape={this.state.activeShape}
        />
      </section>
    );
  }
}
