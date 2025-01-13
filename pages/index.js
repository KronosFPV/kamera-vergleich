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
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        color: '#f5f5f5',
        minHeight: '100vh',
        backgroundImage: 'url(/Medien.jpg)',
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 200px',
        opacity: 0.7,
      }}
    >
      <h1 style={{ textAlign: 'center', color: '#ffffff', padding: '20px' }}>Kamera Vergleich</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Cam 1"
          value={camera1}
          onChange={(e) => setCamera1(e.target.value)}
          style={{
            padding: '10px',
            width: '200px',
            border: '1px solid #444',
            borderRadius: '5px',
            backgroundColor: '#1e1e1e',
            color: '#f5f5f5',
          }}
        />
        <input
          type="text"
          placeholder="Cam 2"
          value={camera2}
          onChange={(e) => setCamera2(e.target.value)}
          style={{
            padding: '10px',
            width: '200px',
            border: '1px solid #444',
            borderRadius: '5px',
            backgroundColor: '#1e1e1e',
            color: '#f5f5f5',
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Los, zeig was besser ist!
        </button>
      </div>

      {result && (
        <div style={{ marginTop: '20px', backgroundColor: '#121212', borderRadius: '10px', padding: '20px' }}>
          <h2 style={{ textAlign: 'center', color: '#ffffff' }}>Vergleichsergebnisse</h2>
          <table style={{ width: '100%', color: '#f5f5f5', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '10px', borderBottom: '1px solid #444' }}></th>
                <th style={{ textAlign: 'center', padding: '10px', borderBottom: '1px solid #444' }}>{result.camera1.name}</th>
                <th style={{ textAlign: 'center', padding: '10px', borderBottom: '1px solid #444' }}>{result.camera2.name}</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(result.camera1.specs).map((key) => (
                <tr key={key}>
                  <td style={{ padding: '10px', borderBottom: '1px solid #444', color: '#aaaaaa' }}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #444', textAlign: 'center' }}>
                    {result.camera1.specs[key]}
                  </td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #444', textAlign: 'center' }}>
                    {result.camera2.specs[key]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
