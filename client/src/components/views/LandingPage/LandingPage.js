import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Icon, Row, Col, Card } from "antd";
import ImageSlider from "../../utils/ImageSlider";

const { Meta } = Card;

function LandingPage() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(1);
  const [postSize, setPostSize] = useState(0);

  useEffect(() => {
    const variables = {
      skip,
      limit,
    };

    getProducts(variables);
  }, []);

  const getProducts = (variables) => {
    Axios.post("/api/product/getProducts", variables).then((response) => {
      if (response.data.success) {
        setProducts([...products, ...response.data.products]);
        setPostSize(response.data.postSize);
      } else {
        alert("Failed to get product data");
      }
    });
  };

  const onLoadMore = () => {
    let skp = skip + limit;

    const variables = {
      skip: skp,
      limit,
    };

    getProducts(variables);
    setSkip(skp);
  };

  const renderCards = products.map((product, index) => {
    return (
      <Col key={index} lg={6} md={8} xs={24}>
        <Card hoverable={true} cover={<ImageSlider images={product.images} />}>
          <Meta title={product.title} description={product.price}></Meta>
        </Card>
      </Col>
    );
  });

  return (
    <>
      <div style={{ width: "75%", margin: "3rem auto" }}>
        <div style={{ textAlign: "center" }}>
          <h2>
            Let's Travel Any Where <Icon type="rocket"></Icon>
          </h2>
        </div>
        {/*Filter*/}
        {/*Search */}
        {products.length === 0 ? (
          <div
            style={{
              display: "flex",
              height: "300px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2>No post yet...</h2>
          </div>
        ) : (
          <div>
            <Row gutter={[16, 16]}>{renderCards}</Row>
          </div>
        )}
        <br />
        {postSize >= limit && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={onLoadMore}>Load more</button>
          </div>
        )}
      </div>
    </>
  );
}

export default LandingPage;
