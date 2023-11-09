import { useState } from 'react';
import './ForceError.css';

const ForceError = () => {
  const [isError, setIsError] = useState<boolean>(false);

  const onClick = () => {
    setIsError(true);
  };

  if (isError) {
    throw new Error('Error boundary test');
  }

  return (
    <div className="error">
      <button className="error__button" type="button" onClick={onClick}>
        Throw an error
      </button>
    </div>
  );
};

export default ForceError;
