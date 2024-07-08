import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center text-[35px]'>
      <h1 className='font-bold'><span className='text-red-700'>404</span> | This page does not exist.</h1>
      <Link to="/" className='bg-acento text-black hover:bg-green-500 hover:text-black p-5 rounded mt-4'>
        Go Back
      </Link>
    </div>
  );
}

export default NotFound;
