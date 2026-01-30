import {
  FastifyError,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";

export async function errorHandler(app: FastifyInstance) {
  app.setErrorHandler(
    (error: unknown, req: FastifyRequest, reply: FastifyReply) => {
      req.log.error({ err: error });

      let statusCode = 500;
      let message = "Internal Server Error";

      if (isFastifyError(error)) {
        statusCode = error.statusCode ?? 500;
        message = error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      reply.code(statusCode).send({ message });
    },
  );
}

function isFastifyError(error: unknown): error is FastifyError {
  return typeof error === "object" && error !== null && "statusCode" in error;
}
