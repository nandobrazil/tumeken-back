import {fastify} from 'fastify';
import prisma from './plugins/prisma';
import jwt from './plugins/jwt';
import authRoutes from './routes/auth.routes';
import {jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider} from "fastify-type-provider-zod";
import {fastifyCors} from "@fastify/cors";
import {fastifySwagger} from "@fastify/swagger";
import {fastifySwaggerUi} from "@fastify/swagger-ui";

const app = fastify({logger: true}).withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
  origin: '*'
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'My API',
      version: '1.0.0'
    }
  },
  transform: jsonSchemaTransform
});

app.register(fastifySwaggerUi, {
  routePrefix: '/docs'
});

app.register(prisma);
app.register(jwt);
app.register(authRoutes, {prefix: '/auth'});

export default app;
