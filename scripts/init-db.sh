#!/bin/sh

# Attendre que le conteneur soit prêt
sleep 2

# Exécuter les migrations Prisma
npx prisma migrate deploy

# Vérifier si la base de données existe
if [ ! -f /app/data/dev.db ]; then
  echo "Initializing database..."
  touch /app/data/dev.db
fi

# Démarrer l'application
echo "Starting application..."
exec node server.js
