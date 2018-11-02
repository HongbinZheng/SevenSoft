import React, { Component } from "react";
import axios from "axios";
import Suggestions from "./suggestions";
import Fuse from "fuse.js";

class Search extends Component {
  state = {
    query: "",
    allItems: [],
    filtered: []
  };

  componentWillMount() {
    //let searchTerm = this.props.
    axios.get(`/api/allItems`).then(response => {
      console.log(response.data);
      const item = response.data;
      this.setState({ allItems: response.data });
      console.log(this.state);
    });
  }

  filterItems = () => {
    var options = {
      shouldSort: true,
      findAllMatches: true,
      threshold: 0.6,
      location: 0,
      distance: 50,
      maxPatternLength: 25,
      minMatchCharLength: 2,
      keys: ["name", "description"]
    };

    console.log(this.state.allItems);
    var fuse = new Fuse(this.state.allItems, options);
    console.log(fuse);
    console.log(fuse.search(this.state.query));
    this.setState({ filtered: fuse.search(this.state.query) });
    console.log(this.state.filtered);
  };

  handleInputChange = () => {
    this.setState(
      {
        query: this.search.value
      },
      () => {
        if (this.state.query && this.state.query.length > 1) {
          if (this.state.query.length % 2 === 0) {
            this.filterItems();
          }
        }
      }
    );
  };

  /*render() {
    var FuzzySearch = require("react-fuzzy-search");
    return (
      <FuzzySearch
        idField="itemNo"
        items={this.state.allItems}
        nameField="name"
        searchField="name"
      />
    );
  }*/

  render() {
    return (
      <form>
        <input
          placeholder="Search for..."
          ref={input => (this.search = input)}
          onChange={this.handleInputChange}
        />
        {this.state.query ? (
          <Suggestions suggests={this.state.filtered.slice(0, 4)} />
        ) : null}
      </form>
    );
  }
}

export default Search;
