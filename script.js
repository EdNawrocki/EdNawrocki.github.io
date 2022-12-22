const projectname = 'JavascriptCalculator';

// listing the main numerical keys and operations
const numKeys = [
{
  numVal: '1',
  id: 'one' },

{
  numVal: '2',
  id: 'two' },

{
  numVal: '3',
  id: 'three' },

{
  numVal: '4',
  id: 'four' },

{
  numVal: '5',
  id: 'five' },

{
  numVal: '6',
  id: 'six' },

{
  numVal: '7',
  id: 'seven' },

{
  numVal: '8',
  id: 'eight' },

{
  numVal: '9',
  id: 'nine' },

{
  numVal: '0',
  id: 'zero' },

{
  numVal: '.',
  id: 'decimal' },

{
  numVal: '+',
  id: 'add' },

{
  numVal: '-',
  id: 'subtract' },

{
  numVal: '*',
  id: 'multiply' },

{
  numVal: '/',
  id: 'divide' }];



function validInput(calcDisplay) {
  //if input starts with multiple zeros, throw err
  if (calcDisplay[0] == '0') {
    if (calcDisplay.length > 1) {
      if (calcDisplay[1] == '0') {
        return 'err';
      }
    }
  }
  //if input starts or ends with operation except - throw err
  if (calcDisplay[0] != '-' && !isNaN(parseInt(calcDisplay[1]))) {
    if (isNaN(parseInt(calcDisplay[0]))) {
      return 'err';
    }
  }

  if (isNaN(parseInt(calcDisplay[calcDisplay.length - 1]))) {
    return 'err';
  }
  //split the display input into groups of numbers 
  let decArr = [];
  let currentNum = '';
  for (let i = 0; i < calcDisplay.length; i++) {
    if (isNaN(calcDisplay[i]) && calcDisplay[i] != '.') {
      if (currentNum != '') {

        decArr.push(currentNum);
      }
      currentNum = '';
    } else

    {
      currentNum += calcDisplay[i];
    }
  }
  if (currentNum != '') {
    decArr.push(currentNum);
  }
  //make sure each number found is good
  for (let i = 0; i < decArr.length; i++) {
    if (isNaN(decArr[i])) {
      return 'err';
    }
  }
  //split the display into groups of operators
  let opArr = [];
  let currentOp = '';
  for (let i = 0; i < calcDisplay.length; i++) {
    if (!isNaN(calcDisplay[i]) || calcDisplay[i] == '.') {
      if (currentOp != '') {

        opArr.push(currentOp);
      }
      currentOp = '';
    } else

    {
      currentOp += calcDisplay[i];
    }
  }
  //organize the operators to identify minus signs and clean up for eval
  for (let i = 0; i < opArr.length; i++) {
    if (opArr[i][opArr[i].length - 1] != '-') {
      opArr[i] = opArr[i][opArr[i].length - 1];
    } else
    {
      if (opArr[i].length > 1) {
        opArr[i] = opArr[i][opArr[i].length - 2] + opArr[i][opArr[i].length - 1];
      }
    }
  }
  //weave the two groups back together depending on if the first term is negative
  let outputString = '';
  if (calcDisplay[0] != '-') {

    for (let i = 0; i < opArr.length; i++) {
      outputString += decArr[i];
      outputString += opArr[i];
    }
    outputString += decArr[decArr.length - 1];
  } else
  {
    for (let i = 0; i < decArr.length; i++) {
      outputString += opArr[i];
      outputString += decArr[i];
    }
  }

  return outputString;
}
//check valid input, evaluate if input is good, return err if bad
function calculateString(calcDisplay) {
  if (validInput(calcDisplay) == 'err') {
    return 'err';
  } else {
    return eval(validInput(calcDisplay));
  }
}
//code for each button besides clear and equals
class NumPad extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onDigitChange(this.props.numVal);
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { class: "number-pad" }, /*#__PURE__*/
      React.createElement("button", { class: "number-pad",
        id: this.props.id,
        onClick: this.handleClick }, this.props.numVal)));


  }}

//only allow one decimal for each number
function checkDecimal(displayState, input) {
  if (input == '.') {
    for (let i = displayState.length - 1; i >= 0; i--) {
      if (displayState[i] == '.') {
        return true;
      }
      if (isNaN(displayState[i])) {
        return false;
      }
    }
  } else
  {
    return false;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '0' };

    this.handleInput = this.handleInput.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleEquals = this.handleEquals.bind(this);
  }

  handleInput(input) {
    if (this.state.display == '0') {
      this.setState({
        display: input });

    } else
    {
      if (checkDecimal(this.state.display, input)) {
        this.setState({
          display: this.state.display });

      } else {
        this.setState({
          display: this.state.display += input });

      }
    }
  }

  handleClear() {
    this.setState({
      display: '0' });

  }

  handleEquals() {
    this.setState({
      display: calculateString(this.state.display) });

  }

  render() {
    const numberBank = numKeys.map((numObj, i) => {
      return /*#__PURE__*/(
        React.createElement(NumPad, {
          id: numKeys[i].id,
          numVal: numKeys[i].numVal,
          onDigitChange: this.handleInput }));

    });
    return /*#__PURE__*/(
      React.createElement("div", { className: "inner-container" }, /*#__PURE__*/
      React.createElement("input", { className: "display", value: this.state.display, id: "display" }), /*#__PURE__*/
      React.createElement("div", { class: "number-bank" }, numberBank, /*#__PURE__*/
      React.createElement(Clear, {
        id: "clear",
        value: "C",
        onClick: this.handleClear }), /*#__PURE__*/
      React.createElement(Equals, {
        id: "equals",
        value: "=",
        onClick: this.handleEquals }))));




  }}


function Clear(props) {
  return /*#__PURE__*/(
    React.createElement("button", {
      class: "number-pad",
      id: props.id,
      onClick: props.onClick },
    props.value));


}

function Equals(props) {
  return /*#__PURE__*/(
    React.createElement("button", {
      class: "number-pad",
      id: props.id,
      onClick: props.onClick },
    props.value));


}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('app'));