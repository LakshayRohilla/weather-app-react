import "./App.css";
import axios from "axios";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=8a42576fcff781f909fc92310cab195f`;
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    background: "transparent",
    boxShadow: "none",
  }));

  return (
    <Box sx={{ flexGrow: 1 }} className="app">
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={12}
          sx={{ mt: 10, mb: 5, display: "flex", justifyContent: "center" }}
        >
          <TextField
            id="outlined-search"
            label="Enter City"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            type="text"
          />
        </Grid>
        <Grid item xs={12} md={4} sx={{ mt: 4 }}>
          <Item>{data.name}</Item>
        </Grid>
        <Grid item xs={12} md={4} className="temp">
          {data.main ? (
            <Item>
              <h1>{data.main.temp.toFixed()}°C</h1>
            </Item>
          ) : null}
        </Grid>
        <Grid item xs={12} md={4} sx={{ mt: 2 }}>
          {data.weather ? (
            <Item>
              <p>{data.weather[0].main}</p>
            </Item>
          ) : null}
        </Grid>
        {data.name !== undefined && (
          <Grid item xs={12} md={4} sx={{mt: 5}}>
            <Item>
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              ) : null}
            </Item>
            <Item>
              <p>Feels Like</p>
            </Item>
          </Grid>
        )}
        {data.name !== undefined && (
          <Grid item xs={12} md={4} sx={{mt: 5}}>
            <Item>
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            </Item>
            <Item>
              <p>Humidity</p>
            </Item>
          </Grid>
        )}
        {data.name !== undefined && (
          <Grid item xs={12} md={4} sx={{mt: 5}}>
            <Item>
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} m/s</p>
              ) : null}
            </Item>
            <Item>
              <p>Wind Speed</p>
            </Item>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default App;
