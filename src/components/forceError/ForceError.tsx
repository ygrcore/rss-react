import { useState } from 'react';

import styles from './ForceError.module.css';

const ForceError = () => {
  const [isError, setIsError] = useState<boolean>(false);

  const onClick = () => {
    setIsError(true);
  };

  if (isError) {
    throw new Error('Error boundary test');
  }

  return (
    <div className={styles.error}>
      <button className={styles.error__button} type="button" onClick={onClick}>
        Throw an error
      </button>
    </div>
  );
};

export default ForceError;
