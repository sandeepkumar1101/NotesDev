import {
  AddOutlined,
  DeleteOutlineOutlined,
  EditOutlined,
} from "@mui/icons-material";
import { Typography, Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const AddNotes = ({ setIsAddClicked }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // handle form submission
    console.log("Title:", title);
    console.log("Content:", content);

    const data = await fetch("http://localhost:5178/notes/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });

    const response = await data.json();
    console.log(response);

    setTitle("");
    setContent("");
    setIsAddClicked(false);
  };
  return (
    // make the background blury and add a form to add notes
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          width: "400px",
          height: "fit-content",
          position: "absolute",
          top: 50,
          backgroundColor: "grey.800",
          borderRadius: 1,
          padding: 2,
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box>
            <Typography variant="h6">Add Notes</Typography>
          </Box>
          <TextField
            label="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            multiline
            rows={4}
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

const EditNotes = ({ setIsEditClicked, id }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [note, setNote] = useState({});

  useEffect(() => {
    const getNote = async () => {
      const data = await fetch(`http://localhost:5178/notes/get/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await data.json();
      console.log(response);
      setNote(response);
      setTitle(response.title);
      setContent(response.content);
    };
    getNote();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = await fetch(`http://localhost:5178/notes/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });

    const response = await data.json();
    setTitle("");
    setContent("");
    setIsEditClicked(false);
  };
  return (
    // make the background blury and add a form to add notes
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          width: "400px",
          height: "fit-content",
          position: "absolute",
          top: 50,
          backgroundColor: "grey.800",
          borderRadius: 1,
          padding: 2,
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box>
            <Typography variant="h6">Update Notes</Typography>
          </Box>
          <TextField
            label="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            multiline
            rows={4}
          />
          <Button type="submit" variant="contained" color="primary">
            Update
          </Button>
        </form>
      </Box>
    </Box>
  );
};

const DashBoard = () => {
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);

  useEffect(() => {
    const Allnotes = async () => {
      setLoading(true);
      const data = await fetch("http://localhost:5178/notes/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await data.json();
      console.log(response);
      return response;
    };
    Allnotes().then((response) => {
      setNotes(response);
      setLoading(false);
    });
  }, [isAddClicked, isEditClicked]);

  return (
    <Box
      sx={{
        margin: "0 4rem",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
        }}
      >
        {isAddClicked && (
          <AddNotes
            setIsAddClicked={(prev) => {
              setIsAddClicked(prev);
            }}
          />
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Add Notes </Typography>
        <Button
          onClick={() => {
            setIsAddClicked(!isAddClicked);
          }}
          variant="contained"
        >
          Add
        </Button>
      </Box>
      {/* notes are here */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        {notes &&
          notes.map((note) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "280px",
                height: "200px",
                padding: 1,
                bgcolor: "grey.800",
                borderRadius: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {isEditClicked && (
                  <EditNotes
                    setIsEditClicked={(prev) => {
                      setIsEditClicked(prev);
                    }}
                    id={note._id}
                  />
                )}

                <Typography variant="h6">{note.title}</Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                  }}
                >
                  <EditOutlined
                    onClick={() => {
                      setIsEditClicked(!isEditClicked);
                    }}
                    sx={{
                      color: "green",
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                  />
                  <DeleteOutlineOutlined
                    onClick={async () => {
                      await fetch(
                        `http://localhost:5178/notes/delete/${note._id}`,
                        {
                          method: "DELETE",
                          headers: {
                            "Content-Type": "application/json",
                          },
                        }
                      ).then((response) => {
                        setIsDeleteClicked(!isDeleteClicked);
                      });
                      const updatedNotes = notes.filter(
                        (item) => item._id !== note._id
                      );
                      setNotes(updatedNotes);
                    }}
                    sx={{
                      color: "red",
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                  />
                </Box>
              </Box>
              {/* content */}
              <Box
                sx={{
                  overflow: "hidden",
                }}
              >
                <p
                  style={{
                    // make text to wrap
                    wordWrap: "break-word",
                  }}
                >
                  {note.content}
                </p>
              </Box>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default DashBoard;
