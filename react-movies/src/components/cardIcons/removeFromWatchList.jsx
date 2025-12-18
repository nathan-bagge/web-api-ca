import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromWatchListIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleRemoveFromMustWatch = () => {
    context.removeFromMustWatch(movie);
  };

  return (
    <IconButton
      aria-label="remove from watch list"
      onClick={handleRemoveFromMustWatch}
    >
      <PlaylistRemoveIcon color="secondary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromWatchListIcon;
