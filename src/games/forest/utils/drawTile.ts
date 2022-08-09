import { Tile } from '../types';

const tileDim = 64;

const tile = (y: number, x: number): Tile => ({
  dw: tileDim,
  dh: tileDim,
  sw: tileDim,
  sh: tileDim,
  sx: x * tileDim,
  sy: y * tileDim,
});

export default tile;
