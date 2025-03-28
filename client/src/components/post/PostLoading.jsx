import React from "react";
import ContentLoading from "../shared/ContentLoading";

const PostLoading = ({ projects }) => {
  const placeholderCount = 3;

  const validProjects = Array.isArray(projects) ? projects : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 items-center justify-center gap-10 pt-10 pb-7 w-full md:w-11/12 2xl:w-full m-auto">
      {validProjects.length > 0
        ? validProjects.map((project) => (
            <ContentLoading project={project} key={project._id} />
          ))
        : Array.from({ length: placeholderCount }).map((_, index) => (
            <ContentLoading key={index} />
          ))}
    </div>
  );
};

export default PostLoading;
