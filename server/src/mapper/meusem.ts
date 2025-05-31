// import { Museum } from "@/type/meusamType";

// export function mapToPrismaMuseum(input: Record<string, any>): Partial<Museum> {
//   const fieldMap: Record<string, keyof Museum> = {
//     "ref:isil": "ref_isil",
//     "building:levels": "building_levels",
//     "roof:shape": "roof_shape",
//     "addr:city": "addr_city",
//     "addr:country": "addr_country",
//     "addr:housenumber": "addr_housenumber",
//     "addr:postcode": "addr_postcode",
//     "addr:street": "addr_street",
//     "addr:suburb": "addr_suburb",
//     "phone:mobile": "phone_mobile",
//     "contact:website": "contact_website",
//     "toilets:access": "toilets_access",
//     "toilets:wheelchair": "toilets_wheelchair",
//     "opening_hours:signed": "opening_hours_signed",
//     "check_date:opening_hours": "check_date_opening_hours",
//     "@geometry": "geometry_positions",
//     "@id": "node_id"
//   };

//   const result: Partial<Museum> = {};

//   for (const [key, value] of Object.entries(input)) {
//     if (value !== null && value !== undefined && value !== "") {
//       const mappedKey = fieldMap[key] ?? (key as keyof Museum);
//       result[mappedKey] = value;
//     }
//   }

//   return result;
// }
