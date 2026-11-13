/*
  Warnings:

  - Added the required column `imagePath` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "imagePath" TEXT NOT NULL,
ADD COLUMN     "link" TEXT NOT NULL;
