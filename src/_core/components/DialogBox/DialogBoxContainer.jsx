import { useContext } from "react";
import { DialogBoxPlaceholder } from ".";
import { DialogBoxContext } from "../../providers/DialogBoxContext";

export const DialogBoxContainer = () => {
  let DialogBox = useContext(DialogBoxContext);

  return (
    DialogBox.stack.map((args, i) => <DialogBoxPlaceholder key={i} {...args} />)
  )
}