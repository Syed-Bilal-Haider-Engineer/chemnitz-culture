import { MuseumItem } from '../type/featureProperties.type';

function meusemMapping(feature: MuseumItem): MuseumItem {
  const { tourism, museum, museum_type,name,old_name,operator,addr_city } = feature?.properties as any ?? {};
  return {
    ...feature,
    tourism: tourism ?? '',
    museum: museum ?? '',
    museum_type: museum_type ?? '',
    name: name ?? '',
    old_name: old_name ?? '',
    operator: operator ?? '',
    addr_city: addr_city ?? ''
  };
}

export default meusemMapping;
