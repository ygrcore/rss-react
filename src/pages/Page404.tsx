import ErrorMessage from '../components/errorMessage/ErrorMessage';
// import { Link } from 'react-router-dom';
import Link from 'next/link';

const Page404 = () => {
  return (
    <div>
      <ErrorMessage />
      <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>
        Page doesn&apos;t exist
      </p>
      <Link
        style={{
          display: 'block',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '24px',
          marginTop: '30px',
        }}
        href="/"
      >
        Back to main page
      </Link>
    </div>
  );
};

export default Page404;
