import { useState, useEffect } from "react";
import { Typography, Paper, Container, Grid, Skeleton } from '@mui/material';

// components
import { JobCard } from "../components";

// utils
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

  return (
    <div>
      {jobs ? (
        <Grid container spacing={1} p={2}>
          {jobs.map((job, key) => (
            <Grid item xs={12} key={key}>
              <JobCard props={job} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={1} p={2}>
          {[...Array(10)].map((x, key) => (
            <Grid item xs={12} key={key}>
              <Skeleton
                variant="rectangular"
                height={118}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}