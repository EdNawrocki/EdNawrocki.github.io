const projectname = 'DrumKit';

//drum noises provided by FreeCodeCamp
const padBank = [
{ id: 'Q',
  keyCode: 81,
  description: 'bum',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },

{
  keyCode: 87,
  id: 'W',
  description: 'tss',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },

{
  keyCode: 69,
  id: 'E',
  description: 'duu',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },

{
  keyCode: 65,
  id: 'A',
  description: 'Tss',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },

{
  keyCode: 83,
  id: 'S',
  description: 'clp',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },

{
  keyCode: 68,
  id: 'D',
  description: 'brr',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },

{
  keyCode: 90,
  id: 'Z',
  description: "Brr",
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },

{
  keyCode: 88,
  id: 'X',
  description: 'Drr',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },

{
  keyCode: 67,
  id: 'C',
  description: 'duh',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' }];



class Drum extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.playAudio = this.playAudio.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  handleKeyPress(e) {
    if (e.keyCode === this.props.keyCode) {
      this.playAudio();
    }
  }
  playAudio() {
    let audiofile = document.getElementById(this.props.id);
    audiofile.currentTime = 0;
    audiofile.play();
    this.props.updateDisplay(this.props.description);
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "drum-pad",
        onClick: this.playAudio,
        id: this.props.description }, /*#__PURE__*/
      React.createElement("button", null, this.props.id), /*#__PURE__*/
      React.createElement("audio", {
        className: "clip",
        id: this.props.id,
        src: this.props.url })));


  }}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'space' };

    this.updateDisplay = this.updateDisplay.bind(this);
  }

  updateDisplay(drumType) {
    this.setState({
      display: drumType });

  }

  render() {
    const drumBank = padBank.map((drumObj, i) => {
      return /*#__PURE__*/(
        React.createElement(Drum, {
          id: padBank[i].id,
          url: padBank[i].url,
          keyCode: padBank[i].keyCode,
          description: padBank[i].description,
          updateDisplay: this.updateDisplay }));

    });

    return /*#__PURE__*/(
      React.createElement("div", { id: "drum-machine" }, /*#__PURE__*/
      React.createElement("h1", { id: "display" }, this.state.display), /*#__PURE__*/
      React.createElement("div", { id: "pad-bank" }, drumBank)));


  }}


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('app'));