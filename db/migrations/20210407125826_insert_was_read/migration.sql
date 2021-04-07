-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AdminMessage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sentAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "wasRead" BOOLEAN NOT NULL DEFAULT false,
    "sentInId" INTEGER NOT NULL,
    FOREIGN KEY ("sentInId") REFERENCES "Chat" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_AdminMessage" ("id", "sentAt", "content", "sentInId") SELECT "id", "sentAt", "content", "sentInId" FROM "AdminMessage";
DROP TABLE "AdminMessage";
ALTER TABLE "new_AdminMessage" RENAME TO "AdminMessage";
CREATE TABLE "new_Message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sentAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "wasRead" BOOLEAN NOT NULL DEFAULT false,
    "sentFromId" INTEGER NOT NULL,
    "sentToId" INTEGER NOT NULL,
    "sentInId" INTEGER NOT NULL,
    FOREIGN KEY ("sentFromId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("sentToId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("sentInId") REFERENCES "Chat" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Message" ("id", "sentAt", "content", "sentFromId", "sentToId", "sentInId") SELECT "id", "sentAt", "content", "sentFromId", "sentToId", "sentInId" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
