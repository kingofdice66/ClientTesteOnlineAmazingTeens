/* eslint-disable react/jsx-props-no-spreading */
import { Button, TextField } from "@mui/material";
import { useFieldArray } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

interface IProps {
  register: any;
  control: any;
  nestIndex: number;
}

const NestedArray = (props: IProps): JSX.Element => {
  const { register, control, nestIndex } = props;

  const { fields, append, remove } = useFieldArray({
    name: `sections.${nestIndex}.subsections`,
    control,
  });

  return (
    <>
      {fields.map(
        (subsection, index): JSX.Element => (
          <div key={uuidv4()}>
            <TextField
              {...register(
                `sections.${nestIndex}.subsections.${index}.subsection` as const
              )}
            />

            <Button
              sx={{ whiteSpace: "nowrap" }}
              onClick={(): void => remove(index)}
            >
              Elimină Subcapitolul
            </Button>
          </div>
        )
      )}

      <Button
        sx={{ whiteSpace: "nowrap" }}
        onClick={(): void => append({ subsection: "" })}
      >
        Adaugă Subcapitol
      </Button>
    </>
  );
};

export default NestedArray;
