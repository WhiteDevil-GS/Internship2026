import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [folders, setFolders] = useState([]);
  const [name, setName] = useState("");

  const fetchFolders = async () => {
    const res = await axios.get("http://localhost:5000/api/folders");
    setFolders(res.data);
  };

  const addFolder = async () => {
    if (!name) return;
    await axios.post("http://localhost:5000/api/folders", { name });
    setName("");
    fetchFolders();
  };

  const deleteFolder = async (id) => {
    await axios.delete(`http://localhost:5000/api/folders/${id}`);
    fetchFolders();
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📁 Folder Architect</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter folder name"
      />
      <button onClick={addFolder}>Add</button>

      <ul>
        {folders.map((f) => (
          <li key={f._id}>
            {f.name}
            <button onClick={() => deleteFolder(f._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;