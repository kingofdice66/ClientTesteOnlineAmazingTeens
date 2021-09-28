import React from "react";
import "./IOSSwitch.scss";

interface IProps {
    isON: boolean;
    onToggle: () => void;
    ONColor: string;
}

/**
 * @prop {boolean} isON - Specifies if the switch is on or off.
 * @prop {function} onToggle - Sets the 'isON' value true or false depending if the toggle is on or off. True for on and false for off.
 * @prop {string} ONColor - Set the color of the switch when it is on.
 */
function IOSSwitch(props: IProps): JSX.Element {
    const { isON, onToggle, ONColor } = props;

    return (
        <>
            {/**
             * //! ATTENTION: Don't use 'htmlFor' in the label otherwise the checkbox won't function properly.
             */}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="switch">
                <input
                    type="checkbox"
                    onChange={onToggle}
                    checked={isON}
                    className="checkbox"
                />
                <span
                    className="slider round"
                    style={{ backgroundColor: isON && ONColor }}
                />
            </label>
        </>
    );
}

export default IOSSwitch;
