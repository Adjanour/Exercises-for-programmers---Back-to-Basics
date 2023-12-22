class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: '' };
  }
    componentDidMount() {
        this.setState({ message: this.props.message });
    }

  render() {
    return <div className="notification">
        <div className="notification-content">{this.state.message}</div>
        <CloseButton onClick={this.props.handleNotificationClose}/>
    </div>
  }
}

class CloseButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <button className="close-button" onClick={this.props.onClick}>X</button>
  }
}

class Input extends React.Component {
    constructor(props) {
      super(props);
      this.state = { value: '' };
      this.onChange = this.onChange.bind(this);
    }
  
    onChange(event) {
      const { value } = event.target;
      this.setState({ value });
      this.props.onChange(value);
    }
  
    render() {
      return (
        <input
          type="text"
          className="input"
          value={this.state.value}
          onChange={this.onChange}
        />
      );
    }
  }
  

class Heading extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h1 className="heading">{this.props.text}</h1>
  }
}

class Label extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <label className="label">{this.props.text}</label>
  }
}

class SubmitButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <button className="button" onClick={this.props.onClick}>{this.props.text}</button>
  }
}

class Form extends React.Component {
    constructor (props) {
        super(props)
    }
    render() {
        return <form className="form" onSubmit={this.props.onSubmit}>
            <h2>Enter the bill details</h2>
            <Label text="Bill Ammount" />
            <Input onChange={this.props.inputChangeForBill} />
            <Label text="Tip Percentage" />
            <Input onChange={this.props.inputChangeForTip} />
            <SubmitButton text="Submit" onClick={this.props.onSubmitBtnClick} />
        </form>
    }
}

class Clock extends React.Component {
    constructor(props){
      super(props);
      this.state = {date: new Date()};
    }
    componentDidMount(){
      this.timerID = setInterval(()=> this.tick(),1000);
    }
    componentWillUnmount(){
      clearInterval(this.timerID);
    }
    tick(){
      this.setState({date: new Date()});
    }

    render(){
      return <h2 className="clock">{this.state.date.toUTCString()}</h2>
    }
}
class Image extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <img className="image" src={this.props.src} />
    }
}
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { billAmount: '', message: '' ,tipPercentage: '',total:'',tip:''};
        this.handleInputChangeForBill = this.handleInputChangeForBill.bind(this);
        this.handleInputChangeForTip = this.handleInputChangeForTip.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNotificationClose = this.handleNotificationClose.bind(this);
    }
    handleInputChangeForBill = (value) => {
        this.setState({ billAmount: value });
    }
    handleInputChangeForTip = (value) => {
        this.setState({ tipPercentage: value });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const billAmount = parseFloat(this.state.billAmount);
        const tipPercentage = parseFloat(this.state.tipPercentage);
        const tip = billAmount * (tipPercentage / 100);
        const total = billAmount + tip;
        if (isNaN(total)) 
        {
            this.setState({ message: 'Please enter valid input' });
        }
        this.setState({ tip: isNaN(tip)?'':tip.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
        , total: isNaN(total)?'':total.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) });
        
    }
    handleNotificationClose = () => {
        this.setState({ message: '' });
    }
    render() {
        return <div>
            <Clock />
            {this.state.message && <Notification message={this.state.message} handleNotificationClose={this.handleNotificationClose} />}
            <div><Image src="pig.png" /></div>
            <Heading text="Tip Calculator" />
            <div className="Card">
            <Form inputChangeForBill={this.handleInputChangeForBill} inputChangeForTip={this.handleInputChangeForTip} onSubmitBtnClick={this.handleSubmit} />
            <div className="result">
                <p>
                    <label>Tip:</label>
                    <span id="tip">{this.state.tip}</span>
                </p>
                <p>
                    <label>Total:</label>
                    <span id="total">{this.state.total}</span>
                </p>
            </div>
            </div>
        </div>
    }
    }

ReactDOM.render(
    <App />,
    document.getElementById('app')
)