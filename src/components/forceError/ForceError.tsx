import { Component } from 'react';

class ForceError extends Component {
  forceError = () => {
    try {
      localStorage.setItem('searchedPokes', 'error');
      throw new Error('This is a simulated error');
    } catch (err) {
      console.log('An error occurred');
      window.location.reload();
    }
  };

  repairError = () => {
    try {
      localStorage.setItem('searchedPokes', '');
      window.location.reload();
    } catch (err) {
      console.log('An error occurred after repair');
      window.location.reload();
    }
  };

  render() {
    return (
      <div>
        <button onClick={this.repairError}>Repair Error</button>
        <button onClick={this.forceError}>Force Error</button>
      </div>
    );
  }
}

export default ForceError;
