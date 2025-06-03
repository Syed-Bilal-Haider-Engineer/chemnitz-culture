import { ArtworkItem } from "../type/FeatureProperties.type";

function artworkMapping(feature:ArtworkItem) : ArtworkItem  {
   const {tourism, name, artist_name, artwork_type,old_name,addr_city,operator} = feature?.properties as any ?? {};
  return {
        ... feature,
      tourism: tourism ?? '',
      name: name ?? '',
      artist_name: artist_name ?? '',
      artwork_type: artwork_type ?? '',
      old_name: old_name ?? '',
      addr_city: addr_city ?? '',
      operator : operator ?? '',
    }
}

export default artworkMapping;