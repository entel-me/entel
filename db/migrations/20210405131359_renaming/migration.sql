/*
  Warnings:

  - You are about to drop the column `Content` on the `AdminMessage` table. All the data in the column will be lost.
  - You are about to drop the column `sendAt` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `sendToId` on the `Message` table. All the data in the column will be lost.
  - Added the required column `content` to the `AdminMessage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sentAt` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sentToId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AdminMessage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sentAt" DATETIME NOT NULL,
    "content" TEXT NOT NULL,
    "sentInId" INTEGER NOT NULL,
    FOREIGN KEY ("sentInId") REFERENCES "Chat" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_AdminMessage" ("id", "sentAt", "sentInId") SELECT "id", "sentAt", "sentInId" FROM "AdminMessage";
DROP TABLE "AdminMessage";
ALTER TABLE "new_AdminMessage" RENAME TO "AdminMessage";
CREATE TABLE "new_Message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sentAt" DATETIME NOT NULL,
    "content" TEXT NOT NULL,
    "sentFromId" INTEGER NOT NULL,
    "sentToId" INTEGER NOT NULL,
    "sentInId" INTEGER NOT NULL,
    FOREIGN KEY ("sentFromId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("sentToId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("sentInId") REFERENCES "Chat" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Message" ("id", "content", "sentFromId", "sentInId") SELECT "id", "content", "sentFromId", "sentInId" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
