const navItems = [
  {
    name: "Szolgáltatások",
    path: "/#szolgaltatasok",
    items: [
      {
        name: "Weboldal",
        path: "/szolgaltatasok/weboldal",
      },
      {
        name: "Iparágaknak",
        path: "",
        items: [
          {
            name: "Építőipari weboldal",
            path: "/szolgaltatasok/epitoipari-weboldal",
          },
          {
            name: "Szépségipari weboldal",
            path: "/szolgaltatasok/szepsegipari-weboldal",
          },
          {
            name: "Vendéglátóipari weboldal",
            path: "/szolgaltatasok/vendeglatoipari-weboldal",
          },
        ],
      },
      {
        name: "Webshop",
        path: "/szolgaltatasok/webshop",
      },
      {
        name: "Webapplikáció",
        path: "/szolgaltatasok/webapplikacio",
      },

      {
        name: "CRM rendszer",
        path: "/szolgaltatasok/crm",
      },

      {
        name: "Karbantartás",
        path: "/szolgaltatasok/karbantartas",
      },
    ],
  },
  {
    name: "Referenciák",
    path: "/#referenciak",
  },
  {
    name: "Árazás",
    path: "/#arazas",
  },
  {
    name: "Folyamat",
    path: "/#folyamat",
  },
  {
    name: "Kapcsolat",
    path: "/kapcsolat",
  },
];

export default navItems;
