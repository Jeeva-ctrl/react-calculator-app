import React, { Component } from "react";
import CalculatorDisplay from "./CalculatorDisplay";
import { evaluate } from "mathjs";
const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["/", "*", "-", "+", "="];

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayValue: "0",
      waitingForOperand: false,
      operator: null,
      clearAll: false,
      firstOperand: "0",
      activeOperator: null,
    };
  }

  render() {
    const handleClick = (e) => {
      processData(`${e.target.value}`, e.target.id);
    };
     
    const processData = (value, key) => {
      const isDigit = digits.includes(value);
      const isOperator = operators.includes(value);

      if (isDigit) {
        processDigit(value);
      } else if (isOperator) {
        processOperator(value, key);
      } else {
        processFunctionKey(value);
      }
    };

    const processDigit = (value) => {
      const { waitingForOperand, displayValue } = this.state;
      if (waitingForOperand) {
        this.setState({
          displayValue: `${value}`,
          waitingForOperand: false,
          clearAll: false,
        });
      } else {
        const newDisplayValue =
          displayValue === "0" ? `${value}` : `${displayValue}${value}`;
        this.setState({
          displayValue: `${newDisplayValue}`,
          waitingForOperand: false,
          clearAll: false,
        });
      }
    };
    const processOperator = (value, key) => {
      const {
        displayValue,
        operator,
        waitingForOperand,
        firstOperand,
      } = this.state;
      let newDisplayValue = null;
      let newOperand = null;
      let stringToEvaluate = null;
      if (firstOperand === "0" || operator == null || waitingForOperand) {
        this.setState({
          waitingForOperand: true,
          operator: value,
          firstOperand: displayValue,
          clearAll: false,
          activeOperator: key,
        });
      } else {
        stringToEvaluate = `${firstOperand}${operator}${displayValue}`;
        try {
          console.log("stringToEvaluate", stringToEvaluate);
          newDisplayValue = `${evaluate(stringToEvaluate)}`;
        } catch (e) {
          newDisplayValue = "Error";
        }
        if (newDisplayValue == "Infinity") {
          newDisplayValue = "Error";
        }
        this.setState({
          firstOperand: `${newDisplayValue}`,
          waitingForOperand: true,
          clearAll: false,
          displayValue: `${newDisplayValue}`,
          activeOperator: key,
        });
      }
    };
    const processClear = () => {
      const { clearAll } = this.state;

      this.setState({
        displayValue: "0",
        firstOperand: "0",
        operator: null,
        waitingForOperand: false,
        clearAll: true,
        activeOperator:null
      });
    };

    const processPlusMinusToggle = () => {
      this.setState({ displayValue: parseFloat(this.state.displayValue) * -1 });
    };

    const processPercentage = () => {
      this.setState({
        displayValue: parseFloat(this.state.displayValue) / 100,
      });
    };
    const processPoint = (value) => {
      const { displayValue, waitingForOperand } = this.state;
      const needPoint = `${displayValue}`.indexOf(".") === -1 ? true : false;
      if (waitingForOperand) {
        this.setState({
          displayValue: "0.",
          waitingForOperand: false,
          clearAll: false,
        });
      } else {
        if (needPoint) {
          this.setState({
            displayValue: `${displayValue}${value}`,
            waitingForOperand: false,
            clearAll: false,
          });
        }
      }
    };
    const processFunctionKey = (newKeyValue) => {
      switch (newKeyValue) {
        case "C":
          processClear(newKeyValue);
          break;
        case "±":
          processPlusMinusToggle(newKeyValue);
          break;
        case ".":
          processPoint(newKeyValue);
          break;
        case "%":
          processPercentage(newKeyValue);
          break;
        default:
          this.processUnknownKey(newKeyValue);
      }
    };
    const processFunction = (value) => {};

    return (
      <div className="container">
        <CalculatorDisplay {...this.state} />
        <div className="keypads">
          <div className="input-keys">
            <div className="function_keypad">
              <button
                id="key-clear"
                value="C"
                className="calculator-key key-clear"
                onClick={handleClick}
              >
                {this.state.clearAll ? "AC" : "C"}
              </button>
              <button
                id="key-sign"
                value="±"
                className="calculator-key key-clear"
                onClick={handleClick}
              >
                &plusmn;
              </button>
              <button
                id="key-percentage"
                value="%"
                className="calculator-key key-clear"
                onClick={handleClick}
              >
                %
              </button>
            </div>
            <div className="digit_keypad">
              <button
                id="key-0"
                value="0"
                className="calculator-key key-0"
                onClick={handleClick}
              >
                0
              </button>
              <button
                id="key-dot"
                value="."
                className="calculator-key key-dot"
                onClick={handleClick}
              >
                &middot;
              </button>
              <button
                id="key-1"
                value="1"
                className="calculator-key key-1"
                onClick={handleClick}
              >
                1
              </button>
              <button
                id="key-2"
                value="2"
                className="calculator-key key-2"
                onClick={handleClick}
              >
                2
              </button>
              <button
                id="key-3"
                value="3"
                className="calculator-key key-3"
                onClick={handleClick}
              >
                3
              </button>
              <button
                id="key-4"
                value="4"
                className="calculator-key key-4"
                onClick={handleClick}
              >
                4
              </button>
              <button
                id="key-5"
                value="5"
                className="calculator-key key-5"
                onClick={handleClick}
              >
                5
              </button>
              <button
                id="key-6"
                value="6"
                className="calculator-key key-6"
                onClick={handleClick}
              >
                6
              </button>
              <button
                id="key-7"
                value="7"
                className="calculator-key key-7"
                onClick={handleClick}
              >
                7
              </button>
              <button
                id="key-8"
                value="8"
                className="calculator-key key-8"
                onClick={handleClick}
              >
                8
              </button>
              <button
                id="key-9"
                value="9"
                className="calculator-key key-9"
                onClick={handleClick}
              >
                9
              </button>
            </div>
          </div>
          <div className="operation-keypad">
            <button
              id="key-divide"
              value="/"
              className={
                this.state.activeOperator == "key-divide"
                  ? "calculator-key key-divide active"
                  : "calculator-key key-divide "
              }
              onClick={handleClick}
            >
              &divide;
            </button>
            <button
              id="key-multiply"
              value="*"
              className={
                this.state.activeOperator == "key-multiply"
                  ? "calculator-key key-divide active"
                  : "calculator-key key-divide"
              }
              onClick={handleClick}
            >
              &times;
            </button>
            <button
              id="key-subtract"
              value="-"
              className={
                this.state.activeOperator == "key-subtract"
                  ? "calculator-key key-divide active"
                  : "calculator-key key-divide"
              }
              onClick={handleClick}
            >
              &ndash;
            </button>
            <button
              id="key-add"
              value="+"
              className={
                this.state.activeOperator == "key-add"
                  ? "calculator-key key-divide active"
                  : "calculator-key key-divide "
              }
              onClick={handleClick}
            >
              +
            </button>
            <button
              id="key-equals"
              value="="
              className={
                this.state.activeOperator == "key-equals"
                  ? "calculator-key key-divide active"
                  : "calculator-key key-divide "
              }
              onClick={handleClick}
            >
              =
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
