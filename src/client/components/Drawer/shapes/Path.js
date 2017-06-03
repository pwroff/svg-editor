/**
 * Created by Leonid on 23/05/17.
 */
import Shape from './Shape';

export default class Path extends Shape {
  constructor(...all) {
    super(...all);
    this.nodeProps.d = `M${this.sX}, ${this.sY}`;
    this.fill = 'none';
  }

  draw(x, y) {
    this.lastX = x;
    this.lastY = y;
    this.nodeProps.d += ` L${x}, ${y}`;
  }

  get shape() {
    return 'path';
  }
}
