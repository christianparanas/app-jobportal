import Box from "@mui/material/Box";

export default function BoxSx({ props }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: 200,
        backgroundColor: "primary.dark",

        "&:hover": {
          backgroundColor: "primary.main",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >{props.title}</Box>
  );
}
