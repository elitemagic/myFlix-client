import React, { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";

export const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClearClick = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <Form>
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
        />
        {query && (
          <Button variant="outline-secondary" onClick={handleClearClick}>
            Clear Search
          </Button>
        )}
      </InputGroup>
    </Form>
  );
};
