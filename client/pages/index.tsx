import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useAccount } from 'wagmi';
import { TodoIndex } from '../components/TodoIndex';

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

        <h1 className='text-center text-3xl mt-6 font-bold text-gray-700'>
          Welcome to TODO dApp!
        </h1>

        <div className='flex justify-center pt-6'>
          <ConnectButton />
        </div>

        <div className='flex grow justify-center'>
          {isConnected && <TodoIndex />}
        </div>

      </main>
    </div>
  );
};

export default Home;
