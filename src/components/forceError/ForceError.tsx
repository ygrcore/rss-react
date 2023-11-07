const ForceError = () => {
  const forceError = async () => {
    try {
      localStorage.setItem('searchedPokes', 'error');
      throw new Error('This is a simulated error');
    } catch (err) {
      console.log('An error occurred');
      window.location.reload();
    }
  };

  const repairError = async () => {
    try {
      localStorage.setItem('searchedPokes', '');
      window.location.reload();
    } catch (err) {
      console.log('An error occurred after repair');
      window.location.reload();
    }
  };

  return (
    <div>
      <button onClick={repairError}>Repair Error</button>
      <button onClick={forceError}>Force Error</button>
    </div>
  );
};

export default ForceError;
