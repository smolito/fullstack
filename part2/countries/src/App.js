import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    //console.log('effect');
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      //console.log('promise fullfilled');
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    //console.log(event.target.value)
    setFilter(event.target.value);
  };

  const countryFilter = countries.filter((c) =>
    c.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <Filter filterValue={filter} onFilterChange={handleFilterChange} />
      <Countries filteredCountries={countryFilter} />
    </div>
  );
};

//console.log('render', countries.length, '')

export default App;
