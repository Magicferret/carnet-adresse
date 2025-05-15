#!/bin/sh

echo "Starting initialization script..."

# Vérifier que le répertoire data existe
if [ ! -d "/app/data" ]; then
  echo "Creating data directory..."
  mkdir -p /app/data
fi

# Vérifier si la base de données existe
if [ ! -f "/app/data/dev.db" ]; then
  echo "Creating database file..."
  touch /app/data/dev.db
fi

echo "Current directory: $(pwd)"
echo "Database path: /app/data/dev.db"
echo "Database URL: $DATABASE_URL"
echo "Files in /app/data:"
ls -la /app/data

echo "Running Prisma migrations..."
# Exécuter les migrations Prisma
npx prisma migrate deploy

echo "Starting application..."
exec node server.js
