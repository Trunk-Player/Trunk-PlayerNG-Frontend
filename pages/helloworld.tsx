import Head from "next/head";

const HelloWorld = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-red-700">
        <h1 className="text-6xl font-bold text-red-700">Hello World!</h1>

        <p className="mt-3 text-2xl text-red-700">
          This is a test page. The app is alive!
        </p>
      </main>
    </div>
  );
};

export default HelloWorld;
