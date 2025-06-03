-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "Artworks" (
    "type" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "name" TEXT,
    "artist_name" TEXT,
    "artwork_type" TEXT,
    "tourism" TEXT,
    "old_name" TEXT,
    "operator" TEXT,
    "addr_city" TEXT,
    "geometry" JSONB NOT NULL,
    "properties" JSONB NOT NULL,

    CONSTRAINT "Artworks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Museums" (
    "type" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "name" TEXT,
    "tourism" TEXT,
    "museum" TEXT,
    "museum_type" TEXT,
    "old_name" TEXT,
    "operator" TEXT,
    "addr_city" TEXT,
    "geometry" JSONB NOT NULL,
    "properties" JSONB NOT NULL,

    CONSTRAINT "Museums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Restaurants" (
    "type" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "addr_city" TEXT,
    "amenity" TEXT,
    "cuisine" TEXT,
    "name" TEXT,
    "operator" TEXT,
    "geometry" JSONB NOT NULL,
    "properties" JSONB NOT NULL,

    CONSTRAINT "Restaurants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Theatres" (
    "type" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "amenity" TEXT,
    "name" TEXT,
    "geometry" JSONB NOT NULL,
    "properties" JSONB NOT NULL,

    CONSTRAINT "Theatres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Artworks_id_key" ON "Artworks"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Museums_id_key" ON "Museums"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Restaurants_id_key" ON "Restaurants"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Theatres_id_key" ON "Theatres"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
