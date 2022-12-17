
const Filter = ({ filterValue, onFilterChange }) => {
  //const filterByName = persons.filter();

  return (
    <div>
      Filter names: <input value={filterValue} onChange={onFilterChange}/>
    </div>
  );
};

export default Filter;
