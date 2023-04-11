import style from "./IOSSwitch.module.scss";

interface IProps {
  isON: boolean;
  onToggle: () => void;
  ONColor: string;
  OFFColor: string;
}

/**
 * @prop {boolean} isON - Specifies if the switch is on or off.
 * @prop {function} onToggle - Sets the 'isON' value true or false depending if the toggle is on or off. True for on and false for off.
 * @prop {string} ONColor - Set the color of the switch when it is on.
 */
function IOSSwitch(props: IProps): JSX.Element {
  const { isON, onToggle, ONColor, OFFColor } = props;

  return (
    <>
      {/**
       * //! ATTENTION: Don't use 'htmlFor' in the label otherwise the checkbox won't function properly.
       */}
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className={style.switch}>
        <input
          type="checkbox"
          onChange={onToggle}
          checked={isON}
          className={style.checkbox}
        />
        <span
          className={style.slider}
          style={{ backgroundColor: isON ? ONColor : OFFColor }}
        />
      </label>
    </>
  );
}

export default IOSSwitch;
