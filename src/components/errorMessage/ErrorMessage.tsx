import Image from 'next/image';
import errorImg from '../errorMessage/error.gif';

const ErrorMessage = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Image
        src={errorImg}
        alt="Error"
        width={250}
        height={250}
        objectFit="contain"
      />
    </div>
  );
};

export default ErrorMessage;
