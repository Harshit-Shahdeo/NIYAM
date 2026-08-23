import os
from pathlib import Path

import psycopg
from dotenv import load_dotenv

PROJECT_ROOT = Path(__file__).resolve().parents[3]

# Load both root and backend .env files
load_dotenv(PROJECT_ROOT / ".env")
load_dotenv(PROJECT_ROOT / "backend" / ".env")


def get_connection():
    db_url = os.getenv("DATABASE_URL")
    if db_url:
        # Strip Prisma-specific query params like ?schema=public
        clean_url = db_url.split("?")[0]
        return psycopg.connect(clean_url)

    return psycopg.connect(
        host=os.getenv("DB_HOST", "localhost"),
        port=os.getenv("DB_PORT", "5432"),
        dbname=os.getenv("DB_NAME", "niyam"),
        user=os.getenv("DB_USER") or os.getenv("USER") or "postgres",
        password=os.getenv("DB_PASSWORD") or None,
    )