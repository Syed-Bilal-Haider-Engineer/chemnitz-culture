import { CategoryType } from '../src/type/Category.enum';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  const filePath = path.join(__dirname, 'chemnitz.json');
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const { features = [] } = JSON.parse(rawData);


  // Museums
  const museums = features
    .filter((feature: any) => feature?.properties?.tourism === CategoryType.MUSEUM)
    .map((feature: any) => {
      const p = feature.properties || {};
      return {
        type: feature.type ?? '',
        id: p['@id'] ?? '',
        name: p.name ?? '',
        tourism: p.tourism ?? '',
        museum: p.museum ?? '',
        museum_type: p['museum:type'] ?? '',
        operator: p.operator ?? '',
        addr_city: p['addr:city'] ?? '',
        geometry: feature.geometry ?? null,
        properties: p,
      };
    });

  // Restaurants
  const restaurants = features
    .filter((feature: any) => feature?.properties?.amenity === CategoryType.RESTAURANT)
    .map((feature: any) => {
      const p = feature.properties || {};
      return {
        type: feature.type ?? '',
        id: p['@id'] ?? '',
        name: p.name ?? '',
        amenity: p.amenity ?? '',
        cuisine: p.cuisine ?? '',
        operator: p.operator ?? '',
        addr_city: p['addr:city'] ?? '',
        geometry: feature.geometry ?? null,
        properties: p,
      };
    });

  // Theatres
  const theatres = features
    .filter((feature: any) => feature?.properties?.amenity === CategoryType.THEATRE)
    .map((feature: any) => {
      const p = feature.properties || {};
      return {
        type: feature.type ?? '',
        id: p['@id'] ?? '',
        name: p.name ?? '',
        tourism: p.tourism ?? '',
        artist_name: p['artist_name'] ?? '',
        artwork_type: p['artwork_type'] ?? '',
        operator: p.operator ?? '',
        addr_city: p['addr:city'] ?? '',
        geometry: feature.geometry ?? null,
        properties: p,
      };
    });

  // Artworks
  const artworks = features
    .filter((feature: any) => feature?.properties?.tourism === CategoryType.ARTWORK)
    .map((feature: any) => {
      const p = feature.properties || {};
      return {
        type: feature.type ?? '',
        id: p['@id'] ?? '',
        name: p.name ?? '',
        tourism: p.tourism ?? '',
        artist_name: p['artist_name'] ?? '',
        artwork_type: p['artwork_type'] ?? '',
        old_name: p['old_name'] ?? '',
        operator: p.operator ?? '',
        addr_city: p['addr:city'] ?? '',
        geometry: feature.geometry ?? null,
        properties: p,
      };
    });

  try {
    const [museumsRes, restaurantsRes, theatresRes, artworksRes] = await Promise.all([
      prisma.museums.createMany({ data: museums, skipDuplicates: true }),
      prisma.restaurants.createMany({ data: restaurants, skipDuplicates: true }),
      prisma.theatres.createMany({ data: theatres, skipDuplicates: true }),
      prisma.artworks.createMany({ data: artworks, skipDuplicates: true }),
    ]);

    console.log('✅ Seeded successfully');
    console.log(`🖼 Museums: ${museumsRes.count}`);
    console.log(`🍽 Restaurants: ${restaurantsRes.count}`);
    console.log(`🎭 Theatres: ${theatresRes.count}`);
    console.log(`🎨 Artworks: ${artworksRes.count}`);
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  }
}

main()
  .catch((e) => {
    console.error('Main failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
