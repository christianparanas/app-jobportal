// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const indeed = require("indeed-scraper");

const queryOptions = {
  host: "www.indeed.com",
  query: "Software",
  city: "Seattle, WA",
  radius: "25",
  level: "entry_level",
  jobType: "fulltime",
  maxAge: "7",
  sort: "date",
  limit: 5,
};

export default async function handler(req, res) {
  const data = await indeed.query(queryOptions).then((response) => {
    console.log(response);

    return response;
  });

  res.status(200).json(data);
}
