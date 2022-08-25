import { ConnectButton } from '@rainbow-me/rainbowkit';

export const Welcome = () => {
  return (
    <>
      <h1 className='text-center text-3xl mt-6 font-bold text-gray-700'>
        Welcome to TODO dApp!
      </h1>

      <div className='flex justify-center pt-6'>
        <ConnectButton />
      </div>
      <hr className='mt-5' />
    </>
  );
}