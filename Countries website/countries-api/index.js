const http = require("http");

const hostname = "localhost";
const port = 8000;
const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const axios = require("axios");
const countries = require("./country");
const bcrypt = require("bcrypt");

app.use(express.json());
const user = {
  username: "Horolmaa",
  password: "$2a$10$4GYsHdAmvSTrkXmADpyR4OJnNj8j3GuL0f8WTL729mtlBEhBKkNzq",
};

let userTokens = [];
app.use(cors());
continents = [
  "Asia",
  "Europe",
  "Africa",
  "Oceania",
  "North America",
  "Antarctica",
  "South America",
];

function readCodes2d() {
  const content = fs.readFileSync("countries-2code.json");
  const codes2d = JSON.parse(content);
  return codes2d;
}
app.get("/login", (req, res) => {
  const { username, password } = req.query;

  if (
    user.username === username &&
    bcrypt.compareSync(password, user.password)
  ) {
    const token = uuid();
    userTokens.push(token);
    res.json({ token });
  } else {
    res.sendStatus(401);
  }
});
//                  flag code oo avav
// app.get("/getflags", (req, res) => {
//   let flagcodes;
//   console.log("asdfa");
//   axios
//     .get(
//       "https://gist.githubusercontent.com/almost/7748738/raw/575f851d945e2a9e6859fb2308e95a3697bea115/countries.json"
//     )
//     .then((res) => {
//       const { data, status } = res;
//       if (status === 200) {
//         console.log(data);
//         fs.writeFileSync("countries-2code.json", JSON.stringify(data));
//       }
//     });
//   res.send(flagcodes);
//   console.log(flagcodes);
// });

//                  code jsondoo image url uguh bolomjtoi
// app.get("/addImageUrl", () => {
//   let data = readCodes2d();

//   for (let i = 0; i < data.length; i++) {
//     data[i] = {
//       name: data[i].name,
//       code: data[i].code,
//       imageUrl: `https://flagsapi.com/${data.code}/shiny/64.png`,
//     };
//   }
//   console.log(data);
// });

//           continents avav
// app.get("/continents", (req, res) => {
//   const country = countries;
//   console.log({ country });
//   let continents = [];
//   for (let i = 0; i < country.length; i++) {
//     if (!continents.includes(country[i].continent)) {
//       continents.push(country[i].continent);
//     }
//   }
//   console.log(continents);
//   res.json(continents);
// });

app.get("/countries2Code", (req, res) => {
  let data = readCodes2d();
  console.log(data);
  res.json(data);
});
app.get("/country/:continent/:flagsNumber", (req, res) => {
  let { continent, flagsNumber } = req.params;

  let continentFiltered = countries.filter(
    (country) => country.continent === continent
  );
  if (continentFiltered.length < flagsNumber) {
    res.sendStatus(500);
  } else {
    var final = [];
    for (let i = 0; i < flagsNumber; i++) {
      var random =
        continentFiltered[Math.floor(Math.random() * continentFiltered.length)];
      if (!final.includes(random)) {
        final.push(random);
      } else {
        i -= 1;
      }
    }
    console.log(final);
    res.json(final);
  }
});
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
