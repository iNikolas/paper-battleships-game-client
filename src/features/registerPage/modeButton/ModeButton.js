import React from "react"

const ModeButton = ({question, suggestion, handler}) => {
    return <span>
                {question + " "}
        <button
            type="button"
            className="link-button"
            onClick={handler}
        >
            {suggestion}
                </button>
              </span>
}

export default ModeButton