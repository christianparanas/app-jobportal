
import { Typography, Paper } from '@mui/material';

export default function JobCard({ props }) {
  return <Paper elevation={3} sx={{ p: 2 }}>{props.title}</Paper>;
}
