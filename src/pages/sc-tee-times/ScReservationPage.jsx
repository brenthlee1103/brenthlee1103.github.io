import { useState, useEffect, useRef } from "react";

import DynamicTable from "@/components/sc-tee-times-page/dynamic-table/DynamicTable";
import PageHeader from "@/components/sc-tee-times-page/page-header/PageHeader";
import FillForm from "@/components/sc-tee-times-page/fill-form/FillForm";
import ModalForm from "@/components/sc-tee-times-page/modal-form/ModalForm";
import ClickMenu from "@/components/sc-tee-times-page/click-menu/ClickMenu";
import Snackbar from "@mui/material/Snackbar";

import "./sc-reservation-page.scss";
import { useMediaQuery, useTheme } from "@mui/material";

import dayjs from "dayjs";

function useIsMobile() {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down("md"));
}

const initialForm = {
  email: "",
  date: dayjs().add(5, "day").format("MM-DD-YYYY"),
  earliest: "10:00",
  latest: "15:00",
  players: 4,
};
function ScReservationPage() {
  const [formData, setFormData] = useState(initialForm);
  const [popupFormData, setPopupFormData] = useState(initialForm);
  const [rows, setRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  // const [currentRowIndex, setCurrentRowIndex] = useState(null);

  const didInit = useRef(false);
  const loading = useRef(true);
  const running = useRef(false);

  const isMobile = useIsMobile();

  useEffect(() => {
    document.title = "SC Muni Golf Tee Times";
  }, []);

  useEffect(() => {
    if (didInit.current) {
      return;
    }
    didInit.current = true;
    async function getData() {
      const res = await fetch("https://gapps-proxy.brenthlee.workers.dev/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify(formData),
      });
      const data = await res.json();
      loading.current = false;
      setRows(data);
      return data;
      // loading.current = false;
      // const forcedTmpData = [
      //   {
      //     email: "brenthlee@gmail.com",
      //     date: "12-29-2025",
      //     earliest: "01:00",
      //     latest: "23:00",
      //     players: "2",
      //   },
      //   {
      //     email: "brenthlee@gmail.com",
      //     date: "12-30-2025",
      //     earliest: "01:01",
      //     latest: "23:01",
      //     players: "3",
      //   },
      //   {
      //     email: "brenthlee@gmail.com",
      //     date: "12-31-2025",
      //     earliest: "01:02",
      //     latest: "23:02",
      //     players: "4",
      //   },
      // ];
      // setRows(forcedTmpData);
    }
    getData();
  }, []);

  const [clickMenu, setClickMenu] = useState({
    open: false,
    x: 0,
    y: 0,
    index: null,
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handlePopupFormChange(event) {
    const { name, value } = event.target;
    setPopupFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmitAppend(event) {
    event.preventDefault();
    running.current = true;
    // TODO: KEEP THESE LOGS
    console.log("Adding data to the waitlist `handleSubmitAppend(event)`:");
    console.log(formData);
    // console.log(event);
    const res = await fetch(
      "https://gapps-proxy.brenthlee.workers.dev/?action=append",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );
    setFormData(initialForm);
    const data = await res.json();
    setRows(data);
    running.current = false;
  }

  async function handleSubmitEdit(event) {
    event.preventDefault();
    running.current = true;
    // console.log(popupFormData);
    // console.log(clickMenu.index);
    const tmpData = { data: { ...popupFormData }, rowIndex: clickMenu.index };
    console.log("Modified data `handleSubmitEdit(event)`:");
    console.log(tmpData);
    const res = await fetch(
      "https://gapps-proxy.brenthlee.workers.dev/?action=edit",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tmpData),
      }
    );
    setFormData(initialForm);
    const data = await res.json();
    setRows(data);
    setClickMenu((m) => ({ ...m, index: null }));
    setModalOpen(false);
    running.current = false;
  }

  const fromMMDDYYYY = (str) => (str ? dayjs(str, "MM-DD-YYYY") : null);
  const fromHHmm = (str) => (str ? dayjs(str, "HH:mm") : null);
  const toMMDDYYYY = (date) => {
    return date ? dayjs(date).format("MM-DD-YYYY") : "";
  };

  // function rowClickedData(data) {
  //   console.log(data);
  //   setPopupFormData(data);
  //   setModalOpen(true);
  // }

  // const [clickMenu, setClickMenu] = useState({
  //   open: false,
  //   x: 0,
  //   y: 0,
  //   index: null,
  // });

  const openMenu = ({ row, index, x, y }) => {
    setPopupFormData(row);
    setClickMenu({ open: true, x, y, index });
  };

  const closeMenuKeepIndex = () => {
    setClickMenu((m) => ({ ...m, open: false }));
  };
  const closeMenuDeleteIndex = () => {
    setClickMenu((m) => ({ ...m, open: false, index: null }));
  };
  // setClickMenu((m) => ({ ...m, open: false, index: null }));

  // const handleEdit = () => {
  //   setModalOpen(true);
  //   // const r = rows[clickMenu.index];
  //   // console.log("Edit row:", r);
  //   // open your modal here with r as initialValues…
  // };

  const handleToastClose = () => {
    setToastOpen(false);
  };

  const handleDelete = () => {
    console.log("Deleting data from the waitlist:");
    console.log(popupFormData);
    console.log(clickMenu.index);
    const dataDelete = {
      index: clickMenu.index,
    };
    fetch("https://gapps-proxy.brenthlee.workers.dev/?action=delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataDelete),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedIndex === 999) {
          setToastMessage("Did not delete any rows!");
        } else {
          setToastMessage(
            `Deleted waitlist for ${popupFormData.email} on ${popupFormData.date}`
          );
          setRows(data.data);
        }
        setToastOpen(true);
      });
    setClickMenu((m) => ({ ...m, index: null }));
    // setRows((prev) => prev.filter((_, i) => i !== clickMenu.index));
  };

  // async function handleSubmitAppend(event) {
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

  return (
    <div className="page">
      <PageHeader name="San Clemente Municipal Golf Course Tee Time Reservations" />
      <div className="container">
        <div className="col">
          <h2>Instructions</h2>
          <ol>
            <li>
              Fill out the form (The waitlist is for pending reservations. They
              are not made yet!)
            </li>
            <li>Hit the "Submit" button</li>
            <li>
              Wait for confirmation - You will receive two emails:
              <ol>
                <li>
                  Right now - confirmation saying you are trying to book this
                  tee time
                </li>
                <li>Later - when it is actually booked</li>
              </ol>
            </li>
            <li>
              You can make changes to the pending waitlist reservations by
              clicking on the row in the table.
            </li>
          </ol>
          <ModalForm
            open={modalOpen}
            onClose={() => {
              setModalOpen(false);
              closeMenuDeleteIndex();
              // setClickMenu((m) => ({ ...m, index: null }));
            }}
            editFormSubmitHandler={handleSubmitEdit}
            editFormOnChangeHandler={handlePopupFormChange}
            formValues={popupFormData}
          />
          <ClickMenu
            open={clickMenu.open}
            x={clickMenu.x}
            y={clickMenu.y}
            onCloseDeleteIndex={closeMenuDeleteIndex}
            onCloseKeepIndex={closeMenuKeepIndex}
            items={[
              {
                label: "Edit",
                onClick: () => {
                  setModalOpen(true);
                },
              },
              { label: "Delete", onClick: handleDelete },
            ]}
          />
          <Snackbar
            open={toastOpen}
            onClose={handleToastClose}
            autoHideDuration={3000} // 3s
            message={toastMessage}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          />
          <FillForm
            formValues={formData}
            handleCancel={null}
            handleSubmit={(event) => {
              console.log(event);
              // TODO HERE...done....just uncomment
              handleSubmitAppend(event);
            }}
            handleInputChange={handleInputChange}
          />
          {/* <Box
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
                onChange={handleInputChange}
                fullWidth
              />
            </div>
            <div className="row">
              <DatePicker
                label="Date"
                value={fromMMDDYYYY(formData.date)}
                onChange={(newDate) =>
                  setFormData((prev) => ({
                    ...prev,
                    date: toMMDDYYYY(newDate),
                  }))
                }
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true,
                    sx: {
                      "& .MuiInputLabel-root": {
                        fontSize: { xs: ".9rem", md: "1rem" },
                      },
                      "& .MuiPickersSectionList-root": {
                        fontSize: { xs: ".9rem", md: "1rem" },
                      },
                    },
                  },
                }}
              />
            </div>
            <div className="row">
              <TimePicker
                label={isMobile ? "Earliest" : "Earliest Tee Time"}
                views={["hours", "minutes"]}
                format="HH:mm"
                value={fromHHmm(formData.earliest)}
                onChange={(val) => {
                  setFormData((prev) => ({
                    ...prev,
                    earliest: val ? val.format("HH:mm") : "",
                  }));
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true,
                    sx: {
                      "& .MuiInputLabel-root": {
                        fontSize: { xs: ".9rem", md: "1rem" },
                      },
                      "& .MuiPickersSectionList-root": {
                        fontSize: { xs: ".8rem", md: "1rem" },
                      },
                    },
                  },
                }}
              />
              <TimePicker
                className="general"
                label={isMobile ? "Latest" : "Latest Tee Time"}
                views={["hours", "minutes"]}
                format="HH:mm"
                value={fromHHmm(formData.latest)}
                onChange={(val) => {
                  setFormData((prev) => ({
                    ...prev,
                    latest: val ? val.format("HH:mm") : "",
                  }));
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true,
                    sx: {
                      "& .MuiInputLabel-root": {
                        fontSize: { xs: ".9rem", md: "1rem" },
                      },
                      "& .MuiPickersSectionList-root": {
                        fontSize: { xs: ".8rem", md: "1rem" },
                      },
                    },
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
                  value={formData.players}
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
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </div>
          </Box> */}
        </div>
        <div className="col">
          <DynamicTable
            rows={rows}
            loading={loading.current}
            running={running.current}
            // rowClickedData={rowClickedData}
            onRowMenu={openMenu}
            clickMenuObj={clickMenu}
            // sameClickClose={closeMenu}
          />
        </div>
      </div>
    </div>
  );
}

export default ScReservationPage;
