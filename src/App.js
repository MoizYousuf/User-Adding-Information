import React, { Component } from "react";
import "./firebase/firebase";
import Form from "./components/form";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Form />
      </div>
    );
  }
}

export default App;
