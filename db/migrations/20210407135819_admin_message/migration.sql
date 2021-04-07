/*
  Warnings:

  - You are about to drop the column `adminMessageId` on the `User` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_wasReadBy" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    FOREIGN KEY ("A") REFERENCES "AdminMessage" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

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
INSERT INTO "new_User" ("id", "createdAt", "updatedAt", "name", "email", "hashedPassword", "role", "last_latitude", "last_longitude") SELECT "id", "createdAt", "updatedAt", "name", "email", "hashedPassword", "role", "last_latitude", "last_longitude" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_wasReadBy_AB_unique" ON "_wasReadBy"("A", "B");

-- CreateIndex
CREATE INDEX "_wasReadBy_B_index" ON "_wasReadBy"("B");
