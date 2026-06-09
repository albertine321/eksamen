//Henter inn NextAuth og Google-integrasjonen
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

//Lager en NextAuth-handler med Google som innloggingsleverandør. 
// clientId og clientSecret er nøklene du fikk fra Google Cloud — de beviser at appen din er registrert og godkjent av Google. 
// ! betyr "jeg er sikker på at denne verdien ikke er undefined".
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
//der brukeren sendes for å logge inn.
  pages: {
    signIn: "/login",
  },
//sørger for at brukeren sendes til forsiden etter innlogging.
  callbacks: {
    async redirect() {
      return "/";
    },
  },
});
//Eksporterer handleren som både GET og POST
// GET brukes når nettleseren besøker innloggingssiden
// POST brukes når brukeren faktisk sender inn innloggingsinformasjonen
export { handler as GET, handler as POST };