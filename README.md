# Carnet d'Adresses

Une application de gestion de contacts moderne et intuitive, développée avec les technologies actuelles utilisées dans l'entreprise.

## 🚀 Technologies Utilisées

- **Next.js 14**
- **TypeScript**
- **Tailwind CSS** : Framework CSS
- **Prisma** : ORM
- **SQLite** : Base de données
- **Jest** : Framework de test

## 🛠️ Installation

1. Clonez le repository :
```bash
git clone [url-du-repo]
cd carnet-adresse
```

2. Installez les dépendances :
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
DATABASE_URL="file:./dev.db"
```

### Architecture du Projet

- `/src` : Code source principal de l'application
  - `/app` : Routes et pages Next.js
  - `/components` : Composants React réutilisables
  - `/lib` : Utilitaires et configurations
  - `/hooks` : Custom hooks React

- `/prisma` : Schéma de base de données et migrations
- `/public` : Assets statiques (images, avatars)


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

![Warning](./warning.png)
Docker ne fonctionne pas correctement avec la base de données SQLite actuellement.
## 📝 License

[MIT](LICENSE)
