import { CategoryType } from '../../src/type/Category.enum';
import { PrismaClient, Prisma } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  const filePath = path.join(__dirname, 'chemnitz.json');
  const rawData = fs.readFileSync(filePath, 'utf-8');
  let geojsonData = JSON.parse(rawData);

  if (
    geojsonData.type !== 'FeatureCollection' ||
    !Array.isArray(geojsonData.features)
  ) {
    throw new Error('Invalid GeoJSON FeatureCollection structure.');
  }

  const featuresToSeed = geojsonData.features
    .map((feature: any) => {
      const props = feature.properties || {};
      const id = props['@id'] || feature.id;
      let category: string = 'unknown';
      if (props.tourism === CategoryType.MUSEUM) {
        category = CategoryType.MUSEUM;
      } else if (props.amenity === CategoryType.RESTAURANT) {
        category = CategoryType.RESTAURANT;
      } else if (props.amenity === CategoryType.THEATRE) {
        category = CategoryType.THEATRE;
      } else if (props.tourism === CategoryType.ARTWORK) {
        category = CategoryType.ARTWORK;
      }

      let geometryValue;
      if (feature.geometry !== null && feature.geometry !== undefined) {
        geometryValue = feature.geometry;
      }

      return {
        id,
        type: feature.type ?? 'Feature',
        category,
        geometry: geometryValue,
        properties: props,
      };
    })
    .filter((f: any) => f.id);

  if (featuresToSeed.length === 0) {
    console.warn(
      'No valid features found to seed after mapping. Check your JSON structure and ID assignment.'
    );
    return;
  }

  try {
    const result = await prisma.feature.createMany({
      data: featuresToSeed,
      skipDuplicates: true,
    });
    console.log(`\n--- Seeding Complete ---`);
    console.log(
      `Successfully processed ${geojsonData.features.length} features.`
    );
    console.log(
      `Inserted/Skipped ${result.count} features into 'Feature' table.`
    );
  } catch (error) {
    console.error('Error during database seeding:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(`Prisma error code: ${error.code}`);
      console.error(`Prisma error message: ${error.message}`);
    }
  }
}

main()
  .catch((e) => {
    console.error('Main function failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Prisma client disconnected.');
  });
