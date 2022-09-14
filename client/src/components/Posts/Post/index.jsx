import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@material-ui/core";
import {
  ThumbUpAlt,
  ThumbUpAltOutlined,
  Delete,
  MoreHoriz,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";

import useStyles from "./styles";

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector(
    (state) =>
      state.auth.authData?.result._id || state.auth.authData?.result.googleId
  );

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase className={classes.cardAction} onClick={openPost}>
        <CardMedia
          className={classes.media}
          image={post.selectedFile}
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div className={classes.overlay2}>
          {post.creator === userId && (
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={() => {
                setCurrentId(post._id);
              }}
            >
              <MoreHoriz fontSize="medium" />
            </Button>
          )}
        </div>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <CardContent>
          <Typography
            className={classes.title}
            variant="h5"
            color="textSecondary"
            gutterBottom
          >
            {post.title}
          </Typography>
          <Typography
            className={classes.message}
            variant="h5"
            color="textSecondary"
            gutterBottom
          >
            {post.message}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            dispatch(likePost(post._id));
          }}
        >
          {post.likes.includes(userId) ? (
            <ThumbUpAlt size="small" />
          ) : (
            <ThumbUpAltOutlined size="small" />
          )}
          {"Like "}
          {post.likes.length}
        </Button>
        {post.creator === userId && (
          <Button
            size="small"
            color="primary"
            onClick={() => {
              dispatch(deletePost(post._id));
            }}
          >
            <Delete size="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
