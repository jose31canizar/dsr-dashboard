import React, { Component } from "react";
import "./styles.styl";
import { SVG } from "../../svgs";
export default class MultiSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      text: "",
      height: 50
    };
    this.dropdownHandler = this.dropdownHandler.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.updateDropDownHeight = this.updateDropDownHeight.bind(this);
  }
  componentDidMount() {
    const { type } = this.props;
    window.addEventListener("onmousedown", this.dropdownHandler);

    window.addEventListener("resize", () => {
      this.updateDropDownHeight();
    });

    window.addEventListener("click", e => {
      this.setState({ open: false });
    });

    document
      .querySelector(`div#${type}-select-list.multi-select.soft`)
      .addEventListener("click", e => {
        e.stopPropagation();
      });
  }
  updateDropDownHeight() {
    const { type } = this.props;
    let style = window.getComputedStyle(
      document.querySelector(`div#${type}-select-list.multi-select.soft`)
    );
    this.setState({
      height: style.height
    });
  }
  componentWillMount() {
    window.removeEventListener("onmousedown", this.dropdownHandler);
  }
  dropdownHandler() {
    this.setState((prevState, props) => ({ open: !prevState.open }));
  }
  selectItem(option) {
    this.setState({
      open: false,
      text: ""
    });
    this.props.selectItem(option);
  }
  removeItem(index) {
    this.setState({
      open: false,
      text: ""
    });
    this.props.removeItem(index);
  }
  render() {
    const { options, selectedItems, type } = this.props;

    const { height } = this.state;

    return (
      <div class="multi-select soft" id={type + "-select-list"}>
        <div class="multi-select-button" id="second">
          <div class="selected-items">
            {selectedItems.map((item, i) => (
              <div class="selected-item" key={"si" + i}>
                <div
                  class="delete-item-button"
                  onMouseDown={() => this.removeItem(i)}
                >
                  x
                </div>
                {item.name}
              </div>
            ))}
          </div>
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
          <div
            class="multi-select-list"
            style={{
              top: height
            }}
          >
            {options
              .filter(item =>
                item.name.toLowerCase().includes(this.state.text.toLowerCase())
              )
              .map((option, i) => (
                <label
                  key={"msl" + i}
                  onMouseDown={() => this.selectItem(option)}
                >
                  {option.name}
                </label>
              ))}
          </div>
        ) : null}
      </div>
    );
  }
}
