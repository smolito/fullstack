
const Names = ({ persons, filtering, filterValue, handleRemove }) => {
  //console.log("filter is ", filtering, " filtering: ", filterValue);

  if (filtering) {
    const filterPeople = persons.filter((p) =>
      p.name.toLowerCase().includes(filterValue.toLowerCase())
    );
    return filterPeople.map((p) => (
      <div key={p.id}>
        {p.name}: {p.number}
      </div>
    ));
  } else {
    return persons.map((p) => (
      <div key={p.id}>
        {p.name}: {p.number} <button onClick={() => handleRemove(p)}>delete</button>
      </div>
    ));
  }
};

export default Names;
