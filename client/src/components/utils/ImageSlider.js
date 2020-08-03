import React from "react";
import { Carousel } from "antd";

function ImageSlider(props) {
  const { images } = props;
  return (
    <div>
      <Carousel autoplay>
        {images.map((img, index) => (
          <div key={index}>
            <img
              style={{ width: "100%", maxHeight: "150px" }}
              src={`http://localhost:5000/${img}`}
            ></img>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ImageSlider;
