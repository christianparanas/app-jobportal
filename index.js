const logger = require("morgan");
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");
const querystring = require("querystring");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const queryData = (data) => {
  const query = querystring.stringify({
    q: data.query,
    l: data.location,
  });

  return {
    query,
    host: data.host,
  };
};

const loopThru = ($, arr) => {
  const itemArr = [];

  arr.each((idx, element) => {
    itemArr.push($(element).text());
  });

  return itemArr;
};

const scrapeJobs = async (queryObj) => {
  try {
    const que = queryData({
      host: queryObj.host,
      query: queryObj.query,
      location: queryObj.location,
    });

    console.log(`${que["host"]}${que["query"]}`);

    const { data } = await axios.get(`${que["host"]}${que["query"]}`);

    const $ = cheerio.load(data);
    const jobList = $(".job_seen_beacon");
    const jobs = [];

    jobList.each((idx, el) => {
      const job = {};

      job.title = $(el).find(".jobTitle span").text();
      job.companyName = $(el).find(".companyName").text();
      job.companyLocation =
        $(el).find(".companyLocation").text() ||
        $(el).find(".companyLocation span").text();
      job.salary =
        $(el).find(".salary-snippet span").text() || "Salary Unavailable.";

      // get job snippet
      job.snippet = loopThru($, $(el).find(".job-snippet ul li"));

      job.isEasilyApply = $(el).find(".iaTextBlack").text();
      job.isUrgentHiring = $(el).find(".shelfItem .urgentlyHiring").text()
        ? true
        : false;
      job.datePosted = $(el).find(".date").text();

      jobs.push(job);
    });

    return jobs;
  } catch (err) {
    return err;
  }
};

app.post("/", async (req, res) => {
  const jobs = await scrapeJobs(req.body);

  res.status(200).json(jobs);
});

app.listen(PORT, () => console.log(`App started on port ${PORT}.`));
