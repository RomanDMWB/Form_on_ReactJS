import XMLToReact from "@condenast/xml-to-react";
import xml from "../data/data.xml";
import InputContent from "./input";
import grid from "./grid.module.css";
import classes from "./input.module.css";

let isStyling = false;

function CustomForm() {
  const request = new XMLHttpRequest();
  request.open("GET", xml, false);
  request.send();
  const data = request.responseText.substring(40);

  const xmlToReact = new XMLToReact({
    Attr: (attrs) => ({ type: "div", props: { ...attrs, className: "attr" } }),
    Layout: (attrs) => {
      if (!isStyling) {
        const style = `
        .layout>div.${classes.row}>div:first-child,
        .layout>div:not(.${classes.row}):not(.${grid.gridInfo}){
          display:inline-grid;
          grid-template-columns:${parseInt(
            attrs.firstmargin.match(/\d+/)
          )}em 1fr;
        }`;
        var styleSheet = document.createElement("style");
        styleSheet.innerText = style;
        document.head.appendChild(styleSheet);
        isStyling = true;
      }
      return {
        type: "form",
        props: {
          className: "layout",
          onSubmit: (prop) => {
            console.log(prop);
          },
          action: (e) => {
            e.preventDefault();
          },
        },
      };
    },
    c: (attrs) => {
      if (attrs.type === "row")
        return { type: "div", props: { className: classes.row } };
      return {
        type: InputContent,
        props: { ...attrs },
      };
    },
  });
  const reactData = xmlToReact.convert(data);
  return reactData;
}

export default CustomForm;
