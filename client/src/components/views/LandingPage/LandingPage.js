import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";
import { Icon, Row, Col, Card } from "antd";
import ImageSlider from "../../utils/ImageSlider";
import CheckBox from "./Sections/CheckBox";
import RadioBox from "./Sections/RadioBox";
import { continents, price } from "./Sections/Datas";
import SearchFeatures from "./Sections/SearchFeatures";

const { Meta } = Card;

function LandingPage() {
  const [products, setProducts] = useState([]);
  const [searchTerms, setSearchTerms] = useState("");
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [postSize, setPostSize] = useState(0);
  const [Filters, setFilters] = useState({
    continents: [],
    price: [],
  });

  const typingTimeOutRef = useRef(null);

  useEffect(() => {
    const variables = {
      skip,
      limit,
    };

    getProducts(variables);
  }, []);

  const getProducts = (variables) => {
    Axios.post("/api/product/getProducts", variables).then((response) => {
      console.log("goi api");
      if (response.data.success) {
        if (variables.loadMore) {
          setProducts([...products, ...response.data.products]);
        } else {
          setProducts(response.data.products);
        }
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
      loadMore: true,
    };

    getProducts(variables);
    setSkip(skp);
  };

  const renderCards = products.map((product, index) => {
    return (
      <Col key={index} lg={6} md={8} xs={24}>
        <Card
          hoverable={true}
          cover={
            <a href={`/product/${product._id}`}>
              <ImageSlider images={product.images} />
            </a>
          }
        >
          <Meta title={product.title} description={product.price}></Meta>
        </Card>
      </Col>
    );
  });

  const showFiltersResults = (filters) => {
    const variables = {
      skip: 0,
      limit,
      filters,
    };

    getProducts(variables);
    setSkip(0);
  };

  const handlePrice = (value) => {
    const data = price;
    let array = [];
    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };

  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };
    newFilters[category] = filters;

    if (category === "price") {
      let priceValues = handlePrice(filters);
      newFilters[category] = priceValues;
    }

    showFiltersResults(newFilters);
    setFilters(newFilters);
  };

  const updateSearchTerms = (newSearch) => {
    const value = newSearch;
    setSearchTerms(value);

    if (!getProducts) return;

    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current);
    }

    typingTimeOutRef.current = setTimeout(() => {
      const variables = {
        skip: 0,
        limit,
        filters: Filters,
        searchTerm: value,
      };

      setSkip(0);
      getProducts(variables);
    }, 800);
  };

  return (
    <>
      <div style={{ width: "75%", margin: "3rem auto" }}>
        <div style={{ textAlign: "center" }}>
          <h2>
            Let's Travel Any Where <Icon type="rocket"></Icon>
          </h2>
        </div>
        <br />
        <br />
        {/*Filter*/}
        <Row gutter={[16, 16]}>
          <Col lg={12} xs={24}>
            <CheckBox
              list={continents}
              handleFilters={(filters) => handleFilters(filters, "continents")}
            />
          </Col>
          <Col lg={12} xs={24}>
            <RadioBox
              list={price}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </Col>
        </Row>
        <br />
        {/*Search */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "1rem auto",
          }}
        >
          <SearchFeatures refreshFunction={updateSearchTerms} />
        </div>
        <br />
        <br />
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
