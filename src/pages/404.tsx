import ErrorMessage from '../components/errorMessage/ErrorMessage';
import Link from 'next/link';

const Page404: React.FC = () => {
  return (
    <div>
      <ErrorMessage />
      <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>
        Page doesn't exist
      </p>
      <Link
        style={{
          display: 'block',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '24px',
          marginTop: '30px',
        }}
        href="/?page=1"
      >
        Back to main page
      </Link>
    </div>
  );
};

export default Page404;
