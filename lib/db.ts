import { PrismaClient } from "@prisma/client";
// import { PrismaLibSQL } from "@prisma/adapter-libsql";
// import { createClient } from "@libsql/client";

// const libsql = createClient({
// 	url: `${process.env.TURSO_DATABASE_URL}`,
// 	authToken: `${process.env.TURSO_AUTH_TOKEN}`,
// });

// const adapter = new PrismaLibSQL(libsql);

declare global {
	let prisma: PrismaClient | undefined;
}

// export const db =
// 	globalThis.prisma ||
// 	new PrismaClient({ adapter }).$extends({
// 		query: {
// 			$allModels: {
// 				async $allOperations({ operation, model, args, query }) {
// 					const result = await query(args);

// 					// Synchronize the embedded replica after any write operation
// 					if (["create", "update", "delete"].includes(operation)) {
// 						await libsql.sync();
// 					}

// 					return result;
// 				},
// 			},
// 		},
// 	});

export const db = globalThis.db || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
