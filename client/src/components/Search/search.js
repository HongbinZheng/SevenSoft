import React, { Component } from "react";
import axios from "axios";
import Suggestions from "./suggestions";
import Fuse from "fuse.js";
import { Redirect } from "react-router-dom";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      redirect: false,
      allItems: [],
      filtered: []
    };
    //this.handleChange = this.handleChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  componentWillMount() {
    axios.get(`/api/allItems`).then(response => {
      const item = response.data;
      this.setState({ allItems: response.data });
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
      keys: ["name"]
    };

    var fuse = new Fuse(this.state.allItems, options);
    this.setState({ filtered: fuse.search(this.state.query) });
  };

  setRedirect = () => {
    this.setState({ redirect: true });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/searchResult" />;
    }
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

  keyPress(e) {
    if (e.keyCode == 13) {
      this.context.router.push({
        pathname: "/searchResult",
        state: { filtered: this.state.filtered }
      });
    }
  }

  handleSubmit(e) {
    //localStorage.setItem("items", JSON.stringify(this.state.filtered));
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem("items", JSON.stringify(nextState.filtered));
  }

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
      <div>
      <div className="input-group mb-3">
        <input
          onKeyDown={this.keyPress}
          placeholder="Search for..."
          ref={input => (this.search = input)}
          onChange={this.handleInputChange}
        />
        {this.renderRedirect()}
        <div className="input-group-append">
        <button className="btn btn-outline-success" type='button' style={{position: "relative"}} onClick={this.setRedirect}><i class="fas fa-search"></i></button>
        </div>
        </div>
        {this.state.query ? (
          <div>
            <Suggestions suggests={this.state.filtered.slice(0, 4)} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default Search;
