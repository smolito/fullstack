import { useState } from "react";
import CountryDetail from "./CountryDetail";

const Countries = ({ filteredCountries }) => {
  const [showDetail, setDetail] = useState(false);
  const [countrySnapshot, setSnapshot] = useState([]);
  const [filterLength, setFilterLength] = useState(0);


  const setInitialStates = () => {
    setDetail(false);
    setSnapshot([]);
    //console.log("initial states set");
  };

  const handleClick = (country) => {
    setFilterLength(filteredCountries.length);
    setSnapshot(country);
    setDetail(true);
  };

  if (showDetail) {
    //console.log(filterLength, "!==", filteredCountries.length, filterLength !== filteredCountries.length);

    if (filterLength !== filteredCountries.length) {
      setInitialStates();
    }
    return (
      <CountryDetail country={countrySnapshot} />
    );
  } else {
    if (filteredCountries.length === 1) {
      return <CountryDetail country={filteredCountries[0]} />;
    }

    if (filteredCountries.length > 10) {
      return <div>too many countries to show, please be more specific</div>;
    }

    if (filteredCountries.length < 11 && filteredCountries.length > 1) {
      return filteredCountries.map((c) => (
        <div key={c.name.common}>
          {c.name.common} <button onClick={() => handleClick(c)}>show</button>
        </div>
      ));
    }
  }
};

export default Countries;
