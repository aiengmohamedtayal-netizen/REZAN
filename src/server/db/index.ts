import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";

let _db: DatabaseSync | null = null;

function getDbPath(): string {
  if (process.env.REZAN_DB_PATH) {
    return process.env.REZAN_DB_PATH;
  }
  const dataDir = path.resolve(process.cwd(), ".data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  return path.join(dataDir, "rezan.sqlite");
}

export function getDb(): DatabaseSync {
  if (_db) return _db;

  const dbPath = getDbPath();
  _db = new DatabaseSync(dbPath);
  _db.exec("PRAGMA journal_mode = WAL;");
  _db.exec("PRAGMA foreign_keys = ON;");

  initSchema(_db);
  return _db;
}

function initSchema(db: DatabaseSync) {
  // Check if schema already initialized
  const check = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='admins'").get();
  if (check) {
    return;
  }

  // Load and execute schema.sql
  const schemaPath = path.resolve(process.cwd(), "src/server/db/schema.sql");
  if (fs.existsSync(schemaPath)) {
    const schemaSql = fs.readFileSync(schemaPath, "utf-8");
    db.exec(schemaSql);
  }

  // Load and execute seed.sql
  const seedPath = path.resolve(process.cwd(), "src/server/db/seed.sql");
  if (fs.existsSync(seedPath)) {
    const seedSql = fs.readFileSync(seedPath, "utf-8");
    db.exec(seedSql);
  }
}

/**
 * Type-safe query helper for executing SQL queries
 */
export function queryAll<T = Record<string, unknown>>(sql: string, params: unknown[] = []): T[] {
  const db = getDb();
  const stmt = db.prepare(sql);
  return stmt.all(...params) as T[];
}

export function queryOne<T = Record<string, unknown>>(sql: string, params: unknown[] = []): T | null {
  const db = getDb();
  const stmt = db.prepare(sql);
  const result = stmt.get(...params);
  return (result as T) ?? null;
}

export function execute(sql: string, params: unknown[] = []): { changes: number | bigint; lastInsertRowid: number | bigint } {
  const db = getDb();
  const stmt = db.prepare(sql);
  return stmt.run(...params);
}

export function transaction<T>(fn: () => T): T {
  const db = getDb();
  db.exec("BEGIN IMMEDIATE TRANSACTION;");
  try {
    const res = fn();
    db.exec("COMMIT;");
    return res;
  } catch (err) {
    db.exec("ROLLBACK;");
    throw err;
  }
}
