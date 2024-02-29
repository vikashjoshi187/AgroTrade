
import { useDispatch, useSelector } from 'react-redux';
import './Cart.css';
import { useEffect, useState } from 'react';
import { getCart, updateProductQuantityInStore, updateCartqty, removeCart } from '../../../store/marketSlice';
import jscookie from 'js-cookie';
import Swal from 'sweetalert2';
import EquipmentCart from './EquipmentCart';
import { Link, useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
export default function Cart() {
  var token = jscookie.get('token');
  var email = jscookie.get('userEmail');
  const [modalShow, setModalShow] = useState(false);
  const [address, setAddress] = useState('');

  const [cartCount, setCartCount] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  // const [billGrain, setBillGrain] = useState({});
  // const [billEquip, setBillEquip] = useState({});

  const cartItem = useSelector((state) => state.marketSlice.cartItem);

  const getCartitem = async ({ token, email }) => {
    const cartItems = await dispatch(getCart({ token, email }));
    if (cartItems.payload) {
      setItems([...cartItems.payload]);
      setCartCount(cartItems.payload.length);

    }
    let qty = 0;
    cartItems.payload.forEach(itm => {
      qty += itm.quantity;
    })
  }

  async function handleRemove(cartId, productId) {
    let remove = await dispatch(removeCart({ cartId, productId, token, email }));
    console.log("after removing cart product ", remove);
    const cartItems = await dispatch(getCart({ token, email }));
    if (cartItems.payload)
      setItems([...cartItems.payload]);
    if (remove.payload.status === 200) {
      Swal.fire({
        position: "middle",
        icon: "success",
        title: "item removed from cart",
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      Swal.fire({
        position: "middle",
        icon: "info",
        title: "please try again there is some problem",
        showConfirmButton: false,
        timer: 2000
      });
    }

  }
  const handleClick = async (_id, productId, operation, index) => {
    const updatedItems = [...items];

    if (updatedItems[index]._id === _id) {
      if (updatedItems[index].quantity > 0) {
        let newQty = operation === 'increment' ? updatedItems[index].quantity + 1 : updatedItems[index].quantity - 1;
        if (newQty === 0) {
          newQty = 1
          Swal.fire({
            position: "middle",
            icon: "info",
            title: "quantity can't be less than one",
            showConfirmButton: false,
            timer: 1500
          });
        }

        dispatch(updateProductQuantityInStore({ _id, quantity: newQty }));
        dispatch(updateCartqty({ _id, productId, quantity: newQty, token, email }));
        updatedItems[index] = { ...updatedItems[index], quantity: newQty };
        setItems(updatedItems);
      } else {
        Swal.fire({
          position: "middle",
          icon: "info",
          title: "Its invalid quantity",
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  };

  const calculateProductsTotal = () => {
    let total = 0;
    items.forEach(item => {
      // total += item.price * item.quantity + (item.price * item.quantity * 0.25);
      total += (item.price * item.quantity) * 1.25;

    });
    // setBill({...bill,['productTotal']:total})
    return Math.round(total);
  };


  const gstTotal = () => {
    let total = 0;
    // const productsTotal = parseFloat(calculateProductsTotal());
    // const total = (productsTotal * 0.05);
    items.forEach(item => {
      // total += item.price * item.quantity + (item.price * item.quantity * 0.25);
      total += (item.price * item.quantity) * .05;

    });
    return Math.round(total);
  };

  const shipping = () => {
    let totalQty = 0;
    items.forEach(item => {
      totalQty += item.quantity;
    })
    return Math.round((totalQty * 100) * 1.05);
  }
  const calculateTotal = () => {
    const productsTotal = parseFloat(calculateProductsTotal());
    let totalQty = 0;
    items.forEach(item => {
      totalQty += item.quantity;
    })
    const shippingTotal = shipping();
    // setBill({...bill,['shipping']:shippingTotal});
    const total = productsTotal + shippingTotal + parseFloat(gstTotal());
    // setBill({...bill,['grand']:total});
    // return total.ceil();
    return Math.ceil(total);

  };
  const order = () => {

    setModalShow(true)

  }

  const orderConfirm = () => {

    // setModalShow(true)

    console.log("inside order function")
    let total = parseFloat(calculateProductsTotal());
    let totalGst = gstTotal();
    let shippingCharge = shipping();
    let grandTotal = calculateTotal();
    let order = {
      total,
      totalGst,
      shippingCharge,
      grandTotal,
       address
    }
    console.log("order in cart", order);
    if(address)
    navigate('/market/grainInvoice', { state: { order, items } });

    // to='/market/grainInvoice'
  }
  useEffect(() => {
    getCartitem({ token, email });
  }, []);

  return (
    <>
      <section className="h-100 gradient-custom w-100">
        <div className="container-fluid py-1">
          <div className="row d-flex my-1">
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header py-4">
                  <h5 className="mb-0">Grain-Cart {cartCount}</h5>
                </div>
                <div className="card-body">
                  {items.map((cart, i) => (
                    <div className="row" key={i}>
                      <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                        <img src={`http://localhost:3000/${cart.image}`} className="w-100" alt="Product" />
                      </div>
                      <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                        <p><strong>{cart.grainname}</strong></p>
                        <p>{cart.productDescription}</p>
                        <p>Rs. {(cart.price) + (cart.price) * (0.25)}</p>

                        <button type="button" className="btn btn-warning btn-sm me-1 mb-2" onClick={() => handleRemove(cart._id, cart.productId)}>
                          <i className="fas fa-trash"></i> Remove
                        </button>
                      </div>
                      <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                        <div className="d-flex mb-4" style={{ maxWidth: '300px' }}>
                          <button className="btn btn-warning  px-3 me-2" onClick={() => handleClick(cart._id, cart.productId, 'decrement', i)}>
                            <i className="fas fa-minus"></i>
                          </button>
                          <div className="form-outline">
                            <span className="form-control">{cart.quantity}</span>
                            <label className="form-label" htmlFor="form1">Quantity</label>
                          </div>
                          <button className="btn btn-warning  px-3 ms-2" onClick={() => handleClick(cart._id, cart.productId, 'increment', i)}>
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                        <p className="text-start text-md-center">
                          <strong>Total: Rs. {(cart.price + (cart.price) * (0.25)) * cart.quantity}</strong>
                        </p>
                      </div>
                      <hr className="my-4" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-header py-1">
                  <h5 className="mb-0">Grain-Cart Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Grains
                      <span>${calculateProductsTotal()}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Shipping
                      <span>{shipping()}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Gst(5%)
                      <span>{gstTotal()}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                        <strong>
                          <p className="mb-0">(including GST)</p>
                        </strong>
                      </div>
                      <span><strong>${calculateTotal()}</strong></span>
                    </li>
                  </ul>
                  <button type="button" className="btn btn-warning  btn-lg btn-block" onClick={order}>
                    Go to checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ShippingModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          order={orderConfirm}
          shipping={(e) => {  setAddress(e.target.value) }}
        />
      </section>
      <EquipmentCart />

    </>
  );
}



function ShippingModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Shipping Address
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='d-flex justify-content-center'>
        <input type="text" name="" id="" placeholder='Enter Shipping Addrees' onChange={props.shipping} className='px-5' />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} className='bg-danger border-0'>Close</Button>
        <Button onClick={props.order} className='bg-success'>Ok</Button>

      </Modal.Footer>
    </Modal>
  );
}

