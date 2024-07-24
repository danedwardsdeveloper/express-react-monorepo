import { useState, useEffect } from 'react';

function ApiMessage() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/api')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setMessage(data.message);
        setError(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setError(true);
      });
  }, []);

  if (error) {
    return <div>Error making http request</div>;
  }

  return (
    <div>
      {message ? <p>{message}</p> : <p>Loading...</p>}
    </div>
  );
}

export default ApiMessage;