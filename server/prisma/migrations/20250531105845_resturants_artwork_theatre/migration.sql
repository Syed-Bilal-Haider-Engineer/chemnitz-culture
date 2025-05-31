-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "Artworks" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "tourism" TEXT,
    "museum" TEXT,
    "museum_type" TEXT,
    "old_name" TEXT,
    "operator" TEXT,
    "addr:city" TEXT,
    "geometry" JSONB NOT NULL,
    "properties" JSONB NOT NULL,

    CONSTRAINT "Artworks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Museums" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "tourism" TEXT,
    "museum" TEXT,
    "museum_type" TEXT,
    "old_name" TEXT,
    "operator" TEXT,
    "addr:city" TEXT,
    "geometry" JSONB NOT NULL,
    "properties" JSONB NOT NULL,

    CONSTRAINT "Museums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Restaurants" (
    "id" TEXT NOT NULL,
    "addr:city" TEXT,
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
    "id" TEXT NOT NULL,
    "addr:city" TEXT,
    "artist_name" TEXT,
    "artwork_type" TEXT,
    "name" TEXT,
    "tourism" TEXT,
    "operator" TEXT,
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
