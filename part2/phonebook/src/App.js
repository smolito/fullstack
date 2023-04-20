import { useState, useEffect } from "react";
import personsService from "./services/persons"
import Names from "./components/Names";
import Form from "./components/Form";
import Filter from "./components/Filter";
import NotificationSucces from "./components/NotificationSuccess";
import NotificationError from "./components/NotificationError";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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

    if (nameExists.length > 0) {
      //alert(`${newName} is already added to phonebook`);
      if (window.confirm(`${newName} is already added to the phonebook. Do you want to replace the old number with a new one?`)){
        const newNameObject = {
          name: newName,
          number: newNumber,
        };
        personsService
        .update(nameExists[0].id,newNameObject)
        .then((updatedPerson) => {
          setNotificationMessage(`'${updatedPerson.name}' has been updated in your phonebook.`)
          setTimeout(() => {
            setNotificationMessage(null)
            }, 5000)
        })
        .catch((error) => {
          setErrorMessage(`${newName} has already been removed from the server.`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 6000)
        })
        setNewName("");
      }
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      };
      personsService.create(nameObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setNotificationMessage(`${returnedPerson.name} has been added to the phonebook.`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 3000)
      })
      
      setNewName("");
      setNewNumber("");
    }
  };

  const handleClickRemove = (person) => {
    if (window.confirm(`do you want to remove ${person.name}?`))
    personsService.remove(person.id);
    //console.log("person from handleClickRemove in App.js " + person);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <NotificationSucces message={notificationMessage}/>
      <NotificationError message={errorMessage}/>
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
      <Names persons={persons} filterValue={filter} filtering={showFilter} handleRemove={handleClickRemove}/>
    </div>
  );
};

export default App;
