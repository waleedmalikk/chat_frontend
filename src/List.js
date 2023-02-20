import * as React from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function ChatList({ msgArr }) {
  useEffect(() => {}, [msgArr]);

  function generator() {
    return Array.from({ length: msgArr.length }).map((_, index) => (
      <ListItem key={msgArr[index].timeStamp2} disablePadding>
        <ListItemText
          primary={
            msgArr[index].username +
            ":" +
            msgArr[index].msgBody +
            "    (" +
            msgArr[index].timeStamp +
            ")"
          }
        />
      </ListItem>
    ));
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 435,
        height: 100,
        bgcolor: "pink",
        overflow: "auto",
      }}
    >
      <List>{generator()}</List>
    </Box>
  );
}
