/*
  Warnings:

  - You are about to drop the column `position_x` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `position_y` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "last_latitude" REAL,
    "last_longitude" REAL
);
INSERT INTO "new_User" ("id", "createdAt", "updatedAt", "name", "email", "hashedPassword", "role") SELECT "id", "createdAt", "updatedAt", "name", "email", "hashedPassword", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
