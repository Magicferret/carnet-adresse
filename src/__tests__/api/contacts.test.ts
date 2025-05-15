import { DELETE, GET as GET_BY_ID, PUT } from '@/app/api/contacts/[id]/route';
import { GET, POST } from '@/app/api/contacts/route';
import { prisma } from '@/lib/prisma';
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals';
import { NextRequest } from 'next/server';
import { createMocks } from 'node-mocks-http';

describe('Contacts API', () => {
  const testContact = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+33123456789',
    avatarSlug: 'default-avatar'
  };

  let contactId: number;

  beforeAll(async () => {
    // Nettoyer la base de données avant les tests
    await prisma.contact.deleteMany();
  });

  afterAll(async () => {
    // Nettoyer la base de données après les tests
    await prisma.contact.deleteMany();
    await prisma.$disconnect();
  });

  describe('POST /api/contacts', () => {
    it('devrait créer un nouveau contact', async () => {
      const { req } = createMocks({
        method: 'POST',
      });

      // Simuler le corps de la requête
      req.json = jest.fn().mockResolvedValue(testContact);

      const response = await POST(req as unknown as NextRequest);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data).toMatchObject(testContact);
      contactId = data.id;
    });

    it('devrait retourner une erreur 400 si les données sont incomplètes', async () => {
      const { req } = createMocks({
        method: 'POST',
      });

      // Simuler un corps de requête incomplet
      req.json = jest.fn().mockResolvedValue({ firstName: 'John' });

      const response = await POST(req as unknown as NextRequest);
      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/contacts', () => {
    it('devrait retourner tous les contacts', async () => {
      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/contacts/[id]', () => {
    it('devrait retourner un contact spécifique', async () => {
      const { req } = createMocks({
        method: 'GET',
      });

      const response = await GET_BY_ID(
        req as unknown as NextRequest,
        { params: { id: contactId.toString() } }
      );
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toMatchObject(testContact);
    });

    it('devrait retourner 404 pour un ID inexistant', async () => {
      const { req } = createMocks({
        method: 'GET',
      });

      const response = await GET_BY_ID(
        req as unknown as NextRequest,
        { params: { id: '99999' } }
      );

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /api/contacts/[id]', () => {
    it('devrait mettre à jour un contact existant', async () => {
      const updatedContact = {
        ...testContact,
        firstName: 'Jane',
        lastName: 'Smith',
      };

      const { req } = createMocks({
        method: 'PUT',
      });

      req.json = jest.fn().mockResolvedValue(updatedContact);

      const response = await PUT(
        req as unknown as NextRequest,
        { params: { id: contactId.toString() } }
      );
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toMatchObject(updatedContact);
    });

    it('devrait retourner une erreur 400 si les données sont incomplètes', async () => {
      const { req } = createMocks({
        method: 'PUT',
      });

      req.json = jest.fn().mockResolvedValue({ firstName: 'Jane' });

      const response = await PUT(
        req as unknown as NextRequest,
        { params: { id: contactId.toString() } }
      );

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /api/contacts/[id]', () => {
    it('devrait supprimer un contact existant', async () => {
      const { req } = createMocks({
        method: 'DELETE',
      });

      const response = await DELETE(
        req as unknown as NextRequest,
        { params: { id: contactId.toString() } }
      );

      expect(response.status).toBe(204);

      // Vérifier que le contact a bien été supprimé
      const { req: getReq } = createMocks({
        method: 'GET',
      });

      const getResponse = await GET_BY_ID(
        getReq as unknown as NextRequest,
        { params: { id: contactId.toString() } }
      );
      expect(getResponse.status).toBe(404);
    });
  });
});
