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
            <div className="IOSSwitch">
                <input
                    checked={isON}
                    onChange={onToggle}
                    className="reactSwitchCheckbox"
                    id="reactSwitchNew"
                    type="checkbox"
                />
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label
                    style={{ background: isON && ONColor }}
                    className="reactSwitchLabel"
                    htmlFor="reactSwitchNew"
                >
                    <span className="reactSwitchButton" />
                </label>
            </div>
        </>
    );
}

export default IOSSwitch;
