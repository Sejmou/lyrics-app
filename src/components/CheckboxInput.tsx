import classNames from "classnames";
import { Checkbox, Label } from "flowbite-react";

type Props = {
  className?: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const CheckboxInput = (props: Props) => {
  return (
    <div
      className={classNames("mb-4 flex items-center gap-2", props.className)}
      // onClick={() => props.onChange(!props.checked)}
    >
      <Checkbox
        id="checkbox"
        checked={props.checked}
        onChange={(e) => props.onChange(e.target.checked)}
      />
      <Label htmlFor="checkbox">{props.label}</Label>
    </div>
  );
};

export default CheckboxInput;
