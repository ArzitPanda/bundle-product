import React, { useEffect, useState } from "react";
import "./Modal.css";
import { Button, Checkbox, Modal } from "@mui/material";
import axios from "axios";
import { MdOutlineCancel } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
const AddModal = ({
  open,
  product,
  setOpen,
  setArr,
  arr,
  variant,
  setVariant,
}) => {
  const [result, setResult] = useState([]);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [product_fetch, setProduct] = useState(null);
  const handleInput = (e) => {
    setSearch(e.target.value);
    setTimeout(() => {
      searchProduct();
    }, 800);
  };

  const searchProduct = () => {
    const url = `https://stageapibc.monkcommerce.app/admin/shop/product?search=${search}&page=${page}`;

    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setResult(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAllCheck = (e, ele) => {
    {
      if (e.target.checked === true) {
        for (
          let index = 0;
          index < document.getElementsByClassName("check-" + ele.id).length;
          index++
        ) {
          document.getElementsByClassName("check-" + ele.id)[
            index
          ].checked = true;
        }
        setVariant([...variant, ...ele?.variants]);
      }
      else
      {
        for (
          let index = 0;
          index < document.getElementsByClassName("check-" + ele.id).length;
          index++
        ) {
          document.getElementsByClassName("check-" + ele.id)[
            index
          ].checked = false;
        }
        let temp =variant.filter((item)=>item.product_id!==ele.id)
         setVariant(temp)
      }
    }
  };
  const handleAddProduct = () => {
    const { add_id } = product;

    const temparr = arr.map((ele) => {
      if (ele.add_id === add_id) {
        return { ...ele, product_fetch };
      } else {
        return ele;
      }
    });

    setArr(temparr);

    console.log("temp_arr", temparr);
    console.log(variant);
  };

  useEffect(() => {
    searchProduct();
  }, []);

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <div className="modal">
        <div className="searchBox">
          <div className="searchHeading_container">
            <h1>search products</h1>
            <MdOutlineCancel />
          </div>
          <div className="search_container">
            <AiOutlineSearch />
            <input
              type="text"
              onChange={handleInput}
              value={search}
              placeholder="search products"
            />
          </div>
        </div>
        <div className="contentShow">
          {result?.map((ele) => {
            return (
              <div
                key={ele.id}
                onClick={() => {
                  setProduct({ id: ele.id, title: ele.title, img: ele.img });
                }}
              >
                <div className="HeadItemContainer">
                  <div className="HeadItem_first">
                    {" "}
                    <input
                      type="checkbox"
                      className="checkbox_add"
                      onChange={(e) => handleAllCheck(e, ele)}
                    />
                    <img
                      src={ele?.image?.src}
                      className="head_img"
                      alt={ele.title}
                    />
                  </div>
                  <h1 className="head_title">{ele.title}</h1>
                </div>
                {ele?.variants &&
                  ele.variants.map((elem) => {
                    return (
                      <div key={elem.id} className="variant_container">
                        <div  className="first_section_variant">
                        <input
                          type="checkbox"
                          className={"check-" + ele.id}
                          onChange={(e) => {
                            let temp = [...variant];

                            if (e.target.checked === true) {
                              temp.push({ ...elem, checked: true });
                            } else if (e.target.checked === false) {
                              temp = variant.filter(
                                (elems) => elems.id !== elem.id
                              );
                            }
                            setVariant(temp);
                          }}
                        />
                       <div>{elem.title}</div>

                        </div>
                        <div className="second_section_variant">
                        <div>{elem.inventory_quantity} available</div>
                        <div>$ {elem.price}</div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
        <div className="endBox">
         <h4>4 products selected</h4>
         <div className="btn_container">
         <div onClick={handleAddProduct}  className="btn_cancel">cancel</div>
         <button onClick={handleAddProduct} className="btn_add">Add</button>
         </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddModal;
