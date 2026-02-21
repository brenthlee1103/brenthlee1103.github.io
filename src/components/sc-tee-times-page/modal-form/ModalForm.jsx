import { useEffect, useRef, useState } from "react";
import FillForm from "../fill-form/FillForm";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

function ModalForm({
  open,
  onClose,
  editFormSubmitHandler,
  editFormOnChangeHandler,
  formValues,
}) {
  const [initTitle, setInitTitle] = useState("");
  const latestFormRef = useRef(formValues);
  // const modalEmail = useRef(formValues.email.split("@")[0]);
  // const modalDate = useRef(formValues.date);

  // const [formData, setFormData] = useState(formValues);

  useEffect(() => {
    latestFormRef.current = formValues;
  }, [formValues]);

  useEffect(() => {
    if (open) {
      const { course = "", date = "" } = latestFormRef.current ?? {};
      // const name = (email || "").split("@")[0] ?? "";
      setInitTitle(`Editing ${course} on ${date}`);
    }
  }, [open]);

  // useEffect(() => {
  //   if (open) {
  //     setInitTitle(
  //       `Editing ${formValues.email.split("@")[0]} on ${formValues.date}`
  //     );
  //   }
  // }, [open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{initTitle}</DialogTitle>
      <DialogContent dividers>
        <FillForm
          formValues={formValues}
          handleCancel={() => {
            onClose(); // To close the dialog
          }}
          handleSubmit={editFormSubmitHandler}
          handleInputChange={editFormOnChangeHandler}
          // handleSubmit={(e) => {
          //   e.preventDefault();
          //   // editFormSubmitHandler();
          //   console.log("i pushed the submit button");
          // }}
        />
      </DialogContent>
    </Dialog>
  );
}

export default ModalForm;
