/*
  Warnings:

  - You are about to drop the column `museum` on the `Artworks` table. All the data in the column will be lost.
  - You are about to drop the column `museum_type` on the `Artworks` table. All the data in the column will be lost.
  - Added the required column `type` to the `Artworks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Museums` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Restaurants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Theatres` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Artworks" DROP COLUMN "museum",
DROP COLUMN "museum_type",
ADD COLUMN     "artist_name" TEXT,
ADD COLUMN     "artwork_type" TEXT,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Museums" ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Restaurants" ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Theatres" ADD COLUMN     "type" TEXT NOT NULL;
