// import {createServerRunner} from '@aws-amplify/adapter-nextjs'
// import {getCurrentUser} from "aws-amplify/auth/server";
// import {cookies} from "next/headers";
// import {fetchAuthSession} from "@aws-amplify/core";
//
// export const { runWithAmplifyServerContext } = createServerRunner({ config });
//
//
// export async function AuthGetCurrentUserServer() {
//
//     try {
//
//         const currentUser = await runWithAmplifyServerContext({
//
//             nextServerContext: { cookies },
//
//             operation: (contextSpec) => getCurrentUser(contextSpec),
//
//         });
//
//         return currentUser;
//
//     } catch (error) {
//
//         console.error(error);
//
//     }
//
// }
//
//
// export async function AuthGetCurrentSessionServer() {
//
//     return await runWithAmplifyServerContext({
//
//         nextServerContext: { cookies },
//
//         operation: async (contextSpec) => {
//
//             try {
//
//                 const session = await fetchAuthSession(contextSpec);
//
//                 return session.tokens;
//
//             } catch (error) {
//
//                 console.log(error);
//
//                 return null;
//
//             }
//
//         }
//
//     });
//
// }