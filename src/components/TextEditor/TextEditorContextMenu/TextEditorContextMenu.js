import React, { Component } from 'react'
import enhanceWithClickOutside from 'react-click-outside'
import PropTypes from 'prop-types'
import './TextEditorContextMenu.scss'

class TextEditorContextMenu extends Component {
  handleClick = styleKey => {
    const { onToggleStyle } = this.props

    onToggleStyle(styleKey)
  }

  handleClickSynonym = synonym => {
    const { onClickSynonym } = this.props

    onClickSynonym(synonym)
  }

  handleClickOutside() {
    const { onClickOutside } = this.props

    onClickOutside()
  }

  render() {
    const { synonyms } = this.props

    return (
      <div className="context-menu">
        <div className="context-menu__styles">
          <button
            type="button"
            className="styles-item styles-item--bold"
            onClick={() => this.handleClick('bold')}
          >
            Bold
          </button>
          <button
            type="button"
            className="styles-item styles-item--italic"
            onClick={() => this.handleClick('italic')}
          >
            Italic
          </button>
          <button
            type="button"
            className="styles-item styles-item--underline"
            onClick={() => this.handleClick('underline')}
          >
            Underline
          </button>
        </div>
        <div className="context-menu__synonyms">
          {synonyms.map(synonym => (
            <button
              type="button"
              key={synonym}
              className="synonyms-item"
              onClick={() => this.handleClickSynonym(synonym)}
            >
              {synonym}
            </button>
          ))}
        </div>
      </div>
    )
  }
}

TextEditorContextMenu.propTypes = {
  synonyms: PropTypes.arrayOf(PropTypes.string),
  onToggleStyle: PropTypes.func,
  onClickOutside: PropTypes.func,
  onClickSynonym: PropTypes.func,
}

TextEditorContextMenu.defaultProps = {
  synonyms: [],
  onToggleStyle: () => {},
  onClickOutside: () => {},
  onClickSynonym: () => {},
}

export default enhanceWithClickOutside(TextEditorContextMenu)
