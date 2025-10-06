const SECTION = Object.freeze({
  EXPERIENCE: "Experience",
  ABOUT_ME: "About Me",
  CERTIFICATES: "Certificates",
});

const SECTION_BACKGROUND_COLOR = Object.freeze({
  [SECTION.EXPERIENCE]: "white",
  [SECTION.ABOUT_ME]: "gray",
  [SECTION.CERTIFICATES]: "white",
});

const experiences = [
  {
    title: "TikTok, ByteDance Inc.",
    time: "10/2023 - Present",
    subtitle: "Software Engineer",
    content: [
      "Lead engineer to develop the new Catalog Insights page from scratch for the Global Monetization Ads team for advertisers to see how their products fare up against other products that are being sold on TikTok",
      "Lead engineer to develop the creation of 3 new industries for Catalog creation for advertisers: Flight, Hotel, and Destination",
      "Decreased latency of viewing products for advertisers by 60% by optimizing backend logic for pagination and request fetching",
      "Created easy-to-use recommended add-ons for advertisers to display on top of their videos to advertise their products",
    ],
    imgUrl: "src/assets/tiktoklogo.svg",
  },
  {
    title: "Google",
    time: "10/2020 - 03/2023",
    subtitle: "Software Engineer",
    content: [
      "Worked on Android Toast team to decrease latency of search implementation",
      "Led and developed an app on Pixel to read heart rate, respiration rate, and body temperature from Pixel sensors",
      "Helped decrease latency by 4% on the <a>Cloud Console Search Bar</a> by implementing a cached search algorithm",
    ],
    imgUrl: "src/assets/googlogo.svg",
    link: "https://console.cloud.google.com/",
  },
  {
    title: "Western Digital",
    time: "05/2020 - 08/2020",
    subtitle: "Software Engineer",
    content: [
      "Used Java and MySQL to create internal tools for all international teams",
      "Created Excel template with Visual Basic to get requirements new tools to develop",
    ],
    imgUrl: "src/assets/wdlogo.svg",
  },
  {
    title: "Newput Inc.",
    time: "01/2020 - 05/2020",
    subtitle: "Software Engineer",
    content: [
      "Worked on Android app (<a>Tinyview Comics</a>) to display custom comics vertically for easy-to-read content on mobile devices",
      "Used React Native to add a feature that allows users to like a comic and subscribe to the comic",
      "Created functionality to see number of page views per each page using Google Firebase on my first day",
    ],
    imgUrl: "src/assets/newputlogo.svg",
    link: "https://tinyview.com/",
  },
  {
    title: "Ultra/Mint Mobile",
    time: "06/2018 - 09/2019",
    subtitle: "Software Engineer",
    content: [
      "Worked on front-end web development, using HTML, JavaScript, CSS, PHP, and ReactJS, to make public-facing UI changes",
      "Utilized Optimizely and Google Tag Manager to collaborate with E-comm team to optimize user conversation rates and validation flow",
      "Created <a>the homepage</a> from scratch, which is still in use today as of 2025",
    ],
    imgUrl: "src/assets/ultramintlogo.svg",
    link: "https://www.mintmobile.com/",
  },
];

const abouts = [
  { content: "I worked at Google right out of college in 2020" },
  {
    content:
      "I studied at California Polytechnic State University, San Luis Obispo. I started off as a mechanical engineer in September 2015 and later switched to computer science my junior year. I graduated in March 2020 with a 3.93/4.00 GPA",
  },
  {
    content:
      "In 2014, I worked alongside 2 MIT professors that involved research on manipulating sound waves with code using an iPad's internal gyroscope as well as Swift, the coding language, during its Beta phase",
  },
  {
    content:
      "I played violin when I was 4 years old, and for every grade since 4th grade through college, I was concertmaster and a soloist (Achieved the last Advanced Level in Certificate of Merit)",
    link: "https://www.mtac.org/programs/cm/",
  },
];

// return (
//     <div class="timeline-container">
//     <div class="timeline-row">
//       <div class="timeline-half left">
//         <div class="timeline-text">
//           <p>I worked at Google right out of college in 2020.</p>
//         </div>
//       </div>
//       <div class="timeline-icon">G</div>
//       <div class="timeline-half empty"></div>
//     </div>

//     <div class="timeline-row">
//       <div class="timeline-half empty"></div>
//       <div class="timeline-icon">🎓</div>
//       <div class="timeline-half right">
//         <div class="timeline-text">
//           <p>I studied at California Polytechnic State University, San Luis Obispo. I started off as a mechanical engineer in September 2015 and later switched to computer science my junior year. I graduated in March 2020 with a 3.93/4.00 GPA.</p>
//         </div>
//       </div>
//     </div>

//     <div class="timeline-row">
//       <div class="timeline-half left">
//         <div class="timeline-text">
//           <p>In 2014, I worked alongside 2 MIT professors that involved research on manipulating sound waves with code using an iPad's internal gyroscope as well as Swift, the coding language, during its Beta phase.</p>
//         </div>
//       </div>
//       <div class="timeline-icon">🧪</div>
//       <div class="timeline-half empty"></div>
//     </div>

//     <div class="timeline-row">
//       <div class="timeline-half empty"></div>
//       <div class="timeline-icon">🎵</div>
//       <div class="timeline-half right">
//         <div class="timeline-text">
//           <p>I played violin when I was 4 years old, and for every grade since 4th grade through college, I was concertmaster and a soloist (Achieved the last Advanced Level in Certificate of Merit)</p>
//         </div>
//       </div>
//     </div>
//   </div>
//   );

export { SECTION, SECTION_BACKGROUND_COLOR, experiences, abouts };
