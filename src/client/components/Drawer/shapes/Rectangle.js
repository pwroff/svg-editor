/**
 * Created by Leonid on 23/05/17.
 */
import Shape from './Shape';

export default class Path extends Shape {
  constructor(...all) {
    super(...all);
    this.nodeProps.width = 1;
    this.nodeProps.height = 1;
    this.nodeProps.x = this.sX;
    this.nodeProps.y = this.sY;
  }

  draw(x, y) {
    const dX = x - this.sX;
    const dY = y - this.sY;

    this.nodeProps.width = Math.max(dX, 1);
    this.nodeProps.height = Math.max(dY, 1);
  }

  get shape() {
    return 'rectangle';
  }
}
