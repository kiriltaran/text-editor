import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './TextEditor.scss'

import TextEditorContextMenu from './TextEditorContextMenu/TextEditorContextMenu'

class TextEditor extends Component {
  state = {
    content: [],
    editedWordIndex: null,
  }

  componentDidMount() {
    const { text } = this.props

    const content = text.split(' ').map(word => ({
      value: word,
      bold: false,
      italic: false,
      underline: false,
    }))

    this.setState({
      content,
    })
  }

  getWordStyles(wordIndex) {
    const { content } = this.state

    const styles = {}

    if (content[wordIndex].bold) {
      styles.fontWeight = 'bold'
    }

    if (content[wordIndex].italic) {
      styles.fontStyle = 'italic'
    }

    if (content[wordIndex].underline) {
      styles.textDecoration = 'underline'
    }

    return styles
  }

  handleContextMenuOpening = (editedWordIndex, event) => {
    const { content } = this.state
    const { onSelectWord } = this.props

    event.preventDefault()

    onSelectWord(content[editedWordIndex].value)

    this.setState({ editedWordIndex })
  }

  handleToggleStyle = (wordIndex, styleKey) => {
    const { content } = this.state
    content[wordIndex][styleKey] = !content[wordIndex][styleKey]

    this.setState({ content })
  }

  handleClickOutside = () => {
    this.setState({ editedWordIndex: null })
  }

  handleClickSynonym = synonym => {
    const { content, editedWordIndex } = this.state

    content[editedWordIndex].value = synonym

    this.setState({ content, editedWordIndex: null })
  }

  render() {
    const { content, editedWordIndex } = this.state
    const { synonyms } = this.props

    return (
      <div className="text-editor">
        {content.map((word, wordIndex) => (
          <span
            key={wordIndex}
            className="word"
            style={this.getWordStyles(wordIndex)}
            onContextMenu={e => this.handleContextMenuOpening(wordIndex, e)}
          >
            {word.value}
            {editedWordIndex === wordIndex && (
              <TextEditorContextMenu
                synonyms={synonyms}
                onToggleStyle={styleKey => this.handleToggleStyle(wordIndex, styleKey)}
                onClickOutside={this.handleClickOutside}
                onClickSynonym={this.handleClickSynonym}
              />
            )}
            <span>&nbsp;</span>
          </span>
        ))}
      </div>
    )
  }
}

TextEditor.propTypes = {
  text: PropTypes.string,
  synonyms: PropTypes.arrayOf(PropTypes.string),
  onSelectWord: PropTypes.func,
}

TextEditor.defaultProps = {
  text: '',
  synonyms: [],
  onSelectWord: () => {},
}
export default TextEditor
