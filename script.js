class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      },
      results: []
    }
    this.running = false;
  }
  reset() {
    this.setState({
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      }
    })
  }

  getDateFormat() {
    const { minutes, seconds, miliseconds } = this.state.times;
    return `${pad0(minutes)}:${pad0(seconds)}:${pad0(Math.floor(miliseconds))}`;
  }

  start() {
    if (!this.state.running) {
      this.running = true;
      this.watch = setInterval(() => this.step(), 10);
    }
  }

  step() {
    if (!this.running) return;
    this.calculate();
  }

  calculate() {
    let { minutes, seconds, miliseconds } = this.state.times;
    miliseconds += 1;
    if (miliseconds >= 100) {
      seconds += 1;
      miliseconds = 0;
    }
    if (seconds >= 60) {
      minutes += 1;
      seconds = 0;
    }
    this.setState({
      times: {
        minutes,
        seconds,
        miliseconds
      }
    })
  }

  stop() {
    this.running = false;
    clearInterval(this.watch);
  }

  resetWatch() {
    this.running = false;
    this.reset();
    clearInterval(this.watch);
  }

  save() {
    // const results = this.state.results.slice();
    // results.push(this.format(this.state.times));
    // this.setState({results: results});
    const results = [...this.state.results, this.getDateFormat()];
    this.setState ({ results })
  }

  clear() {
    this.setState({results: [] });
  }

  render() {
    return (
        <div className={'app'}>
          <nav className={'controls'}>
            <a href="#" onClick={this.start.bind(this)}>Start</a>
            <a href="#" onClick={this.stop.bind(this)}>Stop</a>
            <a href="#" onClick={this.reset.bind(this)}>Reset</a>
            <a href="#" onClick={this.save.bind(this)}>Save</a>
            <a href="#" onClick={this.clear.bind(this)}>Clear</a>
          </nav>
          <div className={'stopwatch'}>
            {this.getDateFormat()}
          </div>
          <ul className={'results'}>
            {this.state.results.map(result => <li>{result}</li>)}
          </ul>
        </div>
    )
  }
}

function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
}

ReactDOM.render(
    <Stopwatch/>,
    document.getElementById('app')
);
