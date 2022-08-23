import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useAccount } from 'wagmi';
import { TodoIndex } from '../components/TodoIndex';

const Home: NextPage = () => {
  const { isConnected } = useAccount();

  return (
    <div className={styles.container}>
      <Head>
        <title>Example TODO dApp</title>
        <meta
          name="description"
          content="An example TODO dApp built on Ethereum"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <h1 className={styles.title}>
          Welcome to TODO dApp!
        </h1>

        <ConnectButton />

        {isConnected && <TodoIndex />}

      </main>
    </div>
  );
};

export default Home;
