module.exports = async () => {
  // Configuration de la base de données de test
  process.env.DATABASE_URL = process.env.TEST_DATABASE_URL || 'file:./test.db'

  // Autres configurations globales pour les tests
  process.env.NODE_ENV = 'test'
}
