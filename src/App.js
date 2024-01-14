import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [peopleInSpace, setPeopleInSpace] = useState([]);
  const [numberOfPeople, setNumberOfPeople] = useState([0]);
  const [filterCraft, setFilterCraft] = useState("All");

  useEffect(() => {
    async function startFetching() {
      const response = await fetch("http://api.open-notify.org/astros.json");
      const data = await response.json();
      setPeopleInSpace(data.people);
      setNumberOfPeople(data.number);
    }
    startFetching();
  }, []);

  const filteredPeople =
    filterCraft === "All"
      ? peopleInSpace
      : peopleInSpace.filter(
          (personInSpace) => personInSpace.craft === filterCraft
        );

  return (
    <div className="App">
      <span>Currently {numberOfPeople} people are in Space</span>
      <br></br>
      <span className="button-description">
        Click on the buttons below, to see on wich craft the poeple are{" "}
      </span>
      <br></br>
      <button type="button" onClick={() => setFilterCraft("All")}>
        All
      </button>
      <button type="button" onClick={() => setFilterCraft("ISS")}>
        ISS
      </button>
      <button type="button" onClick={() => setFilterCraft("Tiangong")}>
        Tiangong
      </button>
      {filteredPeople.length > 0 && (
        <ul>
          Name of People in Space on {filterCraft}
          {peopleInSpace.map((personInSpace) => (
            <li key={personInSpace.name}>{personInSpace.name}</li>
          ))}
        </ul>
      )}
      <br></br>
      {filteredPeople.length === 0 && <span>Nobody's on {filterCraft}</span>}
    </div>
  );
}

export default App;
