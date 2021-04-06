-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AdminMessage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sentAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "sentInId" INTEGER NOT NULL,
    FOREIGN KEY ("sentInId") REFERENCES "Chat" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_AdminMessage" ("id", "sentAt", "content", "sentInId") SELECT "id", "sentAt", "content", "sentInId" FROM "AdminMessage";
DROP TABLE "AdminMessage";
ALTER TABLE "new_AdminMessage" RENAME TO "AdminMessage";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
