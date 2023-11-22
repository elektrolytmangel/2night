type Props = {
  label?: string;
  name: string;
  register: any;
  errors: any;
  disabled?: boolean;
};

export const CheckboxField = (props: Props) => {
  return (
    <div>
      <div className="form-check">
        <input
          type="checkbox"
          id={props.name}
          {...props.register}
          disabled={props.disabled}
          className="form-check-input"
        />
        <label
          htmlFor={props.name}
          className="form-check-label text-primary"
          style={{ display: !props.label ? 'none' : '' }}
        >
          {props.label}
        </label>
      </div>
      {props.errors[props.name] && <span>{props.errors[props.name].message}</span>}
    </div>
  );
};
