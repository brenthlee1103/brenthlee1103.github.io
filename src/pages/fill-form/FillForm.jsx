import { useState, useEffect } from "react";

import PageHeader from "@/components/page-header/PageHeader";

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
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

function FillForm() {
  const [formData, setFormData] = useState({
    email: "",
    date: dayjs().add(5, "day").format("MM-DD-YYYY"),
    earliest: "10:00",
    latest: "15:00",
    players: 4,
  });
  const [rows, setRows] = useState([]);

  useEffect(() => {
    document.title = "SC Muni Golf Tee Times";
  }, []);

  useEffect(() => {
    const sheetId = "1kgNJbMRkDp_9Zy0KStSUATVEqas60YSomTiUPM_NHV4";
    const gid = "0"; // tab ID
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&tq&gid=${gid}`;

    fetch(url)
      .then((res) => res.text())
      .then((text) => {
        const json = JSON.parse(text.substring(47).slice(0, -2));
        const data = json.table.rows.map((r) =>
          r.c.map((cell) => (cell ? cell.v : ""))
        );
        console.log(data);
        setRows(data);
      });
  }, []);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
  }

  const fromMMDDYYYY = (str) => (str ? dayjs(str, "MM-DD-YYYY") : null);
  const fromHHmm = (str) => (str ? dayjs(str, "HH:mm") : null);

  return (
    <div className="page">
      <PageHeader name="San Clemente Municipal Golf Course Tee Time Reservations" />
      <h2>Instructions</h2>
      <ol>
        <li>Fill out the form</li>
        <li>Hit the "Submit" button</li>
        <li>
          Wait for confirmation - You will receive two emails:
          <ol>
            <li>
              Right now - confirmation saying you are trying to book this tee
              time
            </li>
            <li>Later - when it is actually booked</li>
          </ol>
        </li>
      </ol>
      <Box
        component="form"
        onSubmit={(event) => handleSubmit(event)}
        className="tee-time-form"
      >
        <div className="row">
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            required={true}
            // error={() => isValidEmail()}
            // helperText={"Not a valid email"}
            onChange={handleInputChange}
            fullWidth
          />
        </div>
        <div className="row">
          <DatePicker
            label="Date"
            value={fromMMDDYYYY(formData.date)}
            onChange={(newDate) =>
              setFormData((prev) => ({ ...prev, date: newDate }))
            }
            slotProps={{
              textField: {
                fullWidth: true,
                required: true,
              },
            }}
          />
        </div>
        <div className="row">
          <TimePicker
            label="Earliest Tee Time"
            views={["hours", "minutes"]}
            format="hh:mm a"
            value={fromHHmm(formData.earliest)}
            onChange={(val) => {
              setFormData((prev) => ({
                ...prev,
                earliest: val ? val.format("HH:mm") : "",
              }));
            }}
            slotProps={{ textField: { fullWidth: true, required: true } }}
          />
          <TimePicker
            label="Latest Tee Time"
            views={["hours", "minutes"]}
            format="hh:mm a"
            value={fromHHmm(formData.latest)}
            onChange={(val) => {
              setFormData((prev) => ({
                ...prev,
                latest: val ? val.format("HH:mm") : "",
              }));
            }}
            slotProps={{ textField: { fullWidth: true, required: true } }}
          />
          {/* </div>
        <div className="row"> */}
          <FormControl fullWidth required>
            <InputLabel id="num-players-select-label"># Players</InputLabel>
            <Select
              labelId="num-players-select-label"
              id="num-players-select"
              value={formData.players}
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
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </div>
      </Box>
    </div>
  );
}

export default FillForm;
