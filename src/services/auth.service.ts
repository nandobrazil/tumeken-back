import {comparePassword, hashPassword} from '../utils/hash';
import {FastifyTypedInstance} from "../types/types";

export const register = async (fastify: FastifyTypedInstance, email: string, password: string) => {
  const hashedPassword = await hashPassword(password);
  return fastify.prisma.user.create({
    data: {email, password: hashedPassword}
  });
};

export const login = async (fastify: FastifyTypedInstance, email: string, password: string) => {
  const user = await fastify.prisma.user.findUnique({where: {email}});
  if (!user) throw new Error('User not found');

  const valid = await comparePassword(password, user.password);
  if (!valid) throw new Error('Invalid password');

  return fastify.jwt.sign(
    { id: user.id, email: user.email },
    { expiresIn: '1m' }
  );
};



