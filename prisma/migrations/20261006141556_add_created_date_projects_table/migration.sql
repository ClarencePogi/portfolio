/*
  Warnings:

  - Added the required column `createdDate` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "createdDate" TIMESTAMP(3) NOT NULL;
