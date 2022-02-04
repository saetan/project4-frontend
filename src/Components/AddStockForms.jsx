import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

export default function AddStockForms(props) {
    let { setTriggerRefresh, triggerRefresh } = props;
  let navigate = useNavigate();
  const [stock, setStock] = useState({
    name: "",
    quantity: 0,
    price: 0.00,
  });
    const [isDisabled, setDisabled] = useState(true);

    useEffect(() => {
        checkIsDisabled();
    }, [stock])

    const checkIsDisabled = () => {
        console.log("Checking");
        if (stock.price && stock.name && stock.quantity) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }
  const handleNameChange = (event) => {
      setStock({
      ...stock,
      name: event.currentTarget.value,
    })
  }

  const handlePriceChange = (event) => {
    setStock({
      ...stock,
      price: event.currentTarget.value,
    })
    }
    
    const handleQuantityChange = (event) => {
    setStock({
      ...stock,
      quantity: event.currentTarget.value,
    })
  }

  const handleSubmit = async (event) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/stocks/createstock`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(stock),
        });

        const decodedResponse = await response.json();

        if (response.status == 200) { 
            Swal.fire('Add Stock Successful Successful');
            setTriggerRefresh(!triggerRefresh);
          //refresh the form
        } else {
            throw new Error(decodedResponse.message);
        }
    } catch (error) {
        console.warn(error)
      Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: error.message,
  footer: '<a href="">Why do I have this issue?</a>'
})
    }
  }

    return <>
             <label>Stock Name</label>
            <input
              value={stock.name}
              onChange={handleNameChange}
            />
            <label>Quantity</label>
            <input
              value={stock.quantity}
              type="number"
              onChange={handleQuantityChange}
        />
        <label>Price</label>
            <input
              value={stock.price}
              type="number"
              onChange={handlePriceChange}
        />
        

        <button disabled={isDisabled} onClick={handleSubmit}>Submit</button>
    </>
}