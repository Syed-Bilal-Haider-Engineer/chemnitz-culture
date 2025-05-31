// GeoJSON Geometry Type for a Point
export type Geometry = {
  type: 'Point';
  coordinates: [number, number];
};

// Main Museum Feature (GeoJSON-like structure)
export interface Museum {
  type: string; // usually 'Feature'
  properties: MuseumProperties;
  geometry: Geometry;
  id: string; // Feature ID, not the same as properties.id
}

// Museum-specific metadata (attributes from database/GeoJSON)
export interface MuseumProperties {
  id: string;
  node_id: string;
  landuse?: string;
  name?: string;
  tourism?: string;
  museum?: string;
  museum_type?: string;
  alt_name?: string;
  description?: string;
  architect?: string;
  start_date?: string;
  old_name?: string;
  note?: string;
  operator?: string;
  operator_name?: string;
  ref_isil?: string;
  building?: string;
  building_levels?: string;
  level?: string;
  roof_shape?: string;
  roof_levels?: string;
  height?: string;
  addr_city?: string;
  addr_country?: string;
  addr_housenumber?: string;
  addr_postcode?: string;
  addr_street?: string;
  addr_suburb?: string;
  phone?: string;
  railway?: string;
  phone_mobile?: string;
  contact_website?: string;
  email?: string;
  fax?: string;
  website?: string;
  wikipedia?: string;
  wikidata?: string;
  wheelchair?: string;
  toilets?: string;
  toilets_access?: string;
  toilets_wheelchair?: string;
  changing_table?: string;
  fee?: string;
  opening_hours?: string;
  opening_hours_signed?: string;
  check_date?: string;
  check_date_opening_hours?: string;
  geometry_positions?: string;
  historic?: string;
  tourism_1?: string;
}
