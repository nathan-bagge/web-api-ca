import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, Controller } from "react-hook-form";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const ratings = [
  { value: 5, label: "Excellent" },
  { value: 4, label: "Good" },
  { value: 3, label: "Average" },
  { value: 2, label: "Poor" },
  { value: 0, label: "Terrible" },
];

const styles = {
  root: {
    marginTop: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  form: {
    width: "100%",
    "& > * ": {
      marginTop: 2,
    },
  },
  textField: {
    width: "40ch",
  },
  submit: {
    marginRight: 2,
  },
  buttons: {
    display: "flex",
    gap: 2,
    marginTop: 2,
  },
  snack: {
    width: "50%",
    "& > * ": {
      width: "100%",
    },
  },
};

const defaultValues = {
  author: "",
  review: "",
  agree: false,
  rating: 3,
};

const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(defaultValues.rating);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const handleSnackClose = () => {
    setOpen(false);
    navigate("/movies/favorites");
  };

  const handleFormSubmit = async (data) => {
    await onSubmit({ rating, reviewText: data.review });
    setOpen(true);
  };

  return (
    <Box component="div" sx={styles.root}>
      <Typography component="h2" variant="h3">
        Write a review
      </Typography>

      <Snackbar
        sx={styles.snack}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={handleSnackClose}
      >
        <MuiAlert
          severity="success"
          variant="filled"
          onClose={handleSnackClose}
        >
          <Typography variant="h4">
            Thank you for submitting a review
          </Typography>
        </MuiAlert>
      </Snackbar>

      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <Controller
          name="author"
          control={control}
          rules={{ required: "Name is required" }}
          defaultValue=""
          render={({ field }) => (
            <TextField
              sx={{ width: styles.textField }}
              variant="outlined"
              margin="normal"
              required
              {...field}
              label="Author's name"
              autoFocus
            />
          )}
        />
        {errors.author && (
          <Typography variant="h6" component="p">
            {errors.author.message}
          </Typography>
        )}
        <Controller
          name="review"
          control={control}
          rules={{
            required: "Review cannot be empty.",
            minLength: { value: 10, message: "Review is too short" },
          }}
          render={({ field }) => (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="review"
              {...field}
              label="Review text"
              id="review"
              multiline
              minRows={10}
            />
          )}
        />
        {errors.review && (
          <Typography variant="h6" component="p">
            {errors.review.message}
          </Typography>
        )}

        <TextField
          id="select-rating"
          select
          variant="outlined"
          label="Rating Select"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          helperText="Don't forget your rating"
        >
          {ratings.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <Box sx={styles.buttons}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={styles.submit}
          >
            Submit
          </Button>
          <Button
            type="reset"
            variant="contained"
            color="secondary"
            sx={styles.submit}
            onClick={() => {
              reset(defaultValues);
              setRating(defaultValues.rating);
            }}
          >
            Reset
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ReviewForm;
