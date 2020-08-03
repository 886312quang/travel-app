import React, { useState } from "react";
import { Typography, Button, Form, message, Input, Icon } from "antd";

const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
  { key: 1, value: "Africa" },
  { key: 2, value: "Europe" },
  { key: 3, value: "Asia" },
  { key: 4, value: "North America" },
  { key: 5, value: "South America" },
  { key: 6, value: "Australia" },
  { key: 7, value: "Antarctica" },
];

function UploadProductPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prices, setPrices] = useState(0);
  const [select, setSelect] = useState(1);

  const onTitleChange = (event) => {
    setTitle(event.currentTarget.value);
  };
  const onDescriptionChange = (event) => {
    setDescription(event.currentTarget.value);
  };
  const onPriceChange = (event) => {
    setPrices(event.currentTarget.value);
  };
  const onContinentselectChange = (event) => {
    setSelect(event.currentTarget.value);
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={1}>Upload Travel Product</Title>
      </div>
      {/**Form*/}
      <Form onSubmit>
        {/**Drop zone*/}
        <br />
        <br />
        <label>Title</label>
        <Input onChange={onTitleChange} value={title} />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={onDescriptionChange} value={description} />
        <br />
        <br />
        <label>Price($)</label>
        <Input onChange={onPriceChange} value={prices} type="number" />
        <select onChange={onContinentselectChange}>
          {Continents.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button onClick>Submit</Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
