import z from 'zod';
import { FastifyTypedInstance } from './types/types';
import { randomUUID } from 'node:crypto';

export async function routes(app: FastifyTypedInstance) {
  app.get('/', () => {
    return { message: 'Hello, world!' };
  });

  app.get(
    '/users',
    {
      schema: {
        tags: ['Users']
      }
    },
    () => {
      return [];
    }
  );

  app.post(
    '/users',
    {
      schema: {
        tags: ['Users'],
        description: 'Create a new user',
        summary: 'Create a user',
        body: z.object({
          name: z.string(),
          email: z.string().email()
        }),
        response: {
          201: z.object({
            id: z.string().uuid(),
            name: z.string(),
            email: z.string().email()
          })
        }
      }
    },
    async (request, reply) => {
      const { name, email } = request.body;
      return reply.status(201).send({
        id: randomUUID(),
        name,
        email
      });
    }
  );
}
