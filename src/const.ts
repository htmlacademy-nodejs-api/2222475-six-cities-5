import { Cities } from './shared/types/city.type.js';

export const CITIES: Cities = [
  {
    id: 1,
    title: 'Paris',
    lat: 48.85661,
    lng: 2.351499,
  },
  {
    id: 2,
    title: 'Cologne',
    lat: 50.938361,
    lng: 6.959974,
  },
  {
    id: 3,
    title: 'Brussels',
    lat: 50.846557,
    lng: 4.351697,
  },
  {
    id: 4,
    title: 'Amsterdam',
    lat: 52.37454,
    lng: 4.897976,
  },
  {
    id: 5,
    title: 'Hamburg',
    lat: 53.550341,
    lng: 10.000654,
  },
  {
    id: 6,
    title: 'Dusseldorf',
    lat: 51.225402,
    lng: 6.776314,
  },
];

export const ROOM_TYPE = {
  house: 'House',
  apartment: 'Apartment',
  room: 'Private Room',
  hotel: 'Hotel',
};

export const LAT_NUM_AFTER_DIGIT = 5;
export const LNG_NUM_AFTER_DIGIT = 6;
