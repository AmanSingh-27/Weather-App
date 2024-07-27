import { useState } from "react";
import { Box, styled } from "@mui/material";
import sunset from "./images/bg.jpg";
import Information from "./Information";
import Form from "./Form";

const Component = styled(Box)({
  height: "100vh",
  display: "flex",
  alignItems: "center",
  margin: "0 auto",
  width: "65%",
});
const Image = styled(Box)({
  background: `url(${sunset})`,
  width: "27%",
  height: "90%",
  backgroundSize: "cover",
});

const Home = () => {
  const [result, setResult] = useState({});

  return (
    <Component>
      <Image></Image>
      <Box style={{ width: "73%", height: "90%" }}>
        <Form setResult={setResult} />
        <Information result={result} />
      </Box>
    </Component>
  );
};
export default Home;
