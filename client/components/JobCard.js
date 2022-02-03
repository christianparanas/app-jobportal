import { Typography, Paper } from "@mui/material";
import styled from "styled-components";

const Title = styled.h3`
  margin: 0;
`;

const Paragraph = styled.p`
  margin: 0;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: ${props => props.salary ? "#e6e6e6" : "#fff"};
  width: fit-content;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: ${props => props.salary ? 600 : 100 };

  i {
    color: ${props => props.salary ? "darkblue" : "" };
  }
`;

const UnorderdListContainer = styled.ul`
  padding: 0 20px;
  margin-top: 5px;
`

export default function JobCard({ props }) {
  return (
    <Paper elevation={2} sx={{ p: 2, display: "grid", gap: 1 }}>
      <Title>{props.title}</Title>
      <Paragraph>{props.companyName}</Paragraph>
      <Paragraph>{props.companyLocation}</Paragraph>
      {props.salary && (
        <FlexContainer salary>
          <i className="fal fa-money-bill-alt"></i>
          <Paragraph>{props.salary}</Paragraph>
        </FlexContainer>
      )}
      {props.isEasilyApply && (
        <FlexContainer>
          <i className="fad fa-location-arrow"></i>
          <Paragraph>{props.isEasilyApply}</Paragraph>
        </FlexContainer>
      )}
      <UnorderdListContainer>
        {props.snippet.map((snip, key) => {
          return <li key={key}>{snip}</li>;
        })}
      </UnorderdListContainer>
    </Paper>
  );
}
