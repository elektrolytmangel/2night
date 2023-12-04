import { ErrorText } from '../error-text/ErrorText';

type Props = {
  label?: string;
  name: string;
  type: string;
  register: any;
  errors?: any;
  disabled?: boolean;
};

export const TextField = (props: Props) => {
  return (
    <div>
      <label htmlFor={props.name} className="form-label text-primary" style={{ display: !props.label ? 'none' : '' }}>
        {props.label}
      </label>
      <input type={props.type} id={props.name} {...props.register} disabled={props.disabled} className="form-control" />
      <ErrorText errors={props.errors} name={props.name} />
    </div>
  );
};
