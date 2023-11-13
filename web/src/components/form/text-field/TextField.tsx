import './TextField.css';

type Props = {
  label: string;
  name: string;
  type: string;
  register: any;
  errors: any;
};

export const TextField = (props: Props) => {
  return (
    <div>
      <label htmlFor={props.name} className="form-label text-primary ">
        {props.label}
      </label>
      <input type={props.type} id={props.name} {...props.register} className="form-control" />
      {props.errors[props.name] && <span>{props.errors[props.name].message}</span>}
    </div>
  );
};
