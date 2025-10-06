import { useState, useEffect, useRef } from "react";

// import DynamicTable from "@/components/dynamic-table/DynamicTable";
// import PageHeader from "@/components/page-header/PageHeader";

import "./fill-form.scss";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";

import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

function useIsMobile() {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down("md"));
}

// const initialForm = {
//   email: "",
//   date: dayjs().add(5, "day").format("MM-DD-YYYY"),
//   earliest: "10:00",
//   latest: "15:00",
//   players: 4,
// };
function FillForm({
  formValues,
  handleCancel,
  handleSubmit,
  handleInputChange,
}) {
  // const [formData, setFormData] = useState(formValues || initialForm);
  // const [rows, setRows] = useState([]);

  // const didInit = useRef(false);
  // const loading = useRef(true);
  // const running = useRef(false);

  const isMobile = useIsMobile();

  // useEffect(() => {
  //   document.title = "SC Muni Golf Tee Times";
  // }, []);

  // useEffect(() => {
  //   if (didInit.current) {
  //     return;
  //   }
  //   didInit.current = true;
  //   async function getData() {
  //     const res = await fetch("https://gapps-proxy.brenthlee.workers.dev/", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       // body: JSON.stringify(formData),
  //     });
  //     const data = await res.json();
  //     loading.current = false;
  //     setRows(data);
  //     return data;
  //   }
  //   getData();
  // }, []);

  // function handleInputChange(event) {
  //   const { name, value } = event.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // }

  // async function handleSubmit(event) {
  //   event.preventDefault();
  //   running.current = true;
  //   const res = await fetch(
  //     "https://gapps-proxy.brenthlee.workers.dev/?action=append",
  //     {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(formData),
  //     }
  //   );
  //   setFormData(initialForm);
  //   const data = await res.json();
  //   setRows(data);
  //   running.current = false;
  // }

  // function handleCancel(event) {
  //   console.log(event);
  // }

  // function handleDelete(event) {
  //   console.log(event);
  // }

  // function handleSubmit(event) {
  //   console.log(event);
  // }

  const fromMMDDYYYY = (str) => (str ? dayjs(str, "MM-DD-YYYY") : null);
  const fromHHmm = (str) => (str ? dayjs(str, "HH:mm") : null);
  const toMMDDYYYY = (date) => {
    return date ? dayjs(date).format("MM-DD-YYYY") : "";
  };

  // function rowClickedData(data) {
  //   console.log(data);
  // }

  // const formData = formValues || { email: "" };

  return (
    <form className="tee-time-form" onSubmit={handleSubmit}>
      <div className="row">
        <TextField
          label="Email"
          name="email"
          value={formValues.email}
          required={true}
          onChange={handleInputChange}
          fullWidth
        />
      </div>
      <div className="row">
        <DatePicker
          label="Date"
          value={fromMMDDYYYY(formValues.date)}
          onChange={
            (newDate) => {
              const event = {
                target: {
                  name: "date",
                  value: toMMDDYYYY(newDate),
                },
              };
              handleInputChange(event);
            }
            // setFormData((prev) => ({
            //   ...prev,
            //   date: toMMDDYYYY(newDate),
            // }))
          }
          slotProps={{
            textField: {
              fullWidth: true,
              required: true,
              // sx: {
              //   "& .MuiInputLabel-root": {
              //     fontSize: { xs: ".9rem", md: "1rem" },
              //   },
              //   "& .MuiPickersSectionList-root": {
              //     fontSize: { xs: ".9rem", md: "1rem" },
              //   },
              // },
            },
          }}
          disablePast
        />
      </div>
      <div className="row">
        <TimePicker
          label={isMobile ? "Earliest" : "Earliest Tee Time"}
          views={["hours", "minutes"]}
          format="HH:mm"
          value={fromHHmm(formValues.earliest)}
          onChange={(val) => {
            handleInputChange({
              target: {
                value: val ? val.format("HH:mm") : "",
                name: "earliest",
              },
            });
            // setFormData((prev) => ({
            //   ...prev,
            //   earliest: val ? val.format("HH:mm") : "",
            // }));
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              required: true,
              // sx: {
              //   "& .MuiInputLabel-root": {
              //     fontSize: { xs: ".9rem", md: "1rem" },
              //   },
              //   "& .MuiPickersSectionList-root": {
              //     fontSize: { xs: ".8rem", md: "1rem" },
              //   },
              // },
            },
          }}
        />
        <TimePicker
          className="general"
          label={isMobile ? "Latest" : "Latest Tee Time"}
          views={["hours", "minutes"]}
          format="HH:mm"
          value={fromHHmm(formValues.latest)}
          onChange={(val) => {
            handleInputChange({
              target: {
                value: val ? val.format("HH:mm") : "",
                name: "latest",
              },
            });
            // setFormData((prev) => ({
            //   ...prev,
            //   latest: val ? val.format("HH:mm") : "",
            // }));
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              required: true,
              // sx: {
              //   "& .MuiInputLabel-root": {
              //     fontSize: { xs: ".9rem", md: "1rem" },
              //   },
              //   "& .MuiPickersSectionList-root": {
              //     fontSize: { xs: ".8rem", md: "1rem" },
              //   },
              // },
            },
          }}
        />
        <FormControl className="general" fullWidth required>
          <InputLabel id="num-players-select-label" className="general">
            # Players
          </InputLabel>
          <Select
            className="general"
            labelId="num-players-select-label"
            id="num-players-select"
            value={formValues.players}
            name="players"
            onChange={handleInputChange}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="row">
        {handleCancel && (
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        )}
        {/* <button onClick={handleSubmit}>
          Submit
        </button> */}
        <button type="submit">Submit</button>
      </div>
    </form>
    // <div className="page">
    //   <PageHeader name="San Clemente Municipal Golf Course Tee Time Reservations" />
    //   <div className="container">
    //     <div className="col">
    //       <Box
    //         component="form"
    //         onSubmit={(event) => handleSubmit(event)}
    //         className="tee-time-form"
    //       >
    //         <div className="row">
    // <TextField
    //   label="Email"
    //   name="email"
    //   value={formData.email}
    //   required={true}
    //   onChange={handleInputChange}
    //   fullWidth
    // />
    //         </div>
    //         <div className="row">
    //           <DatePicker
    //             label="Date"
    //             value={fromMMDDYYYY(formData.date)}
    //             onChange={(newDate) =>
    //               setFormData((prev) => ({
    //                 ...prev,
    //                 date: toMMDDYYYY(newDate),
    //               }))
    //             }
    //             slotProps={{
    //               textField: {
    //                 fullWidth: true,
    //                 required: true,
    //                 sx: {
    //                   "& .MuiInputLabel-root": {
    //                     fontSize: { xs: ".9rem", md: "1rem" },
    //                   },
    //                   "& .MuiPickersSectionList-root": {
    //                     fontSize: { xs: ".9rem", md: "1rem" },
    //                   },
    //                 },
    //               },
    //             }}
    //           />
    //         </div>
    // <div className="row">
    //   <TimePicker
    //     label={isMobile ? "Earliest" : "Earliest Tee Time"}
    //     views={["hours", "minutes"]}
    //     format="HH:mm"
    //     value={fromHHmm(formData.earliest)}
    //     onChange={(val) => {
    //       setFormData((prev) => ({
    //         ...prev,
    //         earliest: val ? val.format("HH:mm") : "",
    //       }));
    //     }}
    //     slotProps={{
    //       textField: {
    //         fullWidth: true,
    //         required: true,
    //         sx: {
    //           "& .MuiInputLabel-root": {
    //             fontSize: { xs: ".9rem", md: "1rem" },
    //           },
    //           "& .MuiPickersSectionList-root": {
    //             fontSize: { xs: ".8rem", md: "1rem" },
    //           },
    //         },
    //       },
    //     }}
    //   />
    //   <TimePicker
    //     className="general"
    //     label={isMobile ? "Latest" : "Latest Tee Time"}
    //     views={["hours", "minutes"]}
    //     format="HH:mm"
    //     value={fromHHmm(formData.latest)}
    //     onChange={(val) => {
    //       setFormData((prev) => ({
    //         ...prev,
    //         latest: val ? val.format("HH:mm") : "",
    //       }));
    //     }}
    //     slotProps={{
    //       textField: {
    //         fullWidth: true,
    //         required: true,
    //         sx: {
    //           "& .MuiInputLabel-root": {
    //             fontSize: { xs: ".9rem", md: "1rem" },
    //           },
    //           "& .MuiPickersSectionList-root": {
    //             fontSize: { xs: ".8rem", md: "1rem" },
    //           },
    //         },
    //       },
    //     }}
    //   />
    //   <FormControl className="general" fullWidth required>
    //     <InputLabel id="num-players-select-label" className="general">
    //       # Players
    //     </InputLabel>
    //     <Select
    //       className="general"
    //       labelId="num-players-select-label"
    //       id="num-players-select"
    //       value={formData.players}
    //       name="players"
    //       onChange={handleInputChange}
    //     >
    //       <MenuItem value={1}>1</MenuItem>
    //       <MenuItem value={2}>2</MenuItem>
    //       <MenuItem value={3}>3</MenuItem>
    //       <MenuItem value={4}>4</MenuItem>
    //     </Select>
    //   </FormControl>
    // </div>
    // <div className="row">
    //   <Button type="submit" variant="contained">
    //     Submit
    //   </Button>
    // </div>
    //       </Box>
    //     </div>
    //     <div className="col">
    //       <DynamicTable
    //         rows={rows}
    //         loading={loading.current}
    //         running={running.current}
    //         rowClickedData={rowClickedData}
    //       />
    //     </div>
    //   </div>
    // </div>
  );
}

export default FillForm;
