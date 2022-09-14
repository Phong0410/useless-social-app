import React, { useState, useEffect } from "react";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPosts, getPostsBySearch } from "../../actions/posts";

import Posts from "../Posts";
import Form from "../Form";
import Paginate from "../Paginate";

import useStyles from "./styles";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [dispatch]);

  const searchPosts = () => {
    if (search.trim() || tags.length) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      navigate(`/posts/search?searchQuery=${search}&tags=${tags.join(",")}`);
    } else {
      navigate("/posts");
      dispatch(getPosts());
    }
    setSearch("");
    setTags([]);
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      searchPosts();
    }
  };

  const handleAddTag = (tag) => {
    setTags([...tags, tag]);
  };

  const handelDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <Grow in>
      <Container>
        <Grid
          container
          className={classes.gridContainer}
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={8}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} md={4}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search memories"
                fullWidth
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                onKeyUp={handleKeyUp}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAddTag}
                onDelete={handelDeleteTag}
                label="Search tags"
                variant="outlined"
              />
              <Button
                onClick={searchPosts}
                className={classes.searchButton}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper className={classes.paginate} elevation={6}>
              <Paginate page={page} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
