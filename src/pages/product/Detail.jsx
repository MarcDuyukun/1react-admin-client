import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Card, Icon, List, message } from "antd";
import LinkButton from "../../components/linkButton";
import memoryUtils from "../../utils/memoryUtils";
import { BASE_IMG } from "../../utils/Constants";
import { reqCategory } from "../../api";

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: "",
    };
  }
  getCategory = async (categoryId) => {
    const result = await reqCategory(categoryId);
    if (result.status === 0) {
      const categoryName = result.data.name;
      this.setState({ categoryName });
    }
  };
  componentDidMount() {
    const product = memoryUtils.product;
    if (product._id) {
      this.getCategory(product.categoryId);
    }
  }
  render() {
    const categoryName = this.state.categoryName;
    const product = memoryUtils.product;
    if (!product || !product._id) {
      return <Redirect to="/product" />;
    }
    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type="arrow-left" />
        </LinkButton>
        <span>商品详情</span>
      </span>
    );
    return (
      <Card title={title} className="detail">
        <List className="detail-list">
          <List.Item>
            <span className="detail-left">
              商品名称:<span> {product.name}</span>
            </span>
          </List.Item>
          <List.Item>
            <span className="detail-left">
              商品描述:<span> {product.desc}</span>
            </span>
          </List.Item>
          <List.Item>
            <span className="detail-left">
              商品价格:<span>{product.price}</span>
            </span>
          </List.Item>
          <List.Item>
            <span className="detail-left">
              所属分类:<span>{categoryName}</span>
            </span>
          </List.Item>
          <List.Item>
            <span className="detail-left">
              商品图片:
              <span>
                {product.imgs.map((img) => {
                  return (
                    <img
                      className="detail-img"
                      key={img}
                      src={BASE_IMG + img}
                      alt="img"
                    />
                  );
                })}
              </span>
            </span>
          </List.Item>
          <List.Item>
            <p className="detail-left">商品详情:</p>
            <div dangerouslySetInnerHTML={{ __html: product.detail }}></div>
          </List.Item>
        </List>
      </Card>
    );
  }
}
