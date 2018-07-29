import React, { Component } from "react";
import { SVG } from "../../svgs";
import FilterMenu from "../filter-menu/FilterMenu";
import "./styles.styl";
import DualChart from "../dual-chart/DualChart";
import d3 from "d3";
import { Checkbox } from "../items";
import DSRBarStack from "../bar-stack/DSRBarStack";

const conversionTable = {
  "1": 1,
  "6": 1.12,
  "21": 0.135
};

/*
Home Screen
*/
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      originalData: null,
      data: null,
      selectedItems: [
        { name: "net_revenue", id: 5 },
        { name: "resources", id: 0 }
      ],
      selectedCountries: [],
      initialCountries: [],
      selectedStatuses: ["completed", "failed", "upcoming"],
      revenueDisplay: null,
      allCountries: null,
      DSR_COUNT: null,
      timeScale: "quarter",
      timeScaleValue: 100,
      currencies: null
    };
    this.selectItem = this.selectItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.updateStats = this.updateStats.bind(this);
    this.updateData = this.updateData.bind(this);
    this.update = this.update.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.setInitialCountries = this.setInitialCountries.bind(this);
  }
  updateDimensions() {
    const w = Math.max(document.body.clientWidth, window.innerWidth || 0);
    const h = Math.max(document.body.clientHeight, window.innerHeight || 0);
    this.setState({
      width: w,
      height: h
    });
  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", () => {
      this.updateDimensions();
    });
    fetch("http://127.0.0.1:8000/api/fulldsr/")
      .then(res => {
        return res.json();
      })
      .then(d => {
        let rows = Object.values(d.data);
        this.setState({ data: rows, originalData: rows });
        return rows;
      })
      .then(d => {
        fetch("http://127.0.0.1:8000/api/territories/")
          .then(res => {
            return res.json();
          })
          .then(d => {
            this.setState({ allCountries: Object.values(d.data) });
          })
          .then(d => {
            this.setInitialCountries();
            this.convertToEuros();
            this.update();
          });
      });
  }
  convertToEuros() {
    const { originalData } = this.state;
    let data = originalData.map((row, i) => ({
      ...row,
      net_revenue: this.convert(row.net_revenue, row.currency)
    }));

    this.setState({ data, originalData: data });
  }
  convert(num, currency) {
    let x = num * conversionTable[currency];
    return x;
  }
  //Find all the countries actually used in the data
  //left join on full DSR table and territories table
  setInitialCountries() {
    const { originalData, allCountries } = this.state;
    //find all used territories with duplicates
    let initialCountryIndicesWithRepeats = originalData.map(
      (item, i) => item.territory
    );
    //create a set
    let initialCountryIndices = [...new Set(initialCountryIndicesWithRepeats)];
    // for each country index, look up that countries name
    let initialCountries = initialCountryIndices.map((ind, i) => {
      let country = allCountries.find(x => x.id === ind);
      return { name: country.name, id: ind };
    });
    //initialCountries contains the index and the country name so that
    //filtering the data is possible
    //so dynamically updating stats and the graphs is possible
    this.setState({ selectedCountries: initialCountries, initialCountries });
  }
  //choosing a status on the filter menu
  selectStatus(field, status) {
    this.setState(
      (prevState, props) => ({
        [field]: prevState[field].includes(status)
          ? prevState[field]
          : [...prevState[field], status]
      }),
      () => this.update()
    );
  }
  //removing a status on the filter menu
  removeStatus(field, status) {
    this.setState(
      (prevState, props) => ({
        [field]: prevState[field].filter((item, i) => item !== status)
      }),
      () => this.update()
    );
  }
  //selecting either a country or field
  selectItem(field, option) {
    this.setState(
      (prevState, props) => ({
        [field]: prevState[field]
          .map((item, i) => item.name)
          .includes(option.name)
          ? prevState[field]
          : [...prevState[field], option]
      }),
      () => this.update()
    );
  }
  //removing either a country or field
  removeItem(field, index) {
    this.setState(
      (prevState, props) => ({
        [field]: prevState[field].filter((item, i) => i !== index)
      }),
      () => this.update()
    );
  }
  update() {
    this.updateStats();
    this.updateData();
  }
  //based on selected countries in the filter menu, calculate the stats
  updateStats() {
    const { originalData, selectedCountries } = this.state;
    let countryIndices = new Set(selectedCountries.map((item, i) => item.id));

    let filteredData = originalData.filter((dsr, i) =>
      countryIndices.has(dsr.territory)
    );

    let revenue = filteredData.reduce((acc, dsr) => dsr.net_revenue + acc, 0);

    let DSR_COUNT = filteredData.length;
    this.setState({ revenueDisplay: revenue.toFixed(0), DSR_COUNT });
  }
  //based on selected countries in the filter menu, update the data, keep the original
  updateData() {
    const { originalData, selectedCountries, selectedStatuses } = this.state;
    let countryIndices = new Set(selectedCountries.map((item, i) => item.id));
    let newData = originalData
      .filter((dsr, i) => countryIndices.has(dsr.territory))
      .filter((dsr, i) => selectedStatuses.includes(dsr.status));
    this.setState({ data: newData });
  }
  handleChange(e) {
    let v = e.target.value;
    if (v < 50) {
      this.setState({ timeScaleValue: e.target.value, timeScale: "month" });
    } else {
      this.setState({ timeScaleValue: e.target.value, timeScale: "quarter" });
    }
  }
  render() {
    const {
      data,
      selectedItems,
      selectedCountries,
      initialCountries,
      selectedStatuses,
      revenueDisplay,
      revenue,
      allCountries,
      DSR_COUNT,
      timeScale,
      timeScaleValue,
      width,
      height
    } = this.state;

    if (this.state.data && this.state.allCountries) {
      return (
        <div class="home">
          <p>DSR Statistics Dashboard</p>
          <FilterMenu
            allCountries={allCountries}
            initialCountries={initialCountries}
            selectedStatuses={selectedStatuses}
            selectStatus={status =>
              this.selectStatus("selectedStatuses", status)
            }
            removeStatus={status =>
              this.removeStatus("selectedStatuses", status)
            }
            selectItem={option => this.selectItem("selectedItems", option)}
            removeItem={index => this.removeItem("selectedItems", index)}
            selectCountry={option =>
              this.selectItem("selectedCountries", option)
            }
            removeCountry={index => this.removeItem("selectedCountries", index)}
            selectedItems={selectedItems}
            selectedCountries={selectedCountries}
          />
          <div class="slider">
            <input
              type="range"
              min="1"
              max="100"
              value={timeScaleValue}
              onChange={this.handleChange}
              class="time-scale-slider"
            />
            <div class="time-scale-text">
              <div>month</div>
              <div>quarter</div>
            </div>
          </div>
          <div class="stats">
            <div class="statistic">
              <h1>{DSR_COUNT}</h1>
              <h3>digital sales</h3>
            </div>
            <div class="statistic">
              <h1>€{revenueDisplay}</h1>
              <h3>net revenue</h3>
            </div>
          </div>
          <DualChart
            data={data}
            width={width}
            height={height}
            timeScale={timeScale}
            selectedFields={selectedItems.map((item, i) => item.name)}
          />
          <div style={{ display: "block" }}>
            <div style={{ display: "flex" }}>
              <DSRBarStack
                title={"Sales by Territory and Status"}
                aggregate="count_sales"
                fields={["failed", "upcoming", "completed"]}
                groupBy="territory"
                xLabel={"Sales Count"}
                yLabel={"Territory"}
                data={data}
                width={width}
                height={height}
                selectedCountries={selectedCountries}
                timeScale={timeScale}
                selectedFields={selectedItems.map((item, i) => item.name)}
              />
              <DSRBarStack
                title={"Sales by Status and Territory"}
                aggregate="count_sales"
                fields={selectedCountries}
                groupBy="status"
                xLabel={"Sales Count"}
                yLabel={"Status"}
                data={data}
                width={width}
                height={height}
                selectedCountries={selectedCountries}
                timeScale={timeScale}
                selectedFields={selectedItems.map((item, i) => item.name)}
              />
            </div>
            <div style={{ display: "flex" }}>
              <DSRBarStack
                title={"Revenue by Territory and Status"}
                aggregate="net_revenue"
                fields={["failed", "upcoming", "completed"]}
                groupBy="territory"
                xLabel={"Revenue (€)"}
                yLabel={"Territory"}
                data={data}
                width={width}
                height={height}
                selectedCountries={selectedCountries}
                timeScale={timeScale}
                selectedFields={selectedItems.map((item, i) => item.name)}
              />
              <DSRBarStack
                title={"Revenue by Status and Territory"}
                aggregate="net_revenue"
                fields={selectedCountries}
                groupBy="status"
                xLabel={"Revenue (€)"}
                yLabel={"Status"}
                data={data}
                width={width}
                height={height}
                selectedCountries={selectedCountries}
                timeScale={timeScale}
                selectedFields={selectedItems.map((item, i) => item.name)}
              />
            </div>
          </div>
          <p>Jose Canizares</p>
        </div>
      );
    } else {
      return <div>loading data...</div>;
    }
  }
}
