import { useState, useEffect } from "react";
import personsService from "./services/persons"
import Names from "./components/Names";
import Form from "./components/Form";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const showFilter = filter.length > 0;

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    })
  }, []);

  //console.log("render", persons.length, "");

  const handleFilterChange = (event) => {
    //console.log(event.target.value)
    setFilter(event.target.value);
  };

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value);
  };

  const addName = (event) => {
    event.preventDefault();

    const nameExists = persons.filter((p) => p.name === newName);
    //console.log(nameExists.length);

    if (nameExists.length > 0) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      };
      personsService.create(nameObject)
      .then((returnedPerson) => setPersons(persons.concat(returnedPerson)))
      
      setNewName("");
      setNewNumber("");
    }
  };

  const handleClickRemove = (person) => {
    if (window.confirm(`do you want to remove ${person.name}?`))
    personsService.remove(person.id);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        persons={persons}
        filterValue={filter}
        onFilterChange={handleFilterChange}
      />
      <h3>Add a new person</h3>
      <Form
        nameValue={newName}
        numberValue={newNumber}
        onSubmit={addName}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Names persons={persons} filterValue={filter} filtering={showFilter} handleRemove={() => handleClickRemove()}/>
    </div>
  );
};

export default App;
