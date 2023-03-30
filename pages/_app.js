import "@/styles/globals.css";
import { Container } from "@mui/system";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Crud NEXT JS Firebase</title>
        <meta name="description" content="Crud con NEXT JS y Firebase"></meta>
        <meta name="author" content="davarmando@gmail.com"></meta>
        <meta
          name="keywords"
          content="crud next js, next js, firebase, firestore"
        ></meta>
      </Head>
      <Container>
        <h1 align="center" >CRUD USUARIOS con NEXT JS y FIREBASE</h1>
        <Component {...pageProps} />
      </Container>
    </>
  );
}
