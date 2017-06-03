/**
 * Created by Leonid on 22/05/17.
 */

export default class Shape {
  constructor(x, y, { fill = 'none', stroke = 'none', strokeWidth = 1, ...rest }) {
    this.fill = fill;
    this.stroke = stroke;
    this.strokeWidth = strokeWidth;
    this.nodeProps = Object.assign({}, rest);
    this.sX = x;
    this.sY = y;
  }

  draw(x, y) {
    return true;
  }

  get props() {
    const { fill, stroke, strokeWidth, nodeProps } = this;
    return {
      ...nodeProps,
      fill,
      stroke,
      strokeWidth,
    };
  }

  get shape() {
    return void 0;
  }
}
