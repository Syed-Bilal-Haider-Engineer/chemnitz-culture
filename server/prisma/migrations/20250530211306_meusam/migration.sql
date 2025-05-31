/*
  Warnings:

  - Added the required column `@id` to the `Museum` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Museum" ADD COLUMN     "@id" TEXT NOT NULL,
ALTER COLUMN "opening_hours:signed" DROP NOT NULL;
