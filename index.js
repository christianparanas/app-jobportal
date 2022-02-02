const logger = require("morgan");
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");

const app = express();

const PORT = process.env.PORT || 3000;

const scrape = async () => {
  try {
    const { data } = await axios.get("https://ph.indeed.com/jobs?q=IT");

    const $ = cheerio.load(data);

    const jobList = $(".job_seen_beacon");
    const jobs = [];

    jobList.each((idx, el) => {
      const job = {};

      job.title = $(el).find(".jobTitle span").text();
      job.companyName = $(el).find(".companyName").text();
      job.companyLocation = $(el).find(".companyLocation").text() || $(el).find(".companyLocation span").text();
      job.salary = $(el).find(".salary-snippet span").text();

      // get job snippet
      const jobSnippet = $(el).find(".job-snippet ul li")
      const jobSnippets = []

      jobSnippet.each((idx, element) => {
        jobSnippets.push($(element).text())
      })
      job.snippet = jobSnippets

      job.isEasilyApply = $(el).find(".iaTextBlack").text();
      job.isUrgentHiring = ($(el).find(".shelfItem .urgentlyHiring").text() ? true : false)
      job.datePosted = $(el).find(".date").text();

      jobs.push(job);
    });

    console.dir(jobs);
  } catch (err) {
    console.error(err);
  }
};

scrape();

app.listen(PORT, () => console.log(`App started on port ${PORT}.`));
