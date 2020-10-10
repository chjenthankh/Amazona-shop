import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../action/productAction";
function Home(props) {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const category = props.match.params.id ? props.match.params.id : '';
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(category));

    return () => {
      //
    };
  }, [category]);
  useEffect(() => {
    dispatch(listProducts(category, searchKeyword, sortOrder));

    return () => {
      //
    };
  }, [sortOrder]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
  };
  return <div>
    {category && <h2>{category}</h2>}

<ul className="filter">
  <li>
    <form onSubmit={submitHandler}>
      <input
        name="searchKeyword"
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  </li>
  <li>
    Sort By{' '}
    <select name="sortOrder" onChange={sortHandler}>
      <option value="">Newest</option>
      <option value="lowest">Lowest</option>
      <option value="highest">Highest</option>
    </select>
  </li>
</ul>
  {loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <ul className="products">
      {products.map((product) => (
        <li key={product._id}>
          <div className="product">
            <Link to={`/product/${product._id}`}>
              <img
                className="product-image"
                src={require(`../../assets/images/${product.image}`)}
                alt="product"
              />
            </Link>
            <div className="product-name">
              <Link to={`/product/${product._id}`}>{product.name}</Link>
            </div>
            <div className="product-brand">{product.brand}</div>
            <div className="product-price">{product.price}$</div>
            <div className="product-rating">
              {product.rating} Star ({product.numReviews} Reviews)
            </div>
          </div>
        </li>
      ))}
    </ul>
  )}
  </div>
}

export default Home;
