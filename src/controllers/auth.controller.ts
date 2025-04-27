import { FastifyRequest, FastifyReply } from 'fastify';
import { register, login } from '../services/auth.service';

export const registerController = async (request: FastifyRequest, reply: FastifyReply) => {
  const { email, password } = request.body as any;
  const user = await register(request.server, email, password);
  reply.code(201).send(user);
};

export const loginController = async (request: FastifyRequest, reply: FastifyReply) => {
  const { email, password } = request.body as any;
  const token = await login(request.server, email, password);
  reply.send({ token });
};
