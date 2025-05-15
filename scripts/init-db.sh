#!/bin/sh

# Attendre que le conteneur soit prêt
sleep 2

# Exécuter les migrations Prisma
npx prisma migrate deploy

# Vérifier si la base de données existe
if [ ! -f /app/dev.db ]; then
  # Si elle n'existe pas, créer la base et donner les bonnes permissions
  touch /app/dev.db
  chown nextjs:nodejs /app/dev.db
  chmod 644 /app/dev.db
fi
