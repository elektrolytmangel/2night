const getErrorMessage = (errors: any, name: string) => {
  if (!errors) {
    return;
  }

  const splitedName = name.split('.');
  if (splitedName.length === 1) {
    return errors[name]?.message;
  } else if (splitedName.length === 2) {
    return errors[splitedName[0]]?.[splitedName[1]]?.message;
  } else if (splitedName.length === 3) {
    return errors[splitedName[0]]?.[splitedName[1]]?.[splitedName[2]]?.message;
  }
};

type Props = {
  errors?: any;
  name?: string;
};

export const ErrorText = (props: Props) => {
  if (!props.errors || !props.name) {
    return null;
  }
  const errorMessage = getErrorMessage(props.errors, props.name);

  return (
    <div>
      {errorMessage && (
        <span className="text-primary ">
          <small>
            <em>{errorMessage}</em>
          </small>
        </span>
      )}
    </div>
  );
};
