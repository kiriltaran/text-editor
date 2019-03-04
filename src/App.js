import React, { Component } from 'react'
import axios from 'axios'
import getMockText from './text.service'
import './App.scss'

import TextEditor from './components/TextEditor'

class App extends Component {
  state = {
    text: '',
    synonyms: [],
  }

  async componentDidMount() {
    await this.getText()
  }

  async getText() {
    try {
      const text = await getMockText()
      this.setState({
        text,
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getWordSynonyms(word) {
    try {
      const { data } = await axios.get(`https://api.datamuse.com/words?ml=${word}`)

      const synonyms = data.map(item => item.word).slice(0, 3)

      this.setState({
        synonyms,
      })
    } catch (error) {
      console.log(error)
    }
  }

  handleSelectWord = async word => {
    await this.getWordSynonyms(word)
  }

  render() {
    const { text, synonyms } = this.state

    return (
      <div className="App">
        <header>
          <span>Simple Text Editor</span>
        </header>
        <main>
          <div className="text-editor-wrapper">
            <TextEditor
              key={text}
              text={text}
              synonyms={synonyms}
              onSelectWord={this.handleSelectWord}
            />
          </div>
        </main>
      </div>
    )
  }
}

export default App
