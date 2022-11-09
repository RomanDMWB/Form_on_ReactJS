import classes from "./grid.module.css";
import React from "react";
import record from "../data/info.json";

let isStyling = false;

function GridContent(items, className) {
  let count = 1;
  let tableHeader = [
    <div>
      <p>ID</p>
    </div>,
  ];
  let filedsInputs = [
    <div>
      <p>{count++}</p>
    </div>,
  ];

  items.forEach((item) => {
    tableHeader.push(
      <div>
        <p>{item.title}</p>
      </div>
    );

    filedsInputs.push(
      <div>
        <input type={item.type} name={item.title} code={item.code} />
      </div>
    );
  });
  if (!isStyling) {
    const styles = `.${classes.gridInfo}{grid-template-columns:2em repeat(${
      items.length
    },1fr);grid-template-rows: repeat(${
      record.grid.length ? record.grid.length + 1 : count
    }, 1em) 1fr;}.${classes.gridInfo}>div:nth-child(-n+${
      items.length + 1
    }){background-color:rgb(205, 230, 255);}#${
      classes.gridEnd
    }{grid-column-end: ${items.length + 2};}`;

    var styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    isStyling = true;
  }

  return React.createElement(Grid, {
    tableHeader,
    filedsInputs,
    className,
    items,
  });
}

class Grid extends React.Component {
  state = {
    filedsInputs: [],
  };

  componentDidMount() {
    if (record.grid.length === 0) return;
    const fields = [];
    let count = 1;
    record.grid.forEach((rec, i) => {
      fields.push(
        <div>
          <p>{count++}</p>
        </div>
      );
      this.props.items.forEach((item, i) => {
        fields.push(
          <div>
            <input
              type={item.type}
              name={item.title}
              code={item.code}
              defaultValue={rec[item.code]}
            />
          </div>
        );
      });
    });
    this.setState({
      filedsInputs: fields,
    });
  }

  render() {
    return (
      <div className={classes.gridInfo + " " + this.props.className}>
        {this.props.tableHeader}
        {this.state.filedsInputs ?? this.props.filedsInputs}
        <div id={classes.gridEnd}></div>
      </div>
    );
  }
}
export default GridContent;
