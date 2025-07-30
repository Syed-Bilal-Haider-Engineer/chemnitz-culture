import { Prisma } from "@prisma/client";
import { CategoryType } from "./category.enum";

export interface FeatureProperties {
  '@id'?: string;
  name?: string;
  tourism?: CategoryType;
  amenity?: CategoryType;
  museum?: string;
  'museum:type'?: string;
  operator?: string;
  'addr:city'?: string;
  cuisine?: string;
  'artist_name'?: string;
  'artwork_type'?: string;
  'old_name'?: string;
  [key: string]: any; 
}

export interface GeoJsonFeature {
  type: string;
  id: string;
  geometry: Prisma.InputJsonValue; 
  properties: Prisma.InputJsonValue;
  [key: string]: any; 
}

export interface MuseumItem extends GeoJsonFeature {
  tourism?: CategoryType.MUSEUM;
  museum?: string;
  museum_type?: string;
  name?:      string;
  old_name?:    string;
  operator?:    string
  addr_city?:   string 
}

export interface RestaurantItem extends GeoJsonFeature {
  amenity?: CategoryType.RESTAURANT;
  cuisine?: string;
  addr_city?:  string
  name?:     string;
  operator?:   string;
}

export interface TheatreItem extends GeoJsonFeature {
  amenity?: CategoryType.THEATRE;
  name?:  string
}

export interface ArtworkItem extends GeoJsonFeature {
  tourism?: CategoryType.ARTWORK;
  name?: string;
  artist_name?: string;
  artwork_type?: string;
  old_name?: string;
  addr_city?: string;
  operator?: string
}