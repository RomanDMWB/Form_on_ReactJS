import { InformationReference } from "../infoReference";
import GridContent from "./grid";
import classes from "./input.module.css";
import record from "../data/info.json";
import React from "react";

const reference = new InformationReference();

function InputContent({
  type,
  field,
  label,
  movetoright,
  extendtobottom,
  extendtoright,
  required,
}) {
  let className = [];
  if (movetoright) className.push(classes.moveToRight);
  if (extendtobottom) className.push(classes.extendToBottom);
  if (extendtoright) className.push(classes.extendToRight);
  className = className.join(" ");
  let Element;
  if (type === "grid")
    Element = React.createElement(GridElement, {
      type,
      className,
    });
  else {
    const itemData = reference.getItemByCode(field.split(".")[1]);
    if (itemData) {
      let typeName;
      const labelContent = <label>{itemData.title}</label>;
      switch (itemData.type) {
        case "datechooser":
          typeName = "date";
          break;
        case "textbox":
          typeName = "text";
          break;
        default:
          typeName = "";
          break;
      }

      Element = React.createElement(InputElement, {
        labelContent,
        className,
        typeName,
        field,
        label,
        required,
      });
    }
  }
  return Element;
}

class InputElement extends React.Component {
  state = {
    record: {},
  };

  componentDidMount() {
    if (record)
      this.setState({
        record,
      });
  }

  render() {
    let inputContent = (
      <input
        id={this.props.field}
        type={this.props.typeName}
        defaultValue={
          this.state.record ? this.state.record[this.props.field] : ""
        }
        required={!!this.props.required}
      />
    );
    if (this.props.field.includes("account1")) {
      const options = [];
      reference.getAccounts().forEach(({ number }) => {
        options.push(<option>{number}</option>);
      });
      inputContent = (
        <select id={this.props.field} onChange={this._onChange}>
          {options}
        </select>
      );
    } else if (this.props.field.includes("corr1_n")) {
      const options = [];
      reference.getAccounts().forEach(({ name }) => {
        options.push(<option>{name}</option>);
      });
      inputContent = (
        <select id={this.props.field} onChange={this._onChange}>
          {options}
        </select>
      );
    }
    return (
      <div className={this.props.className}>
        {this.props.label === "left" ? this.props.labelContent : ""}
        {inputContent}
        {this.props.label === "roght" ? this.props.labelContent : ""}
      </div>
    );
  }

  _onChange(props) {
    const index = props.target.selectedIndex;
    if (props.target.id.includes("account1")) {
      document.getElementById("1.corr1_n").getElementsByTagName("option")[
        index
      ].selected = "selected";
    } else {
      document.getElementById("1.account1").getElementsByTagName("option")[
        index
      ].selected = "selected";
    }
  }
}

class GridElement extends InputElement {
  render() {
    return GridContent(
      reference.getItemByType(this.props.type).fields,
      this.props.className
    );
  }
}

export default InputContent;
