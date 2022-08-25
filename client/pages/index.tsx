import type { NextPage } from 'next';
import Head from 'next/head';
import { useAccount } from 'wagmi';
import { TodoIndex } from '../components/TodoIndex';
import { Welcome } from '../components/Welcome';

const Home: NextPage = () => {
  const { isConnected } = useAccount();

  return (
    <div className='flex h-screen'>
      <Head>
        <title>Example TODO dApp</title>
        <meta
          name="description"
          content="An example TODO dApp built on Ethereum"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='flex flex-col grow'>

        <Welcome />

        <div className='flex grow justify-center'>
          {isConnected && <TodoIndex />}
        </div>

      </main>
    </div>
  );
};

export default Home;
