import React from "react";
import SearchBox from "./searchBox";
import { navigate } from "@reach/router";

class SearchParams extends React.Component {
  handleSearchFormSubmit(event) {
    event.preventDefault();
    navigate("/");
  }

  render() {
    return (
      <div className="search-route">
        <SearchBox onSearch={this.handleSearchFormSubmit} />
      </div>
    );
  }
}

export default SearchParams;
