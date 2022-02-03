import { useEffect } from "react";
import useSWR from "swr";

import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import { JobCard } from "../components";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR("/api/data", fetcher);

  if (error) return <div>Failed...</div>;

  console.log(data);

  return (
    <div>
      {data ? (
        <Grid container spacing={1} p={2}>
          {data.map((job, key) => (
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
