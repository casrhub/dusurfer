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
  const [isLoading, setIsLoading] = useState(false);

  async function scan() {
    setIsLoading(true);


    await new Promise(resolve => setTimeout(resolve, 50));

    try{
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
    } catch (error) {
      console.log("Scan failed:", error);
    } finally {
      setIsLoading(false);
    }
}
   
   
    

  

  return (
    <main className="container">
    <h1>duSurfer</h1>
    <button onClick={scan} disabled={isLoading} className="scan-button">
      {isLoading ? "Scanning..." : "Scan Home Directory"}
    </button>
    {isLoading && <p>Calculating folder sizes...</p>}
    
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
