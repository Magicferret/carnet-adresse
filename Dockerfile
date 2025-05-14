# Stage de construction
FROM node:20-alpine AS builder

WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./
COPY prisma ./prisma/

# Installation des dépendances
RUN npm ci
RUN npx prisma generate

# Copie du reste du code source
COPY . .

# Construction de l'application
RUN npm run build

# Stage de production
FROM node:20-alpine AS runner

WORKDIR /app

# Installation des dépendances de production uniquement
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production

# Copie des fichiers nécessaires depuis le stage de construction
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Variables d'environnement
ENV NODE_ENV=production
ENV PORT=3000

# Exposition du port
EXPOSE 3000

# Commande de démarrage
CMD ["npm", "start"]
