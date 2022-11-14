import React, { useState, useEffect, useRef } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Navbar from "./navbar";

import { Container, Box, Typography } from "@material-ui/core";

import zingchart from "zingchart/es6";
import ZingChart from "zingchart-react";

import UserService from "../services/user.service";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";

require("./css/home.css");
require("dotenv");

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  textField: {
    border: "2px solid #0084A8 !important",
    borderRadius: "5px",
  },
});

export default function Home() {
  const getUserFromStorage = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
      setIsLogged(true);
    } else {
      setUser(null);
      setIsLogged(false);
    }
  };

  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(null);

  const classes = useStyles();

  const [inputStockMovimentation, setInputStockMovimentation] = useState([]);
  const [outputStockMovimentation, setOutputStockMovimentation] = useState([]);

  const [inputChartSettings, setInputChartSettings] = useState({
    type: "bar",
    plot: {
      valueBox: {
        text: "%v",
      },
    },
    title: {
      text: "ENTRADA SEMANAL",
      fontSize: 20,
      fontColor: "#0084A8",
      fontFamily: "Helvetica",
      textAlign: "center",
      adjustLayout: true,
    },
    scaleX: {
      values: [
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado",
        "Domingo",
      ],
    },
    series: [
      {
        values: [],
      },
    ],
  });

  const [outputChartSettings, setOutputChartSettings] = useState({
    type: "bar",
    plot: {
      backgroundColor: "#F47500",
      valueBox: {
        text: "%v",
      },
    },
    title: {
      text: "SAÍDA SEMANAL",
      fontSize: 20,
      fontColor: "#F47500",
      fontFamily: "Helvetica",
      textAlign: "center",
      adjustLayout: true,
    },
    scaleX: {
      values: [
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado",
        "Domingo",
      ],
    },
    series: [
      {
        values: outputStockMovimentation,
      },
    ],
  });

  const [gaugeChartSettings, setGaugeChartSettings] = useState({
    type: "gauge",
    title: {
      text: "PERCENTUAL DO ESTOQUE OCUPADO",
    },
    plotarea: {
      marginTop: 80,
    },
    "scale-r": {
      aperture: 200,
      values: "0:100:25",
      center: {
        size: 5,
        "background-color": "#66CCFF #FFCCFF",
        "border-color": "none",
      },
      ring: {
        size: 5,
        rules: [
          {
            rule: "%v >= 0 && %v <= 20",
            "background-color": "red",
          },
          {
            rule: "%v >= 20 && %v <= 40",
            "background-color": "orange",
          },
          {
            rule: "%v >= 40 && %v <= 60",
            "background-color": "yellow",
          },
          {
            rule: "%v >= 60 && %v <= 80",
            "background-color": "green",
          },
        ],
      },
      labels: ["0%", "25%", "50%", "75%", "100%"], //Scale Labels
    },
    tick: {
      "line-color": "#66CCFF",
      "line-style": "solid",
      "line-width": 3,
      size: 15,
      placement: "inner",
    },
    tooltip: {
      text: "%v%",
    },
    series: [{ values: [] }],
  });

  const getStockMovimentationPerWeek = () => {
    UserService.getStockHistoryPerWeek().then((response) => {
      let inputMovimentationl = [];
      let outputMovimentationl = [];
      for (let i = 0; i < response.data.length; i++) {
        inputMovimentationl.push(response.data[i].input);
        outputMovimentationl.push(response.data[i].output);
      }

      setInputStockMovimentation(inputMovimentationl);
      setOutputStockMovimentation(outputMovimentationl);
    });
  };

  useEffect(() => {
    getUserFromStorage();
    if (isLogged) {
      getStockMovimentationPerWeek();
      setInterval(() => {
        getStockMovimentationPerWeek();
      }, 10000);
    }
  }, [isLogged]);

  useEffect(() => {
    zingchart.exec("inputChart", "setseriesvalues", {
      values: [inputStockMovimentation],
    });
    zingchart.exec("outputChart", "setseriesvalues", {
      values: [outputStockMovimentation],
    });
    let percentualValue =
      ((inputStockMovimentation.reduce((a, b) => a + b, 0) -
        outputStockMovimentation.reduce((a, b) => a + b, 0)) /
        process.env.REACT_APP_WAREHOUSE_CAPACITY) *
      100;
    zingchart.exec("gaugeChart", "setseriesvalues", {
      values: [[percentualValue]],
    });
  }, [inputStockMovimentation, outputStockMovimentation]);

  const renderContent = () => {
    if (isLogged) {
      return (
        <>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: '30px'
            }}>
            <ZingChart
              id="inputChart"
              data={inputChartSettings}
              height={400}
              width={800}
            />
            <ZingChart
              id="outputChart"
              data={outputChartSettings}
              height={400}
              width={800}
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              marginTop: "30px",
              overflow: "hidden",
            }}>
            <ZingChart
              id="gaugeChart"
              data={gaugeChartSettings}
              height={450}
              width={900}
            />
          </div>
        </>
      );
    } else {
      return (
        <Container maxWidth="md" align="center" style={{ paddingTop: "5rem" }}>
          <Typography>Você não está logado</Typography>
        </Container>
      );
    }
  };

  return (
    <Box display="flex" flexDirection="row">
      <Navbar />
      <Container
        display="flex"
        flexDirection="column"
        maxWidth="xl"
        align="center">
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {renderContent()}
      </Container>
    </Box>
  );
}
