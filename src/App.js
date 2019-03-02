import React, { Component } from 'react'
import './App.css'
import ControlPanel from './components/control-panel/ControlPanel'
import FileZone from './components/file-zone/FileZone'
import getMockText from './text.service'

class App extends Component {
  state = {
    text: '',
  }
  componentDidMount() {
    this.getText()
  }

  async getText() {
    const text = await getMockText()
    this.setState({
      text,
    })
  }
  render() {
    const { text } = this.state
    return (
      <div className="App">
        <header>
          <span>Simple Text Editor</span>
        </header>
        <main>
          <ControlPanel />
          <FileZone content={text} />
        </main>
      </div>
    )
  }
}

export default App
