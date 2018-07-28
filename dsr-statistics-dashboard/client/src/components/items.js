import React from "react";
import "./styles.styl";
import { SVG } from "../svgs";
export const Checkbox = props => {
  var checkmark = (
    <SVG name={"Checkmark"} fill="black" width="18" height="18" />
  );

  var blank = (
    <SVG name={"Checkmark"} fill="transparent" width="18" height="18" />
  );
  return (
    <div class="checkbox-item">
      <div class="checkbox" onMouseDown={() => props.onMouseDown()}>
        <input type="checkbox" />
        {props.boolean ? checkmark : blank}
      </div>
      <label>{props.label}</label>
    </div>
  );
};
