import React from "react";
import Grid from "@mui/material/Grid";

type DetailItemProps = {
  label: string;
  value: string;
};

const DetailItem = ({ label, value }: DetailItemProps) => {
  return (
    <>
      <Grid item xs={3}>
        {label}:
      </Grid>
      <Grid item xs={9}>
        {value}
      </Grid>
    </>
  );
};

export default DetailItem;
