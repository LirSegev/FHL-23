import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

interface ISong {
  id: number;
  name: string;
}

const url = '/api/generatePlaylist'
function App() {
  const [songs, setSongs] = useState<ISong[]>([])
  useEffect(() => {
    fetch(url).then((res) => res.json()).then(setSongs);
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const songName = data.get('songName') as string;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: songName })
    }).then((res) => res.json()).then((res) => {
      setSongs(res);
    });
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Add a song" name="songName" />
        <input type="submit" id="submitbtn"  />
      </form>
      <ul>
        {songs.map((song) => (<li key={song.name}>{song.name}</li>))}
      </ul>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
