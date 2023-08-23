/* eslint-disable react/jsx-props-no-spreading */
import { Button, TextField } from "@mui/material";
import { useFieldArray } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import NestedArray from "./NestedArray";

interface IProps {
  register: any;
  control: any;
}

const Array = (props: IProps): JSX.Element => {
  const { register, control } = props;

  const { fields, append, remove } = useFieldArray({
    name: "sections",
    control,
  });

  return (
    <>
      {fields.map(
        (section, index): JSX.Element => (
          <div key={uuidv4()}>
            <TextField
              sx={{ width: 500 }}
              {...register(`sections.${index}.section` as const)}
            />

            {index > 0 && (
              <Button onClick={(): void => remove(index)}>
                Elimină Capitolul
              </Button>
            )}

            <NestedArray nestIndex={index} {...{ register, control }} />
          </div>
        )
      )}

      <Button onClick={(): void => append({ section: "" })}>
        Adaugă Capitol
      </Button>
    </>
  );
};

export default Array;