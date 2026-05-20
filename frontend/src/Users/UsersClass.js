import React, { Component } from "react";
import axios from "axios/unsafe/axios.js";

export default class Users extends Component {
  constructor() {
    super();
    this.state = {
      name: "Rishabh",
    };
  }

  updateName(e) {
    console.log(e.target);
    const { value } = e.target;
    console.log(value);
    this.setState({ name: value });
  }

  componentWillMount() {
    console.log("ComponentWillMount");
    const usersList = axios("https://jsonplaceholder.typicode.com/users");
    console.log(usersList);
    usersList
      .then((data) => {
        //Promise is Resolved
        console.log("Promise Resolved.", data.data);
      })
      .catch((err) => {
        console.log("catch block");

        console.log(err);
      });
  }
  componentDidMount() {
    console.log("ComponentDidMount");
    document.title = "Class Component";
  }

  render() {
    console.log("render", this.state);

    return (
      <>
        <input
          type="text"
          placeholder="Enter name"
          onChange={(e) => this.updateName(e)}
        />
        <div>Hello {this.state.name}</div>
        <button onClick={() => alert(`Hello ${this.state.name}`)}>
          Show Greeting
        </button>
      </>
    );
  }

  shouldComponentUpdate() {
    return true;
  }

  componentWillUpdate() {}
  componentDidUpdate() {}

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }
}
