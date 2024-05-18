import { useState } from "react";
import axios from "axios";
import star_y from "../../src/assets/images/star_y.png";
import star_g from "../../src/assets/images/star_g.png";

const useScrape = (initialScrapeStatus, articleId) => {
  const [isScraped, setIsScraped] = useState(initialScrapeStatus);
  const [starImage, setStarImage] = useState(
    initialScrapeStatus ? { star_y } : { star_g }
  );

  const toggleScrape = () => {
    const newScrapeStatus = !isScraped;
    setIsScraped(newScrapeStatus);
    setStarImage(newScrapeStatus ? { star_y } : { star_g });

    if (newScrapeStatus) {
      // 스크랩 추가
      axios
        .post("/api/scrape", { articleId })
        .then((response) => {
          console.log("Scrape added:", response.data);
        })
        .catch((error) => {
          console.error("Error adding scrape:", error);
        });
    } else {
      // 스크랩 삭제
      axios
        .delete(`/api/scrape/${articleId}`)
        .then((response) => {
          console.log("Scrape removed:", response.data);
        })
        .catch((error) => {
          console.error("Error removing scrape:", error);
        });
    }
  };

  return { isScraped, starImage, toggleScrape };
};

export default useScrape;
