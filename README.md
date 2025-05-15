# Carnet d'Adresses

Une application de gestion de contacts développée dans le cadre d'un test technique.

## 🚀 Technologies Utilisées

- **Next.js 14**
- **TypeScript**
- **Tailwind CSS** : Framework CSS
- **Prisma** : ORM
- **SQLite** : Base de données
- **Jest** : Framework de test unitaire
- **Docker** : Conteneurisation

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

3. Configurez la base de données :
```bash
npx prisma generate
npx prisma migrate dev
```

4. Lancez l'application en mode développement :
```bash
npm run dev
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

### Architecture du Projet

- `/src` : Code source principal de l'application
  - `/app` : Routes et pages Next.js
  - `/components` : Composants React réutilisables
  - `/lib` : Utilitaires et configurations

- `/prisma` : Schéma de base de données et migrations
- `/public` : Assets statiques (images, avatars)

### Fonctionnalités Principales

- ✨ Interface utilisateur moderne et responsive
- 📝 CRUD complet pour la gestion des contacts
- 🔍 Recherche et filtrage des contacts
- 🎨 Système d'avatars personnalisables

## 🧪 Tests

Pour lancer les tests :

```bash
npm run test
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

L'application peut également être lancée avec Docker :

```bash
docker-compose up
```
