type Props = {
  label: string;
  name: string;
  multiple: boolean;
  options: { key: string; displayText: string }[];
  register: any;
  errors: any;
  disabled?: boolean;
};

export const SelectField = (props: Props) => {
  const options = props.options.map((option) => {
    return (
      <option key={option.key} value={option.key}>
        {option.displayText}
      </option>
    );
  });

  return (
    <div>
      <label htmlFor={props.name} className="form-label text-primary ">
        {props.label}
      </label>
      <select
        className="form-select"
        id={props.name}
        multiple={props.multiple}
        {...props.register}
        disabled={props.disabled}
      >
        {options}
      </select>
    </div>
  );
};
