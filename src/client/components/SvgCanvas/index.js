/**
 * Created by Leonid on 24/05/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Shape from '../Drawer/shapes/Shape';
import './style.less';

export default class SvgCanvas extends Component {
  static propTypes = {
    onDrawStart: PropTypes.func,
    onDraw: PropTypes.func,
    onDrawEnd: PropTypes.func,
    shapes: PropTypes.arrayOf(
      PropTypes.instanceOf(Shape),
    ),
  };

  startDrawing = (e) => {
    e.persist();
    const canvas = e.currentTarget;
    const canvasRect = canvas.getBoundingClientRect();
    const { onDraw, onDrawStart, onDrawEnd } = this.props;
    const getXY = (chosenEvent) => {
      const x = chosenEvent.pageX - canvasRect.left;
      const y = chosenEvent.pageY - canvasRect.top;

      return {
        x, y,
      };
    };
    const startCords = getXY(e);
    const move = (m) => {
      const moveCords = getXY(m);
      onDraw(moveCords);
    };
    const end = (en) => {
      const endCords = getXY(en);
      onDrawEnd(endCords);
      canvas.removeEventListener('mousemove', move, false);
      canvas.removeEventListener('mouseup', end, false);
      canvas.removeEventListener('mouseleave', end, false);
    };

    onDrawStart(startCords);
    canvas.addEventListener('mousemove', move, false);
    canvas.addEventListener('mouseleave', end, false);
    canvas.addEventListener('mouseup', end, false);
  };

  getShapes() {
    const { shapes } = this.props;

    return shapes.map((si, i) => (
        React.createElement(si.shape, { key: i, ...si.props })
      ));
  }

  render() {
    const shapes = this.getShapes();
    const { activeShape } = this.props;
    return (
      <svg
        className="svg-canvas"
        onMouseDown={this.startDrawing}
      >
        {shapes}
        {activeShape && React.createElement(activeShape.shape, { key: 'drawing', ...activeShape.props })}
      </svg>
    );
  }
}

