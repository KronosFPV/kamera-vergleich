import { useState } from 'react';

export default function Home() {
  const [camera1, setCamera1] = useState('');
  const [camera2, setCamera2] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = async () => {
    const res = await fetch(`/api/compare?camera1=${encodeURIComponent(camera1)}&camera2=${encodeURIComponent(camera2)}`);
    const data = await res.json();
    setResult(data);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Kamera Vergleich</h1>
      <input
        placeholder="Cam 1"
        value={camera1}
        onChange={(e) => setCamera1(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <input
        placeholder="Cam 2"
        value={camera2}
        onChange={(e) => setCamera2(e.target.value)}
      />
      <button onClick={handleSearch} style={{ marginLeft: '10px' }}>
        Los, zeig was besser ist!
      </button>
      {result && (
        <div style={{ marginTop: '20px' }}>
          <h2>Vergleichsergebnisse</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
