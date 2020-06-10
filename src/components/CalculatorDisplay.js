import React from "react";
import { evaluate } from "mathjs"; // eval is a reserved word!
const maxCharAtFullSize = 6;

const CalculatorDisplay = (props) => {
  const value = props.displayValue;
  const scaleFactor = "scale(0.36)";
  let scaleDown = null;
  let scientificNotation = null;
  let formattedText = null;
  const maxPrecision = 16;

  try {
    const pointAt = `${value}`.indexOf(".");
    const decimalValue = value.substring(pointAt, evaluate(value.length));
  
    var precessionWithFraction =
      pointAt === -1 ? 0 : evaluate(decimalValue.length - 1);
    formattedText = parseFloat(value).toLocaleString(undefined, {
      minimumFractionDigits: precessionWithFraction,
    });

    if (formattedText === "NaN") {
      //account for errors
      formattedText = "Error";
    } else {
      if (formattedText.length > maxPrecision - 1) {
        scientificNotation = parseFloat(value).toExponential(maxPrecision - 4); // Allow at least 4 characters (for scientific notation e.g. e+14) in the output string
        if (
          scientificNotation.substring(
            scientificNotation.length - 3,
            scientificNotation.length
          ) === "e+0"
        ) {
          // if exponent part is not needed
          scientificNotation = parseFloat(value).toExponential(
            maxPrecision - 1
          );
          scientificNotation = scientificNotation.substring(
            0,
            scientificNotation.length - 3
          );
        }
        formattedText = scientificNotation;
        if (formattedText === "NaN") {
          //account for overflow
          formattedText = "Overflow\xA0Error";
        }
      }
      scaleDown =
        formattedText.length > maxCharAtFullSize ? scaleFactor : "scale(1)";
    }
  } catch (e) {
    formattedText = "Error";
  }
  return (
    <div className="calc_display">
      <div className="text" style={{ transform: scaleDown }}>
        {formattedText}
      </div>
    </div>
  );
};

export default CalculatorDisplay;
