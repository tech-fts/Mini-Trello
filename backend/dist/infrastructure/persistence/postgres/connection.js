"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
let prisma;
if (process.env.NODE_ENV === "production") {
    prisma = new client_1.PrismaClient();
}
else {
    const globalForPrisma = global;
    if (!globalForPrisma.prisma) {
        globalForPrisma.prisma = new client_1.PrismaClient();
    }
    prisma = globalForPrisma.prisma;
}
exports.default = prisma;
