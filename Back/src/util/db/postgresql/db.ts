import { Pool } from 'pg';
import config from '../../../config';

let pgPool: Pool | null = null;

if (config.tokenStoreType === 'postgresql') {
  try {
    pgPool = new Pool({
      user: config.db.pgUser,
      host: config.db.pgHost,
      database: config.db.pgDatabase,
      password: config.db.pgPassword,
      port: config.db.pgPort,
    });
  } catch (error) {
    console.error("Erro ao conectar com o PostgreSQL:", error);
  }
}

export default pgPool;
