const price = [
  {
    _id: 0,
    name: "Any",
    array: [],
  },
  {
    _id: 1,
    name: "$0 to 199$",
    array: [0, 199],
  },
  {
    _id: 2,
    name: "$200 to 400",
    array: [200, 400],
  },
  {
    _id: 3,
    name: "$400 to $600",
    array: [400, 600],
  },
  {
    _id: 4,
    name: "$600 to $800",
    array: [600, 800],
  },
  {
    _id: 5,
    name: "More than $800",
    array: [800, 100000000],
  },
];

const continents = [
  {
    _id: 1,
    name: "Africa",
  },
  {
    _id: 2,
    name: "Europe",
  },
  {
    _id: 3,
    name: "Asia",
  },
  {
    _id: 4,
    name: "North America",
  },
  {
    _id: 5,
    name: "South America",
  },
  {
    _id: 6,
    name: "Australia",
  },
  {
    _id: 7,
    name: "Antarctica",
  },
];

module.exports = {
  price,
  continents,
};
