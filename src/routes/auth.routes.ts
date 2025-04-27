import {registerController, loginController} from '../controllers/auth.controller';
import {FastifyTypedInstance} from "../types/types";

export default async function authRoutes(fastify: FastifyTypedInstance) {
  fastify.post('/register', registerController);
  fastify.post('/login', loginController);

  fastify.get('/private', {
    preHandler: [fastify.authenticate],
  }, async (req, reply) => {
    return {hello: 'You are authenticated!'};
  });
}
