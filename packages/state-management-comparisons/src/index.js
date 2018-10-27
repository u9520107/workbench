import { render } from "react-dom";
import React from "react";
import Stage from "./components/Stage";
import ReduxApp from "./containers/ReduxApp";
import MobXApp from "./containers/MobXApp";
import "normalize-css/normalize.css";
import "./styles.css";

const viewport = document.createElement("div");
viewport.setAttribute("id", "viewport");
document.body.append(viewport);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      virtual: true
    };
    this.onToggle = () => {
      this.setState(({ virtual }) => ({ virtual: !virtual }));
    };
  }
  render() {
    return (
      <Stage virtual={this.state.virtual} onToggle={this.onToggle}>
        <ReduxApp virtual={this.state.virtual} />
        <MobXApp virtual={this.state.virtual} />
      </Stage>
    );
  }
}

render(<App />, viewport);
