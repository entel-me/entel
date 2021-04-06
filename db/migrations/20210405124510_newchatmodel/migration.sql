/*
  Warnings:

  - You are about to drop the column `sendToId` on the `AdminMessage` table. All the data in the column will be lost.
  - Added the required column `sentInId` to the `AdminMessage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sentInId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Chat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "_participatesIn" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Chat" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AdminMessage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sentAt" DATETIME NOT NULL,
    "Content" TEXT NOT NULL,
    "sentInId" INTEGER NOT NULL,
    FOREIGN KEY ("sentInId") REFERENCES "Chat" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_AdminMessage" ("id", "sentAt", "Content") SELECT "id", "sentAt", "Content" FROM "AdminMessage";
DROP TABLE "AdminMessage";
ALTER TABLE "new_AdminMessage" RENAME TO "AdminMessage";
CREATE TABLE "new_Message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sendAt" DATETIME NOT NULL,
    "content" TEXT NOT NULL,
    "sentFromId" INTEGER NOT NULL,
    "sendToId" INTEGER NOT NULL,
    "sentInId" INTEGER NOT NULL,
    FOREIGN KEY ("sentFromId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("sendToId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("sentInId") REFERENCES "Chat" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Message" ("id", "sendAt", "content", "sentFromId", "sendToId") SELECT "id", "sendAt", "content", "sentFromId", "sendToId" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_participatesIn_AB_unique" ON "_participatesIn"("A", "B");

-- CreateIndex
CREATE INDEX "_participatesIn_B_index" ON "_participatesIn"("B");
