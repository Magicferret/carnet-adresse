# Carnet d'Adresses

Une application de gestion de contacts moderne et intuitive, développée avec les technologies actuelles utilisées dans l'entreprise.

## 🚀 Technologies Utilisées

- **Next.js 14** : Framework React moderne avec support du Server Side Rendering et des API Routes
- **TypeScript** : Pour un développement plus robuste et une meilleure maintenabilité
- **Tailwind CSS** : Framework CSS utility-first pour un design moderne et responsive
- **Prisma** : ORM moderne pour une gestion simplifiée de la base de données
- **SQLite** : Base de données légère et performante, parfaite pour le développement
- **SWC** : Compilateur JavaScript/TypeScript rapide pour optimiser le développement

## 🛠️ Installation

1. Clonez le repository :
```bash
git clone [url-du-repo]
cd carnet-adresse
```

2. Configurez l'environnement :
```bash
# Créez votre fichier .env à partir de l'exemple
cp .env.example .env

# Modifiez les variables d'environnement si nécessaire
# Par défaut, la configuration utilise SQLite en local
```

3. Installez les dépendances :
```bash
npm install
```

4. Configurez la base de données :
```bash
# Génère le client Prisma
npx prisma generate

# Exécute les migrations
npx prisma migrate dev

# (Optionnel) Ajoute des données de test
npx prisma db seed
```

5. Lancez l'application en mode développement :
```bash
npm run dev
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

## 🔧 Configuration de l'Environnement

Le projet utilise des variables d'environnement pour la configuration. Voici les variables nécessaires :

### Variables Requises (.env)

```env
# Base de données
DATABASE_URL="file:./sqlite.db"

# Variables d'environnement Next.js
NEXT_PUBLIC_API_URL="http://localhost:3000/api"

# Variables pour les tests (optionnel)
TEST_DATABASE_URL="file:./test.db"
```

### Mode de Développement vs Production

- **Développement** : Utilisez `DATABASE_URL="file:./sqlite.db"`
- **Production** : Configurez selon votre environnement
- **Tests** : Utilisez une base de données séparée avec `TEST_DATABASE_URL`

## 🏗️ Choix Techniques et Architecture

### Pourquoi ces technologies ?

- **Next.js** : Choisi pour sa performance, son excellent support du SSR et sa compatibilité avec l'écosystème React déjà utilisé dans l'entreprise.

- **Prisma + SQLite** :
  - Prisma offre une expérience développeur exceptionnelle avec son système de types automatique
  - SQLite permet un développement rapide sans configuration complexe
  - Migration facile vers PostgreSQL ou MySQL en production si nécessaire

- **TypeScript** : Apporte la sécurité de type et améliore la maintenabilité du code, en ligne avec les standards de l'entreprise.

### Architecture du Projet

- `/src` : Code source principal de l'application
  - `/app` : Routes et pages Next.js
  - `/components` : Composants React réutilisables
  - `/lib` : Utilitaires et configurations
  - `/hooks` : Custom hooks React

- `/prisma` : Schéma de base de données et migrations
- `/public` : Assets statiques (images, avatars)

### Fonctionnalités Principales

- ✨ Interface utilisateur moderne et responsive
- 📝 CRUD complet pour la gestion des contacts
- 🔍 Recherche et filtrage des contacts
- 🎨 Système d'avatars personnalisables
- ⚡ Performance optimisée avec le SSR

## 🧪 Tests

Pour lancer les tests :

```bash
# Tests unitaires et d'intégration
npm run test

# Tests des composants uniquement
npm run test:components

# Tests de l'API uniquement
npm run test:api

# Tests avec couverture
npm run test:coverage
```

## 📦 Build et Déploiement

Pour construire l'application pour la production :

```bash
npm run build
```

Pour lancer l'application en production :

```bash
npm run start
```

## 🐳 Docker

L'application peut être exécutée avec Docker :

```bash
# Construction et démarrage des conteneurs
docker-compose up --build

# Arrêt des conteneurs
docker-compose down
```

### Configuration Docker

Le projet inclut :
- `Dockerfile` : Configuration de l'image Docker
- `docker-compose.yml` : Orchestration des services
- Variables d'environnement configurées pour Docker

## 📝 License

[MIT](LICENSE)
