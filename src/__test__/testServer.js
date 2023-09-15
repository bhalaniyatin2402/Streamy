import { createServer } from "../setupTest";

export default createServer([
  {
    path: "https://api.themoviedb.org/3/configuration",
    res: (req) => {
      return {
        images: {
          secure_base_url: "https://image.tmdb.org/t/p/",
        },
      };
    },
  },
  {
    path: "https://api.themoviedb.org/3/genre/list",
    res: (req) => {
      return {
        genres: [
          { id: 18, name: "Drama" },
          { id: 12, name: "Adventure" },
          { id: 28, name: "Action" },
          { id: 27, name: "Horror" },
          { id: 53, name: "Thriller" },
        ],
      };
    },
  },
  {
    path: "https://api.themoviedb.org/3/movie/upcoming",
    res: (req) => {
      return {
        results: [
          { backdrop_path: "/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg" },
          { backdrop_path: "/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg" },
          { backdrop_path: "/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg" },
          { backdrop_path: "/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg" },
          { backdrop_path: "/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg" },
          { backdrop_path: "/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg" },
          { backdrop_path: "/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg" },
          { backdrop_path: "/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg" },
          { backdrop_path: "/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg" },
          { backdrop_path: "/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg" },
          { backdrop_path: "/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg" },
          { backdrop_path: "/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg" },
          { backdrop_path: "/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg" },
          { backdrop_path: "/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg" },
          { backdrop_path: "/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg" },
          { backdrop_path: "/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg" },
          { backdrop_path: "/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg" },
          { backdrop_path: "/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg" },
          { backdrop_path: "/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg" },
          { backdrop_path: "/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg" },
        ],
      };
    },
  },
  {
    path: "https://api.themoviedb.org/3/trending/movie/day",
    res: (req) => {
      return {
        results: [
          {
            id: 872585,
            vote_average: 8.258,
            genre_ids: [18],
            title: "Oppenheimer",
            release_date: "2023-07-19",
            poster_path: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
          },
          {
            id: 335977,
            vote_average: 6.682,
            genre_ids: [12],
            title: "Indiana Jones and the Dial of Destiny",
            release_date: "2023-06-28",
            poster_path: "/Af4bXE63pVsb2FtbW8uYIyPBadD.jpg",
          },
        ],
      };
    },
  },
  {
    path: "https://api.themoviedb.org/3/trending/movie/week",
    res: (req) => {
      return {
        results: [
          {
            id: 615656,
            vote_average: 7.008,
            genre_ids: [28],
            title: "Meg 2: The Trench",
            release_date: "2023-08-02",
            poster_path: "/FQHtuf2zc8suMFE28RyvFt3FJN.jpg",
          },
          {
            id: 1008042,
            vote_average: 7.21,
            genre_ids: [27],
            title: "Talk to Me",
            release_date: "2023-07-26",
            poster_path: "/kdPMUMJzyYAc4roD52qavX0nLIC.jpg",
          },
        ],
      };
    },
  },
  {
    path: "https://api.themoviedb.org/3/:mediaType/:id",
    res: (req) => {
      return {
        poster_path: "/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
        backdrop_path: "/4XM8DUTQb3lhLemJC51Jx4a2EuA.jpg",
        title: "Fast X",
        release_date: "2023-05-17",
        tagline: "The end of the road begins.",
        genres: [{ id: 28 }],
        vote_average: 7.282,
        status: "Released",
        runtime: 142,
        overview: "Over many missions and against impossible odds,",
      };
    },
  },
  {
    path: "https://api.themoviedb.org/3//search/multi",
    res: (req) => {
      if (req.url.searchParams.get("page") == 1) {
        return {
          results: [
            {
              id: 615656,
              title: "Meg 2: The Trench",
              release_date: "2023-08-02",
              poster_path: "/FQHtuf2zc8suMFE28RyvFt3FJN.jpg",
            },
            {
              id: 1008042,
              title: "Talk to Me",
              release_date: "2023-07-26",
              poster_path: "/kdPMUMJzyYAc4roD52qavX0nLIC.jpg",
            },
          ],
        };
      } else if (req.url.searchParams.get("page") == 2) {
        return {
          results: [
            {
              id: 872585,
              title: "Oppenheimer",
              release_date: "2023-07-19",
              poster_path: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
            },
            {
              id: 335977,
              title: "Indiana Jones and the Dial of Destiny",
              release_date: "2023-06-28",
              poster_path: "/Af4bXE63pVsb2FtbW8uYIyPBadD.jpg",
            },
          ],
        };
      }
    },
  },
]);
