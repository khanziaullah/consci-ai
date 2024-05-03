import React, { useEffect, useState } from "react";
import imgPath1 from "../../assets/grey.png";
import imgPath2 from "../../assets/demo.png";
import "./pyramid.css";

function Pyramid({ classifiedRiskCategory }) {
  const [clipPath, setClipPath] = useState("");
  // "polygon(0 0px, 100% 0px, 100% calc(100% - 250px), 0 calc(100% - 265px))" //First
  // "polygon(0 60px, 100% 70px, 100% calc(100% - 175px), 0 calc(100% - 165px))" //Second
  // "polygon(0 150px, 100% 150px, 100% calc(100% - 80px), 0 calc(100% - 80px))" //Third
  // "polygon(0 230px, 100% 230px, 100% calc(100% - 0px), 0 calc(100% - 0px))" //Fourth

  // "polygon(0 20px, 100% 20px, 100% calc(100% - 20px), 0 calc(100% - 20px))"      //Original
  // );
  // Function to handle clip path change
  // const handleClipPathChange = () => {
  // Example: Update clip path to clip more from the top and bottom
  // setClipPath();
  // "polygon(0 50px, 100% 50px, 100% calc(100% - 50px), 0 calc(100% - 50px))"
  // };

  useEffect(() => {
    switch (classifiedRiskCategory) {
      case "Unacceptable AI system":
        setClipPath(
          "polygon(0 0px, 100% 0px, 100% calc(100% - 250px), 0 calc(100% - 265px))"
        );
        break;
      case "High Risk AI system":
        setClipPath(
          "polygon(0 60px, 100% 70px, 100% calc(100% - 175px), 0 calc(100% - 165px))"
        );
        break;
      case "Transparency Risk AI system":
        setClipPath(
          "polygon(0 150px, 100% 150px, 100% calc(100% - 80px), 0 calc(100% - 80px))"
        );
        break;
      case "General Purpose AI system":
        setClipPath(
          "polygon(0 230px, 100% 230px, 100% calc(100% - 0px), 0 calc(100% - 0px))"
        );
        break;
      default:
        setClipPath("0");
        break;
    }
  }, [classifiedRiskCategory]);

  return (
    <div className="image-container">
      {/* Both images positioned absolutely */}
      <img
        src={imgPath1}
        className="grey-image"
        alt="Original Image"
        style={{
          // position: "absolute",
          // top: 0,
          // left: 0,
          // width: "80%",
          // height: "80%",
          // alignItems: "center",
          objectFit: "cover", // Ensure image covers the container
          zIndex: 1, // Ensure imgPath1 is below imgPath2
        }}
      />
      <img
        src={imgPath2}
        className="clip-image"
        alt="Partial Image"
        style={{
          // position: "absolute",
          // top: 0,
          // left: 0,
          // width: "100%",
          // height: "100%",
          // alignContent: "center",
          objectFit: "cover", // Ensure image covers the container
          clipPath: clipPath,
          zIndex: 2, // Ensure imgPath2 is above imgPath1
        }}
      />
      {/* <button onClick={handleClipPathChange}>Clip More</button> */}
    </div>
  );
}

export default Pyramid;
