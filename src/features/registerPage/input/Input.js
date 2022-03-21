import React from "react"
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const Input = ({className, labelText, handler, value, type, showOverlay, id, withOverlay}) => {

    const input = <input
        className={className}
        onChange={handler}
        value={value}
        maxLength="20"
        required
        id={id}
        type={type}
    />

    return (
        <div className="input-group">
            <label htmlFor={id}>{labelText}</label>
            {withOverlay ? <OverlayTrigger
                placement="top"
                show={showOverlay}
                overlay={(props) => (
                    <Tooltip
                        className="passwords-tooltip"
                        id="button-tooltip"
                        {...props}
                    >
                        Passwords do not match
                    </Tooltip>
                )}
            >
                {input}
            </OverlayTrigger> : input}
        </div>
    )
}

export default Input