const Filter = ({filterValue, onFilterChange}) => {
    return(
        <div>
            find country: <input
            value={filterValue}
            onChange={onFilterChange}></input>
        </div>
    )
}

export default Filter