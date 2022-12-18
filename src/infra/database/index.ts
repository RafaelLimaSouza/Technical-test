import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient({
      errorFormat: 'pretty',
      log: ['query', 'info', 'error']
    });
} else {
    if (!global.prisma) {
      global.prisma = new PrismaClient({
        errorFormat: 'pretty',
        log: ['query', 'info', 'error']
      });
    }

    prisma = global.prisma;
}

export default prisma
