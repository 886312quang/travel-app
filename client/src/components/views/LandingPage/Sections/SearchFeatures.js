import React, { useState } from "react";
import { Input } from "antd";

const { Search } = Input;

function SearchFeatures(props) {
  const [searchItems, setSearchItems] = useState("");

  const onChangeSearch = (event) => {
    setSearchItems(event.currentTarget.value);
    props.refreshFunction(event.currentTarget.value);
  };

  return (
    <div>
      <Search
        value={searchItems}
        onChange={onChangeSearch}
        placeholder="Search By Typing..."
      />
    </div>
  );
}

export default SearchFeatures;
