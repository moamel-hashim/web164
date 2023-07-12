import React from "react";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 255,
    };
    this.handleLimit = this.handleLimit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleLimit(event) {
    const limitCheck = event.target.value;
    const remainingCharacters = 255 - limitCheck.length;
      this.setState({limit: remainingCharacters});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({limit: 255});
    document.getElementById('twitter-feed').value = '';
  }

  render() {
    console.log(this.state.limit)
    return (
      <div className="component">
        <form onSubmit={this.handleSubmit}>
        <label htmlFor="username">enter username</label>
        <div className="input-container">
          <input type="text" name="username" />
        </div>
        <label htmlFor="twitter-feed">{`you have used ${this.state.limit} out of 255!`}</label>
        <div>
          <textarea name="twitter-feed" id="twitter-feed" cols="30" rows="10" maxLength='255' onChange={this.handleLimit}></textarea>
        </div>
        <button type="submit">submit</button>
        </form>
      </div>
    )
  }
}
