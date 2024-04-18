/*
  Warnings:

  - You are about to drop the column `ling` on the `bookmarks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bookmarks" DROP COLUMN "ling",
ADD COLUMN     "link" TEXT;
