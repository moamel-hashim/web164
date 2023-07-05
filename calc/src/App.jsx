import './css/App.css'
import React from 'react'

export default class Calc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstNumber: null,
      operator: null,
      secondNumber: null,
      fontSize: 2
    };
    this.handleNumberClick = this.handleNumberClick.bind(this);
    this.handleOperatorClick = this.handleOperatorClick.bind(this)
    this.adjustFontSize = this.adjustFontSize.bind(this)
  }
  handleNumberClick = (number) => {
    const { firstNumber, operator, secondNumber, result } = this.state;

    if (result !== null) {
      this.setState({
        firstNumber: number,
        operator: null,
        secondNumber: null,
        result: null,
      });
    } else if (operator === null) {
      let updatedFirstNumber;
      if (firstNumber === null || firstNumber === 0) {
        updatedFirstNumber = number;
      } else {
        updatedFirstNumber = parseFloat(firstNumber.toString() + number.toString());
      }
      this.setState({ firstNumber: updatedFirstNumber });
    } else {
      let updatedSecondNumber;
      if (secondNumber === null || secondNumber === 0) {
        updatedSecondNumber = number;
      } else {
        updatedSecondNumber = parseFloat(secondNumber.toString() + number.toString());
      }
      this.setState({ secondNumber: updatedSecondNumber });
    }
    this.adjustFontSize();
  };

  handleOperatorClick = (operator) => {
    const { firstNumber, secondNumber, operator: currentOperator, result } = this.state;

    switch (operator) {
      case '+/-':
        if (secondNumber !== null) {
          this.setState({ secondNumber: -secondNumber });
        } else if (firstNumber !== null) {
          this.setState({ firstNumber: -firstNumber });
        }
        break;
      case '%':
        if (secondNumber !== null) {
          this.setState({ secondNumber: secondNumber / 100 });
        } else if (firstNumber !== null) {
          this.setState({ firstNumber: firstNumber / 100 });
        }
        break;
      case '.':
        if (secondNumber !== null) {
          if (!secondNumber.toString().includes('.')) {
            this.setState({ secondNumber: secondNumber.toString() + '.' });
          }
        } else if (firstNumber !== null) {
          if (!firstNumber.toString().includes('.')) {
            this.setState({ firstNumber: firstNumber.toString() + '.' });
          }
        }
        break;
      case '/':
      case '*':
      case '-':
      case '+':
        if (result !== null) {
          this.setState({
            firstNumber: result,
            operator,
            secondNumber: null,
            result: null,
          });
        } else if (firstNumber !== null && secondNumber !== null && currentOperator) {
          const newResult = this.performOperation(currentOperator, firstNumber, secondNumber);
          this.setState({
            firstNumber: newResult,
            operator,
            secondNumber: null,
          });
        } else if (firstNumber !== null) {
          this.setState({ operator });
        }
        break;
      case '=':
        if (firstNumber !== null && secondNumber !== null && currentOperator) {
          const newResult = this.performOperation(currentOperator, firstNumber, secondNumber);
          this.setState({
            firstNumber: newResult,
            operator: null,
            secondNumber: null,
            result: newResult,
          });
        }
        break;
      default:
        // Handle other operators if needed
        break;
    }
    this.adjustFontSize();
  };

  performOperation = (operator, num1, num2) => {
    switch (operator) {
      case '/':
        return num1 / num2;
      case '*':
        return num1 * num2;
      case '-':
        return num1 - num2;
      case '+':
        return num1 + num2;
      default:
        return 0;
    }
  };

  adjustFontSize = () => {
    const displayValueElement = document.querySelector('.display-value');
    const displayValueLength = displayValueElement.innerHTML.length;
    const maxLength = 7;

    if (displayValueLength > maxLength) {
      const scaleFactor = 5 / displayValueLength;
      const fontSize = 3 * scaleFactor;
      this.setState({ fontSize });
    }
  };

  render() {
    const { firstNumber, operator, secondNumber, fontSize } = this.state;
    let displayValue = '';

    if (operator) {
      displayValue += firstNumber !== null ? `${firstNumber} ${operator} ` : '';
      displayValue += secondNumber !== null ? secondNumber : '';
    } else {
      displayValue = firstNumber !== null ? firstNumber : 0;
    }
    return (
      <>
        <div className="container-md d-flex justify-content-center align-items-center vh-100">
          <div className="col-2 h-50 bg-dark rounded-4">
            <div className="col justify-content-end d-flex align-items-end h-25 mb-2 me-4">
              <h1 className="text-white display-value" style={{fontSize: `${fontSize}rem`}}>{displayValue}</h1>
            </div>
            <div className="d-flex">
              <div className=" col d-flex justify-content-center">
                <div className="col-2 text-center rounded-circle light-dark me-2">
                  <button className="background-none border-none p-2" onClick={ () => this.setState({firstNumber: null, operator: null, secondNumber: null})}>AC</button>
                </div>
                <div className="col-2 text-center rounded-circle light-dark me-2">
                  <button className=" m-0 background-none border-none p-2" onClick={ () => this.handleOperatorClick('+/-')}>+/-</button>
                </div>
                <div className="col-2 text-center rounded-circle light-dark me-2">
                  <button className=" m-0 background-none border-none p-2" onClick={ () => this.handleOperatorClick('%')}>%</button>
                </div>
                <div className="col-2 rounded-circle light-orange bg-opacity-75 text-center">
                  <button className="border-none background-none m-0 text-light p-2" onClick={ () => this.handleOperatorClick('/')}>&divide;</button>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div className=" col d-flex justify-content-center mt-2">
                <div className="col-2 text-center rounded-circle dark-color me-2">
                  <button className=" m-0 text-white p-2 border-none background-none" onClick={ () => this.handleNumberClick(7)}>7</button>
                </div>
                <div className="col-2 rounded-circle dark-color text-center me-2">
                  <button className="text-white m-0 border-none background-none p-2" onClick={() => this.handleNumberClick(8)}>8</button>
                </div>
                <div className="col-2 rounded-circle dark-color text-center me-2">
                  <button className="p-2 m-0 text-white background-none border-none" onClick={() => this.handleNumberClick(9)}>9</button>
                </div>
                <div className="col-2 text-center rounded-circle light-orange bg-opacity-75 ">
                  <button className=" border-none background-none m-0 text-white p-2" onClick={() => this.handleOperatorClick('*')}>&times;</button>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div className="col d-flex justify-content-center mt-2">
                <div className="col-2 rounded-circle dark-color text-center me-2">
                  <button className="p-2 m-0 text-white background-none border-none" onClick={() => this.handleNumberClick(4)}>4</button>
                </div>
                <div className="col-2 rounded-circle dark-color text-center me-2">
                  <button className="background-none border-none m-0 p-2 text-white" onClick={() => this.handleNumberClick(5)}>5</button>
                </div>
                <div className="col-2 rounded-circle dark-color text-center me-2">
                  <button className="p-2 background-none border-none m-0 text-white" onClick={() => this.handleNumberClick(6)}>6</button>
                </div>
                <div className="col-2 rounded-circle light-orange bg-opacity-75 text-center">
                  <button className="background-none border-none p-2 m-0 text-white" onClick={() => this.handleOperatorClick('-')}>&minus;</button>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div className="col d-flex justify-content-center mt-2">
                <div className="col-2 rounded-circle dark-color text-center me-2">
                  <button className="background-none border-none p-2 m-0 text-white" onClick={() => this.handleNumberClick(1)}>1</button>
                </div>
                <div className="col-2 rounded-circle dark-color text-center me-2">
                  <button className="background-none border-none m-0 p-2 text-white" onClick={() => this.handleNumberClick(2)}>2</button>
                </div>
                <div className="col-2 rounded-circle dark-color text-center me-2">
                  <button className="border-none background-none p-2 m-0 text-white" onClick={() => this.handleNumberClick(3)}>3</button>
                </div>
                <div className="col-2 rounded-circle light-orange bg-opacity-75 text-center">
                  <button className="border-none background-none p-2 m-0 text-white" onClick={() => this.handleOperatorClick('+')}>+</button>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div className="col d-flex justify-content-center mt-2">
                <div className=" custom-col rounded-pill dark-color me-2">
                  <button className="border-none background-none p-2 ps-2 m-0 text-white" onClick={() => this.handleNumberClick(0)}>0</button>
                </div>
                <div className="col-2 rounded-circle dark-color text-center me-2">
                  <button className="border-none background-none m-0 p-2 text-white" onClick={() => this.handleOperatorClick('.')}>.</button>
                </div>
                <div className="col-2 rounded-circle light-orange bg-opacity-75 text-center">
                  <button className="background-none border-none p-2 m-0 text-white" onClick={() => this.handleOperatorClick('=')}>=</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
