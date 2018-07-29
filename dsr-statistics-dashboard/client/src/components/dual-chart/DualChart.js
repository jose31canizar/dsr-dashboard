import React, { Component } from "react";
// import { parseDate } from "moment";
import d3 from "d3";
// import { Chart } from "react-d3-core";
import { Xaxis, Yaxis, Xgrid, Ygrid, Legend, Title } from "react-d3-core";
import { Line, Chart, Area, BarGroup } from "react-d3-shape";
import "./styles.styl";

/*
Top Two Charts with Selected Fields on the Left and Revenue on Right
*/
export default class DualChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
    this.aggregateOn = this.aggregateOn.bind(this);
    this.convertISODateToQuarterDate = this.convertISODateToQuarterDate.bind(
      this
    );
  }
  convertISODateToQuarterDate(isoDate) {
    let date = new Date(isoDate);
    //in real months
    var nm = 0;
    //0 - 11
    let newMonth = date.getMonth();
    if (newMonth <= 2) {
      nm = 1;
    } else if (newMonth <= 5) {
      nm = 4;
    } else if (newMonth <= 8) {
      nm = 7;
    } else {
      nm = 10;
    }

    let x = date.getFullYear() + "-" + ("0" + nm).slice(-2) + "-01";
    return x;
  }
  //fields are the selected fields in the filter
  aggregateOn(fields) {
    const { timeScale } = this.props;
    return d3
      .nest()
      .key(
        d =>
          timeScale === "quarter"
            ? this.convertISODateToQuarterDate(d.date_start)
            : d.date_start
      )
      .sortKeys(d3.ascending)
      .rollup(function(d) {
        return fields.reduce((obj, field) => {
          obj[field] = d3.sum(d, function(e) {
            return e[field];
          });
          return obj;
        }, {});
      })
      .entries(this.props.data)
      .map(function(d) {
        return { date_start: d.key, ...d.values };
      });
  }
  render() {
    const { selectedFields, data, timeScale, width, height } = this.props;
    let newData = this.aggregateOn(selectedFields);

    // const yTickFormat = d3.format(".2s")

    let NetRevenueChartSeries = [
      {
        field: "net_revenue",
        name: "Net Revenue",
        color: "black"
      }
    ];
    let title = "Free Units";

    let chartSeries = [
      {
        field: "release",
        name: "Release",
        color: "#69c242",
        style: {
          "stroke-width": 2,
          "stroke-opacity": 0.2,
          "fill-opacity": 0.2
        }
      },
      {
        field: "release_transactions",
        name: "Release Transactions",
        color: "#64bbe3"
      },
      {
        field: "resources",
        name: "Resources",
        color: "#ffcc00"
      }
    ];

    //linear
    // identity
    // sqrt
    // pow
    // log
    // quantize
    // quantile
    const xScale = "ordinal";

    const yScale = "time";

    const x = function(d) {
      return Date.parse(d.date_start);
    };

    var quarter = function(d) {
      var date2 = new Date();
      date2.setMonth(new Date(d).getMonth() + 1);
      let q = Math.ceil(date2.getMonth() / 3);
      return "Q" + q;
    };

    var month = d => monthName[new Date(d).getMonth()];

    var monthName = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    if (data) {
      return (
        <div class="dual-chart">
          <div class="single-chart">
            <Title title={"Units Over Time"} />
            <Legend
              width={width < 1150 ? width : width / 2}
              chartSeries={chartSeries}
              categoricalColors={d3.scale.category20c()}
              legendClassName={"legend-container"}
            />
            <Chart
              x={x}
              width={width < 1150 ? width : width / 2}
              height={height / 2}
              data={newData}
              chartSeries={chartSeries}
              xScale={xScale}
              yLabel={"Units"}
              xAxisStyling={{
                pathClassName: "x-axis-path",
                ticksClassName: "x-axis-ticks",
                textClassName: "x-axis-text"
              }}
              xLabel={"Time"}
              xTickFormat={d => (timeScale === "month" ? month(d) : quarter(d))}
            >
              <BarGroup chartSeries={chartSeries} />
              <Xgrid />
              <Ygrid />
              <Xaxis />
              <Yaxis />
            </Chart>
          </div>
          <div class="single-chart">
            <Title title={"Revenue Over Time"} />
            <Legend
              width={width < 1150 ? width : width / 2}
              chartSeries={NetRevenueChartSeries}
              categoricalColors={d3.scale.category20b()}
              legendClassName={"legend-container"}
            />

            <Chart
              x={x}
              width={width < 1150 ? width : width / 2}
              height={height / 2}
              data={newData}
              xScale={xScale}
              yLabel={"Revenue (€)"}
              xLabel={"Time"}
              xTickFormat={d => monthName[new Date(d).getMonth()]}
              chartSeries={NetRevenueChartSeries}
            >
              <Line chartSeries={NetRevenueChartSeries} />
              <Xaxis />
              <Xgrid />
              <Ygrid />
            </Chart>
          </div>
        </div>
      );
    }
    return <div>loading data...</div>;
  }
}
