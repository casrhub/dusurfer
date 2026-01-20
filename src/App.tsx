import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

interface DirEntry {
  size: string;
  name: string;
  path: string;
}

function App() {
  const [entries, setEntries] = useState<DirEntry[]>([]);

  async function scan() {
    const result = await invoke("scan_directory", {});


    const lines = (result as string).trim().split("\n")
    const parsed = lines
    .filter(line => line.trim())
    .map(line => {
      const parts = line.trim().split((/\s+/));
      const size = parts[0];
      const path = parts.slice(1).join(" ")
      const name = path.split("/").pop() || path;
      return { size, name, path };
    });
    setEntries(parsed);
  }

  

  return (
    <main className="container">
    <h1>duSurfer</h1>
    <button className="scan-button">Scan Home Directory</button>
    
    <ul className="dir-list">
      {entries.map((entry, i) => (
        <li key={i} className="dir-item">
          <span> {entry.name}</span>
          <span className="dir-size">{entry.size}</span>
        </li>
      ))}
    </ul>
  </main>
  );
}

export default App;
