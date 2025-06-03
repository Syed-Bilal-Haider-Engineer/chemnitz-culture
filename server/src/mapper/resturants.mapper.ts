import { RestaurantItem } from "../type/FeatureProperties.type";
function resturantMapping (feature:RestaurantItem):RestaurantItem {
   const {amenity, cuisine,addr_city,name,operator} = feature?.properties as any ?? {};
  return {
        ... feature,
      amenity:amenity ?? '',
      cuisine: cuisine ?? '',
      addr_city: addr_city ?? '',
      name: name ?? '',
      operator: operator ?? ''
    }
}

export default resturantMapping;