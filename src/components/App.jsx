import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  // GET
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((r) => r.json())
      .then((data) => setToys(data))
      .catch((err) => console.error("Failed to fetch toys:", err));
  }, []);

  // POST
  function handleAddToy(newToy) {
    setToys((toys) => [...toys, newToy]);
  }

  // PATCH
  function handleUpdateToy(updatedToy) {
    setToys((toys) =>
      toys.map((toy) => (toy.id === updatedToy.id ? updatedToy : toy))
    );
  }

  // DELETE
  function handleDeleteToy(id) {
    setToys((toys) => toys.filter((toy) => toy.id !== id));
  }

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        onUpdateToy={handleUpdateToy}
        onDeleteToy={handleDeleteToy}
      />
    </>
  );
}

export default App;