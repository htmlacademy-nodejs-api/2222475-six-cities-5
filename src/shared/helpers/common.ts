import { City } from '../types/index.js';
import { LAT_NUM_AFTER_DIGIT, LNG_NUM_AFTER_DIGIT } from '../../const.js';

export function generateRandomValue(min:number, max: number, numAfterDigit = 0) {
  return +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
}

export function getRandomItems<T>(items: T[]):T[] {
  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition = startPosition + generateRandomValue(startPosition, items.length);
  return items.slice(startPosition, endPosition);
}

export function getRandomItem<T>(items: T[]):T {
  return items[generateRandomValue(0, items.length - 1)];
}

export function getRandomPosition(city: City):string {
  const randLat = generateRandomValue(city.lat - 0.03, city.lat + 0.03, LAT_NUM_AFTER_DIGIT);
  const randLng = generateRandomValue(city.lng - 0.03, city.lng + 0.03, LNG_NUM_AFTER_DIGIT);

  return `${randLat}:${randLng}`;
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}
