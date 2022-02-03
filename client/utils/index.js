import { getPreviewJobs } from "./api";

const catchErrors = (fn) => {
  return function (...args) {
    return fn(...args).catch((err) => {
      console.log(err);
    });
  };
};

module.exports = {
  getPreviewJobs,
  catchErrors,
};
