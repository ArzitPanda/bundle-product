import React, { useEffect, useState } from "react";
import AddModal from "../AddModal";
import "./ProductList.css";
import { FiEdit2 } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import Dragger from "../../images/dragger.png";
import cancel from "../../images/cancel.png";


const ProductList = () => {
  const [id, setId] = useState(2);

  const [arr, setArr] = useState([{ add_id: 1 }]);
  const [variant, setVariant] = useState([]);
  const [clicked, setClicked] = useState(arr[0]);
  const [open, setOpen] = useState(false);

  const [isVariantOpen, setIsVariantOpen] = useState(false);

  const handleAddProduct = () => {
    if (arr.length === 4) {
      alert("maximum 4");
      return;
    }

    setId(id + 1);
    let temp = arr;
    temp.push({ add_id: id });
    setArr(temp);
  };

  const handleRemove = (ele) => {
    let newarr = arr.filter((item) => item.add_id !== ele.add_id);
    setArr(newarr);

    let newVariant = variant.filter(
      (item) => item.product_id !== ele?.product_fetch?.id
    );
    setVariant(newVariant);
  };

  const handleClick = (ele) => {
    setClicked(ele);
    setOpen(true);
  };
  const handleVariants = (ele) => {
    setIsVariantOpen(!isVariantOpen);
  };

  return (
    <div>
      <div className="heading_text">Add Product</div>
      <div className="productItemContainer">
        {arr.map((ele) => (
          <div key={ele.add_id} className="product_item_container">
            <div className="product_item">
              <div className="first_section">
                <h1>
                  {(ele?.product_fetch?.title &&
                    ele?.product_fetch?.title.slice(0, 15) + ". . .") ||
                    "select product"}
                </h1>

                <FiEdit2
                  color="rgba(0, 0, 0, 0.2)"
                  onClick={() => handleClick(ele)}
                />
              </div>
              <div className="second_section">
                <div className="discount">add discounts</div>
                <img
                  src={cancel}
                  className="img_util"
                  onClick={() => handleRemove(ele)}
                />
              </div>
            </div>

            <div className="third_section">
              <div className="list_variant_container">
                <button
                  onClick={() => {
                    handleVariants(ele);
                  }}
                >
                  list variants <MdKeyboardArrowDown />
                </button>
              </div>

              {isVariantOpen &&
                variant
                  ?.filter((item) => item.product_id === ele?.product_fetch?.id)
                  .map((elem) => {
                    return (
                      <div key={elem.id} className="subItem_container">
                        <img src={Dragger} className="img_util" />
                        <div className="subItem">
                          <img src="" className="" />
                          <h2>{elem.title}</h2>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        ))}
      </div>
      <div className="add_product_container">
        <button onClick={handleAddProduct} className="add_product">
          add product
        </button>
      </div>
      <AddModal
        open={open}
        setOpen={setOpen}
        product={clicked}
        setArr={setArr}
        arr={arr}
        variant={variant}
        setVariant={setVariant}
      />
    </div>
  );
};

export default ProductList;
