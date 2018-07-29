import React, { Component } from "react";
import d3 from "d3";
import { Xaxis, Yaxis, Xgrid, Ygrid, Legend, Title } from "react-d3-core";
import { BarStackHorizontal, Chart, BarStack } from "react-d3-shape";
import "./styles.styl";

/*
Bar Stack Chart
*/
export default class DSRBarStack extends Component {
  //Roll up the different statuses into stacks
  rollUpByStatus(d, obj, field, aggregate) {
    obj[field] = d3.sum(d, function(e) {
      if (e.status === field) {
        return e[aggregate];
      }
      return 0;
    });
    return obj;
  }
  //Roll up the different territories into stacks
  rollUpByTerritory(d, obj, field, aggregate) {
    obj[field.name] = d3.sum(d, function(e) {
      if (e.territory === field.id) {
        return e[aggregate];
      }
      return 0;
    });
    return obj;
  }
  //groupBy is the x axis
  //aggregate is the y axis
  //fields are the different stacks
  aggregateOn(groupBy, aggregate, fields) {
    const { timeScale } = this.props;
    return d3
      .nest()
      .key(d => d[groupBy])
      .sortKeys(d3.ascending)
      .rollup(d => {
        return fields.reduce((obj, field) => {
          if (groupBy === "status") {
            this.rollUpByTerritory(d, obj, field, aggregate);
          } else {
            this.rollUpByStatus(d, obj, field, aggregate);
          }
          return obj;
        }, {});
      })
      .entries(this.props.data)
      .map(function(d) {
        return { date_start: d.key, ...d.values };
      })
      .sort((a, b) => {
        if (groupBy === "status") {
          return d3.ascending(
            fields.reduce((sum, field) => sum + a[field.name], 0),
            fields.reduce((sum, field) => sum + b[field.name], 0)
          );
        } else {
          return d3.ascending(
            fields.reduce((sum, field) => sum + a[field], 0),
            fields.reduce((sum, field) => sum + b[field], 0)
          );
        }
      });
  }
  render() {
    const {
      aggregate,
      fields,
      groupBy,
      data,
      timeScale,
      selectedCountries,
      width,
      height,
      title,
      xLabel,
      yLabel
    } = this.props;
    let newData = this.aggregateOn(groupBy, aggregate, fields);

    const xScale = "ordinal";

    let statusChartSeries = [
      {
        field: "failed",
        name: "Failed Sale",
        color: "#4e545e"
      },
      {
        field: "upcoming",
        name: "Upcoming Sale",
        color: "#d1c042"
      },
      {
        field: "completed",
        name: "Completed Sale",
        color: "#65bf66"
      }
    ];

    function getRandomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    let territoryChartSeries = selectedCountries.map((c, i) => ({
      field: c.name,
      name: c.name,
      color: getRandomColor()
    }));

    const x = function(d) {
      return d;
    };

    const y = function(d) {
      return d.date_start;
    };

    if (data) {
      let territoryName = function(d, selectedCountries) {
        let s = selectedCountries.find(x => parseInt(d) === x.id);
        return s ? s.name : ";";
      };

      let statusName = d => d;

      return (
        <div class="single-chart">
          <Title title={title} />
          <Legend
            chartSeries={
              groupBy === "status" ? territoryChartSeries : statusChartSeries
            }
            width={width / 2}
            categoricalColors={d3.scale.category20c()}
            legendClassName={"legend-container"}
          />
          <Chart
            x={x}
            y={y}
            width={width / 2}
            height={height / 2}
            data={newData}
            chartSeries={
              groupBy === "status" ? territoryChartSeries : statusChartSeries
            }
            yScale={xScale}
            xScale={"linear"}
            yLabel={yLabel}
            xLabel={xLabel}
            stack={true}
            horizontal={true}
            yTickFormat={d =>
              groupBy === "territory"
                ? territoryName(d, selectedCountries)
                : statusName(d)
            }
            xTickFormat={d => d / 1000000 + "M"}
          >
            <BarStackHorizontal
              chartSeries={
                groupBy === "status" ? territoryChartSeries : statusChartSeries
              }
            />
            <Xgrid />
            <Ygrid />
            <Xaxis />
            <Yaxis />
          </Chart>
        </div>
      );
    }
    return <div>loading data....</div>;
  }
}
