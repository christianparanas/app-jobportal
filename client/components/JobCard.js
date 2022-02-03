import { Typography, Paper } from "@mui/material";
import styled from 'styled-components'

const Title = styled.h3`
  margin: 0;
`

const Paragraph = styled.p`
  margin: 0;
`

const SalaryContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #e6e6e6;
  width: fit-content;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 600;
`


export default function JobCard({ props }) {
  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Title>{props.title}</Title>
      <Paragraph>{props.companyName}</Paragraph>
      <Paragraph>{props.companyLocation}</Paragraph>
      <SalaryContainer>
        <i className="fal fa-money-bill-alt"></i>
        <Paragraph>{props.salary}</Paragraph>
      </SalaryContainer>
    </Paper>
  );
}
