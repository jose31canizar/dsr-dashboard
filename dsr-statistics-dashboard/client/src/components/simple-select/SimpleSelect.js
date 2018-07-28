import React, { Component } from "react";
import "./styles.styl";
import { SVG } from "../../svgs";
import BrowserDetection from "react-browser-detection";
export default class SimpleSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedItem: null,
      text: ""
    };
    this.dropdownHandler = this.dropdownHandler.bind(this);
  }
  componentDidMount() {
    window.addEventListener("onmousedown", this.dropdownHandler);
  }
  componentWillMount() {
    window.removeEventListener("onmousedown", this.dropdownHandler);
  }
  dropdownHandler() {
    this.setState((prevState, props) => ({ open: !prevState.open }));
  }
  optionSelect(option) {
    this.setState({ selectedItem: option, open: false, text: option });
  }
  render() {
    const { options } = this.props;
    return (
      <div class="simple-select soft">
        <div class="simple-select-button">
          <input
            placeholder={this.props.placeholder}
            onFocus={this.dropdownHandler}
            value={this.state.text}
            onChange={event => this.setState({ text: event.target.value })}
          />

          <SVG
            onMouseDown={this.dropdownHandler}
            name="DropDownTick"
            fill="#8a7b7b"
            width="12"
            height="12"
            viewBox="0 0 12 6"
            style={{
              position: "absolute",
              right: 5,
              cursor: "pointer",
              transition: "0.15s transform ease-in-out",
              transform: `rotate3d(0,0,1,${this.state.open ? 180 : 0}deg)`
            }}
          />
        </div>
        {this.state.open ? (
          <div class="simple-select-list">
            {options
              .filter(item =>
                item.toLowerCase().includes(this.state.text.toLowerCase())
              )
              .map(option => (
                <label onMouseDown={() => this.optionSelect(option)}>
                  {option}
                </label>
              ))}
          </div>
        ) : null}
      </div>
    );
  }
}
