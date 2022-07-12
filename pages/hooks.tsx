import Head from "next/head";
import React, { useState, useEffect } from "react";
import Layout from "../components/layout";

const Hooks = () => {
  const [count, setCount] = useState(0);

  // ReactがDOMを更新した後で反映される
  useEffect(() => {
    document.title = `You clicked ${count} times`;
    // console.log("レンダーされました");
  });

  return (
    <Layout>
      <Head>
        <title>Hooks</title>
      </Head>
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
    </Layout>
  );
};

export default Hooks;
