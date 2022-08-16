import React from "react";
import { Link } from "gatsby";
import dateFormat from "dateformat";
import { Divider } from "@mui/material";

const NewsItem = (props) => {
  return (
    <div className={"post"}>
      <div className={"post--date"}>
        {dateFormat(props.date, "dd.mm")}
      </div>
      <div className={"post--title"}>
        <h4><Link to={`${props.id}`}>
          {props.title}
        </Link>
        </h4>
      </div>
      <div className="d_f">
        {props.image !== null ? (
          <div className={"post--image"}><img src={props.image} alt="{post.title}" /></div>) : null}
        <div className={"post--content"} dangerouslySetInnerHTML={{ __html: props.text }}></div>
      </div>
      <Divider />
    </div>
  );
};

export default NewsItem;