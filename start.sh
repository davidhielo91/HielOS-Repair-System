#!/bin/sh
set -e

echo "Running database migrations..."
npx prisma migrate deploy --schema=./prisma/schema.prisma 2>/dev/null || \
  npx prisma db push --schema=./prisma/schema.prisma --accept-data-loss 2>/dev/null || \
  echo "Warning: Could not run migrations, database may already be up to date"

echo "Starting application..."
exec node server.js
