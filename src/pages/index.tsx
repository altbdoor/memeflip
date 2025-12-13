import Head from "next/head";
// import { useState } from "react";

export default function Home() {
  // const [count, setCount] = useState(1);

  return (
    <>
      <Head>
        <title>memeflip</title>
      </Head>

      <div className="row">
        <div className="col-sm-6">
          <canvas></canvas>
        </div>
        <div className="col-sm-6"></div>
      </div>
    </>
  );
}
