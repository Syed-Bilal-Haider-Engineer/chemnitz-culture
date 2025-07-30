
import { artworkMapping, meusemMapping, resturantMapping, thearterMapping } from '../../src/mapper';
import { CategoryKey, CategoryType } from '../../src/type/category.enum';
import { FeatureProperties } from '@/src/type/featureProperties.type';
import fs from 'fs';
import path from 'path';

 const categoryMappers = {
  [CategoryType.ARTWORK]: artworkMapping,
  [CategoryType.MUSEUM]: meusemMapping,
  [CategoryType.RESTAURANT]: resturantMapping,
  [CategoryType.THEATRE]: thearterMapping,
};

export function processGeoJsonData<T extends FeatureProperties>(
  categoryKey: CategoryKey,
  categoryType: CategoryType,
): T[] {
  
  const filePath = path.join(__dirname, 'chemnitz.json');
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const { features = [] } = JSON.parse(rawData);
  return features
    .filter((feature:any) => feature?.properties?.[categoryKey].toLowerCase().trim() === categoryType.toLowerCase().trim())
    .map((feature: any) =>  categoryMappers[categoryType](feature));
}
