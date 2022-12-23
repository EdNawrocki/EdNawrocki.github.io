const projectName = 'JavaScript Clock';

class BreakController extends React.Component {
  constructor(props) {
    super(props);
    this.handleBreakIncrease = this.handleBreakIncrease.bind(this);
    this.handleBreakDecrease = this.handleBreakDecrease.bind(this);
    this.handleSessionIncrease = this.handleSessionIncrease.bind(this);
    this.handleSessionDecrease = this.handleSessionDecrease.bind(this);
  }

  handleBreakIncrease() {
    this.props.onBreakChange(true, 'break');
  }
  handleBreakDecrease() {
    this.props.onBreakChange(false, 'break');
  }

  handleSessionIncrease() {
    this.props.onBreakChange(true, 'session');
  }
  handleSessionDecrease() {
    this.props.onBreakChange(false, 'session');
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { class: "parent" }, /*#__PURE__*/
      React.createElement("div", { class: "child" }, /*#__PURE__*/
      React.createElement("h2", { id: "break-label" }, "Break Length"), /*#__PURE__*/

      React.createElement("button", { id: "break-increment",
        onClick: this.handleBreakIncrease }, "Increase"), /*#__PURE__*/
      React.createElement("h2", { id: "break-length" }, this.props.breakLength / 60), /*#__PURE__*/
      React.createElement("button", { id: "break-decrement",
        onClick: this.handleBreakDecrease }, "Decrease")), /*#__PURE__*/


      React.createElement("div", { class: "child" }, /*#__PURE__*/
      React.createElement("h2", { id: "session-label" }, "Session Length"), /*#__PURE__*/

      React.createElement("button", { id: "session-increment",
        onClick: this.handleSessionIncrease }, "Increase"), /*#__PURE__*/
      React.createElement("h2", { id: "session-length" }, this.props.sessionLength / 60), /*#__PURE__*/
      React.createElement("button", { id: "session-decrement",
        onClick: this.handleSessionDecrease }, "Decrease"))));



  }}


class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.setTime = this.setTime.bind(this);
  }
  setTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    if (seconds < 10) {
      if (minutes < 10) {
        return '0' + minutes + ':' + '0' + seconds;
      }
      return minutes + ':' + '0' + seconds;
    } else {
      if (minutes < 10) {
        return '0' + minutes + ':' + seconds;
      }
      return minutes + ':' + seconds;
    }

  }

  render() {
    return /*#__PURE__*/(
      React.createElement("h1", { id: "time-left" }, this.setTime(this.props.timer)));

  }}


function tickClock(fn, time) {
  var timeout = null;
  var cancel;
  wrapper = function () {
    timeout = setTimeout(wrapper, time);
    return fn();
  };
  cancel = function () {
    return clearTimeout(timeout);
  };
  timeout = setTimeout(wrapper, time);
  return {
    cancel: cancel };

};


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 1500,
      sessionLength: 1500,
      breakLength: 300,
      play: true,
      timerMode: 'session',
      intervalID: '' };

    this.handlePlay = this.handlePlay.bind(this);
    this.changeTime = this.changeTime.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
    this.changeBreak = this.changeBreak.bind(this);
    this.switchLength = this.switchLength.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
    this.reset = this.reset.bind(this);
  }

  updateTimer() {
    if (this.state.timerMode == 'session') {
      this.setState({
        timer: this.state.sessionLength });

    }
    if (this.state.timerMode == 'break') {
      this.setState({
        timer: this.state.breakLength });

    }
  }

  changeBreak(change, type) {
    if (type == 'break') {
      if (change && this.state.breakLength < 3600) {
        this.setState({ breakLength: this.state.breakLength += 60 });
      } else
      if (!change && this.state.breakLength > 60) {
        this.setState({ breakLength: this.state.breakLength -= 60 });
      }
    }
    if (type == 'session') {
      if (change && this.state.sessionLength < 3600) {
        this.setState({ sessionLength: this.state.sessionLength += 60 });
      } else
      if (!change && this.state.sessionLength > 60) {
        this.setState({ sessionLength: this.state.sessionLength -= 60 });
      }
    }
    this.updateTimer();
  }

  decrementTimer() {
    this.setState({ timer: this.state.timer - 1 });
  }

  handlePlay() {
    this.setState({ play: !this.state.play }, () => {
      console.log(this.state.play);
    });
    this.changeTime();
  }

  changeTime() {
    if (this.state.play) {
      this.setState({
        intervalID: tickClock(() => {
          this.decrementTimer();
        }, 1000) });

    } else
    if (this.state.intervalID) {
      this.state.intervalID.cancel();
    }
  }

  switchLength() {
    if (this.state.timerMode == 'session') {
      this.setState({
        timerMode: 'break',
        timer: this.state.breakLength });

    } else
    {
      this.setState({
        timerMode: 'session',
        timer: this.state.sessionLength });

    }
  }

  reset() {
    this.setState({
      timer: 1500,
      sessionLength: 1500,
      breakLength: 300,
      play: true,
      timerMode: 'session',
      intervalID: '' });

    if (this.state.intervalID) {
      this.state.intervalID.cancel();
    }
    document.getElementById('beep').pause();
    document.getElementById('beep').currentTime = 0;
  }

  render() {
    if (this.state.timer < 0) {
      document.getElementById('beep').play();
      this.switchLength();
    }
    return /*#__PURE__*/(
      React.createElement("div", { id: "container" }, /*#__PURE__*/
      React.createElement("div", { id: "break-container" }, /*#__PURE__*/
      React.createElement(BreakController, {
        onBreakChange: this.changeBreak,
        breakLength: this.state.breakLength,
        sessionLength: this.state.sessionLength })), /*#__PURE__*/

      React.createElement("div", { id: "clock-container" }, /*#__PURE__*/
      React.createElement(Clock, {
        timer: this.state.timer }), /*#__PURE__*/
      React.createElement("h2", { id: "timer-label" }, this.state.timerMode), /*#__PURE__*/
      React.createElement("button", { id: "start_stop", onClick: this.handlePlay }, "play/pause"), /*#__PURE__*/
      React.createElement("button", { id: "reset", onClick: this.reset }, "reset")), /*#__PURE__*/

      React.createElement("audio", {
        id: "beep",
        preload: "auto",
        src: "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" })));






  }}


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('app'));