// ============================================================
// NCRPTX WALLET — COUNTRY GROUPS
// Edit these lists to update KYC requirements per country
// ============================================================

const COUNTRY_GROUPS = {

  // GROUP A: Full KYC mandatory (regulated jurisdictions)
  // These countries require ID verification before opening an account
  A: [
    "US","GB","DE","FR","IT","ES","NL","BE","AT","CH","JP","KR","SG","AU","CA",
    "HK","SE","NO","DK","FI","IE","LU","NZ","AE","SA","QA","KW","BH","OM",
    "PT","GR","CZ","PL","HU","RO","HR","SI","SK","EE","LV","LT","CY","MT",
    "IS","LI","MC","SM","VA","AD","IL","ZA","MX","BR","CL","AR","CO","IN"
  ],

  // GROUP B: Custodial wallet, KYC optional
  // ncrptx holds the private keys; lighter onboarding
  B: [
    "TR","NG","KE","GH","UG","TZ","RW","SN","CI","CM","ZM","ZW","MZ","BW",
    "NA","MU","SC","CV","PH","TH","VN","MY","ID","PK","BD","LK","MM","KH",
    "LA","BN","MN","KZ","UZ","TM","KG","TJ","AZ","AM","GE","UA","MD","BY",
    "RS","BA","MK","AL","ME","XK","EG","MA","TN","DZ","LY","SD","ET","SO",
    "PE","EC","BO","PY","UY","VE","GT","HN","SV","NI","CR","PA","CU","DO",
    "HT","JM","TT","BB","BS","BZ","GY","SR"
  ]

  // GROUP C: Non-custodial wallet, KYC optional
  // All remaining countries — user holds own private keys
  // (everything not in A or B defaults to Group C)
};

// Full country list for dropdown
const ALL_COUNTRIES = [
  {code:"AF",name:"Afghanistan"},{code:"AL",name:"Albania"},{code:"DZ",name:"Algeria"},
  {code:"AD",name:"Andorra"},{code:"AO",name:"Angola"},{code:"AR",name:"Argentina"},
  {code:"AM",name:"Armenia"},{code:"AU",name:"Australia"},{code:"AT",name:"Austria"},
  {code:"AZ",name:"Azerbaijan"},{code:"BS",name:"Bahamas"},{code:"BH",name:"Bahrain"},
  {code:"BD",name:"Bangladesh"},{code:"BB",name:"Barbados"},{code:"BY",name:"Belarus"},
  {code:"BE",name:"Belgium"},{code:"BZ",name:"Belize"},{code:"BJ",name:"Benin"},
  {code:"BT",name:"Bhutan"},{code:"BO",name:"Bolivia"},{code:"BA",name:"Bosnia and Herzegovina"},
  {code:"BW",name:"Botswana"},{code:"BR",name:"Brazil"},{code:"BN",name:"Brunei"},
  {code:"BG",name:"Bulgaria"},{code:"BF",name:"Burkina Faso"},{code:"BI",name:"Burundi"},
  {code:"CV",name:"Cabo Verde"},{code:"KH",name:"Cambodia"},{code:"CM",name:"Cameroon"},
  {code:"CA",name:"Canada"},{code:"CF",name:"Central African Republic"},{code:"TD",name:"Chad"},
  {code:"CL",name:"Chile"},{code:"CN",name:"China"},{code:"CO",name:"Colombia"},
  {code:"KM",name:"Comoros"},{code:"CR",name:"Costa Rica"},{code:"HR",name:"Croatia"},
  {code:"CU",name:"Cuba"},{code:"CY",name:"Cyprus"},{code:"CZ",name:"Czech Republic"},
  {code:"DK",name:"Denmark"},{code:"DJ",name:"Djibouti"},{code:"DO",name:"Dominican Republic"},
  {code:"EC",name:"Ecuador"},{code:"EG",name:"Egypt"},{code:"SV",name:"El Salvador"},
  {code:"EE",name:"Estonia"},{code:"ET",name:"Ethiopia"},{code:"FI",name:"Finland"},
  {code:"FR",name:"France"},{code:"GA",name:"Gabon"},{code:"GE",name:"Georgia"},
  {code:"DE",name:"Germany"},{code:"GH",name:"Ghana"},{code:"GR",name:"Greece"},
  {code:"GT",name:"Guatemala"},{code:"GN",name:"Guinea"},{code:"GY",name:"Guyana"},
  {code:"HT",name:"Haiti"},{code:"HN",name:"Honduras"},{code:"HK",name:"Hong Kong"},
  {code:"HU",name:"Hungary"},{code:"IS",name:"Iceland"},{code:"IN",name:"India"},
  {code:"ID",name:"Indonesia"},{code:"IR",name:"Iran"},{code:"IQ",name:"Iraq"},
  {code:"IE",name:"Ireland"},{code:"IL",name:"Israel"},{code:"IT",name:"Italy"},
  {code:"JM",name:"Jamaica"},{code:"JP",name:"Japan"},{code:"JO",name:"Jordan"},
  {code:"KZ",name:"Kazakhstan"},{code:"KE",name:"Kenya"},{code:"KW",name:"Kuwait"},
  {code:"KG",name:"Kyrgyzstan"},{code:"LA",name:"Laos"},{code:"LV",name:"Latvia"},
  {code:"LB",name:"Lebanon"},{code:"LI",name:"Liechtenstein"},{code:"LT",name:"Lithuania"},
  {code:"LU",name:"Luxembourg"},{code:"MK",name:"North Macedonia"},{code:"MG",name:"Madagascar"},
  {code:"MW",name:"Malawi"},{code:"MY",name:"Malaysia"},{code:"MV",name:"Maldives"},
  {code:"ML",name:"Mali"},{code:"MT",name:"Malta"},{code:"MU",name:"Mauritius"},
  {code:"MX",name:"Mexico"},{code:"MD",name:"Moldova"},{code:"MC",name:"Monaco"},
  {code:"MN",name:"Mongolia"},{code:"ME",name:"Montenegro"},{code:"MA",name:"Morocco"},
  {code:"MZ",name:"Mozambique"},{code:"MM",name:"Myanmar"},{code:"NA",name:"Namibia"},
  {code:"NP",name:"Nepal"},{code:"NL",name:"Netherlands"},{code:"NZ",name:"New Zealand"},
  {code:"NI",name:"Nicaragua"},{code:"NG",name:"Nigeria"},{code:"NO",name:"Norway"},
  {code:"OM",name:"Oman"},{code:"PK",name:"Pakistan"},{code:"PA",name:"Panama"},
  {code:"PY",name:"Paraguay"},{code:"PE",name:"Peru"},{code:"PH",name:"Philippines"},
  {code:"PL",name:"Poland"},{code:"PT",name:"Portugal"},{code:"QA",name:"Qatar"},
  {code:"RO",name:"Romania"},{code:"RU",name:"Russia"},{code:"RW",name:"Rwanda"},
  {code:"SA",name:"Saudi Arabia"},{code:"SN",name:"Senegal"},{code:"RS",name:"Serbia"},
  {code:"SC",name:"Seychelles"},{code:"SL",name:"Sierra Leone"},{code:"SG",name:"Singapore"},
  {code:"SK",name:"Slovakia"},{code:"SI",name:"Slovenia"},{code:"SO",name:"Somalia"},
  {code:"ZA",name:"South Africa"},{code:"KR",name:"South Korea"},{code:"SS",name:"South Sudan"},
  {code:"ES",name:"Spain"},{code:"LK",name:"Sri Lanka"},{code:"SD",name:"Sudan"},
  {code:"SR",name:"Suriname"},{code:"SE",name:"Sweden"},{code:"CH",name:"Switzerland"},
  {code:"TW",name:"Taiwan"},{code:"TJ",name:"Tajikistan"},{code:"TZ",name:"Tanzania"},
  {code:"TH",name:"Thailand"},{code:"TL",name:"Timor-Leste"},{code:"TG",name:"Togo"},
  {code:"TT",name:"Trinidad and Tobago"},{code:"TN",name:"Tunisia"},{code:"TR",name:"Turkey"},
  {code:"TM",name:"Turkmenistan"},{code:"UG",name:"Uganda"},{code:"UA",name:"Ukraine"},
  {code:"AE",name:"United Arab Emirates"},{code:"GB",name:"United Kingdom"},
  {code:"US",name:"United States"},{code:"UY",name:"Uruguay"},{code:"UZ",name:"Uzbekistan"},
  {code:"VE",name:"Venezuela"},{code:"VN",name:"Vietnam"},{code:"XK",name:"Kosovo"},
  {code:"YE",name:"Yemen"},{code:"ZM",name:"Zambia"},{code:"ZW",name:"Zimbabwe"}
];

function getCountryGroup(code) {
  if (COUNTRY_GROUPS.A.includes(code)) return 'A';
  if (COUNTRY_GROUPS.B.includes(code)) return 'B';
  return 'C';
}

function generateCustomerID() {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substr(2, 6).toUpperCase();
  return `NCX-${ts}-${rand}`;
}
