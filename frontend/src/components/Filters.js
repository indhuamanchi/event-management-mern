import React from "react";

const Filters = () => {
    return (
        <div>
            <label>Filter by Genre:</label>
            <select>
                <option>All</option>
                <option>Music</option>
                <option>Comedy</option>
                <option>Sports</option>
            </select>
        </div>
    );
};

export default Filters;
