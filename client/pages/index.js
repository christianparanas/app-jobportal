import { useState, useEffect } from "react";

import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import { JobCard } from "../components";

import { catchErrors, getPreviewJobs } from "../utils";

export default function Home() {
  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getPreviewJobs({
        host: "https://ph.indeed.com/jobs?",
        query: "HTML",
        location: "Manila",
        radius: "5",
      });

      setJobs(data)
      console.log(data);
    };

    catchErrors(fetchJobs());
  }, []);

  if(!jobs) return <>Loading</>

  return (
    <div>
      {jobs ? (
        <Grid container spacing={1} p={2}>
          {jobs.map((job, key) => (
            <Grid item xs={12}>
              <JobCard props={job} key={key} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={1} p={2}>
          {[...Array(10)].map((x, key) => (
            <Grid item xs={12}>
              <Skeleton
                key={key}
                variant="rectangular"
                width={210}
                height={118}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

Home.getInitialProps = async (ctx) => {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const json = await res.json()
  return { stars: json.stargazers_count }
}
