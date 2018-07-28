import React, { Component } from "react";
import "./styles.styl";
import { Checkbox } from "../items";
export default class MultiCheckboxes extends Component {
  render() {
    const {
      options,
      selectedStatuses,
      selectStatus,
      removeStatus
    } = this.props;

    return (
      <div class="multi-check">
        {options.map((status, i) => (
          <Checkbox
            key={"cb" + i}
            onMouseDown={() =>
              selectedStatuses.includes(status)
                ? removeStatus(status)
                : selectStatus(status)
            }
            label={status}
            boolean={selectedStatuses.includes(status)}
          />
        ))}
      </div>
    );
  }
}
