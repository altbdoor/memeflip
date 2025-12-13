import Head from "next/head";
import Link from "next/link";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404</title>
      </Head>

      <h1>404 - Page not found</h1>
      <p>
        Click <Link href="/">here</Link> to return home.
      </p>
    </>
  );
}
