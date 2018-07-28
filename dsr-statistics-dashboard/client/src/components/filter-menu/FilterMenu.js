import React, { Component } from "react";
import "./styles.styl";
import SimpleSelect from "../simple-select/SimpleSelect";
import MultiSelect from "../multi-select/MultiSelect";
import MultiCheck from "../multi-checkboxes/MultiCheck";
import { Checkbox } from "../items";
export default class FilterMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAllCountries: false,
      countryOptions: null,
      show: true
    };
    this.toggleCountryOptions = this.toggleCountryOptions.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
  }
  componentDidMount() {
    this.setState({
      countryOptions: this.props.allCountries.map(({ name, id }, i) => ({
        name,
        id
      }))
    });
  }
  toggleCountryOptions() {
    const { initialCountries, allCountries } = this.props;
    const { showAllCountries } = this.state;
    this.setState((prevState, props) => ({
      showAllCountries: !prevState.showAllCountries,
      countryOptions: showAllCountries
        ? allCountries.map(({ name, id }, i) => ({
            name,
            id
          }))
        : initialCountries
    }));
  }
  toggleFilter() {
    this.setState((prevState, props) => ({ show: !prevState.show }));
  }
  render() {
    const {
      selectedItems,
      selectedCountries,
      initialCountries,
      selectedStatuses,
      selectStatus,
      selectItem,
      removeItem,
      allCountries,
      removeStatus
    } = this.props;

    const { showAllCountries, countryOptions, show } = this.state;

    if (allCountries) {
      return (
        <div class="filter-menu" style={{ width: show ? "100%" : "auto" }}>
          <p class="toggle-filter" onMouseDown={() => this.toggleFilter()}>
            toggle filter
          </p>
          <div
            style={{
              display: show ? "flex" : "none"
            }}
          >
            <div style={{ width: "100%", marginRight: "5px" }}>
              <MultiSelect
                type="countries"
                placeholder="select countries"
                selectItem={option => this.props.selectCountry(option)}
                removeItem={index => this.props.removeCountry(index)}
                options={countryOptions}
                selectedItems={selectedCountries}
              />
              <Checkbox
                label={"show only used countries as options"}
                onMouseDown={() => this.toggleCountryOptions()}
                boolean={showAllCountries}
              />
            </div>
            <MultiSelect
              type="fields"
              placeholder="select fields"
              selectItem={option => this.props.selectItem(option)}
              removeItem={index => this.props.removeItem(index)}
              selectedItems={selectedItems}
              options={[
                "resources",
                "release",
                "release_transactions",
                "count_sales",
                "free_units",
                "net_revenue"
              ].map((item, i) => ({ name: item, id: i }))}
            />
            <MultiCheck
              options={["completed", "failed", "upcoming"]}
              selectedStatuses={selectedStatuses}
              selectStatus={selectStatus}
              removeStatus={removeStatus}
            />
          </div>
        </div>
      );
    }
    return <div>loading data...</div>;
  }
}
