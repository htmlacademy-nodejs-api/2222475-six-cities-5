export interface CityType {
  id: number;
  title: string;
  lat: number;
  lng: number;
}

export type Cities = {
  [key: string]: CityType
};
