
import { useDispatch, useSelector } from 'react-redux';
import './Cart.css';
import { useEffect, useState } from 'react';
import { getCartequipment, updateProductQuantityInStore, updateCartqtyEquipment, removeCartequipment } from '../../../store/marketSlice';
import jscookie from 'js-cookie';
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

export default function EquipmentCart() {
  var token = jscookie.get('token');
  var email = jscookie.get('userEmail');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const [modalShow, setModalShow] = useState(false);
  const [address, setAddress] = useState('');
  // const [rentday,setRentday]=useState(0);


  const [items, setItems] = useState([]);
  const[eCartcount,setEcartCount]=useState(0);
  const [billGrain,setBillGrain]=useState({});
  const [billEquip,setBillEquip]=useState({});

  // const cartItem = useSelector((state) => state.marketSlice.cartItem);

  const getCartitem = async ({ token, email }) => {
    const cartItems = await dispatch(getCartequipment({ token, email }));
    if (cartItems.payload){
      setItems([...cartItems.payload]);
      setEcartCount(cartItems.payload.length)
    }
    let qty=0;
    cartItems.payload.forEach(itm=>{
      qty+=itm.quantity;
    });
  }

  async function handleRemove(cartId, productId) {
    let remove = await dispatch(removeCartequipment({ cartId, productId, token, email }));
    console.log("after removing cart product ", remove);
    const cartItems = await dispatch(getCartequipment({ token, email }));
    if (cartItems.payload)
      setItems([...cartItems.payload]);
    if (remove.payload.status === 200) {
      Swal.fire({
        position: "middle",
        icon: "info",
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
        dispatch(updateCartqtyEquipment({ _id, productId, quantity: newQty, token, email }));
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

  const handleRent = async (e,index) => {
    const updatedItems = [...items];

    // let rentDay = document.getElementById('rent-day');
    let rentDay=e.target.value
    console.log("inside rent day", items, " ", rentDay);

    setItems(prevItems => {
        const newItems = [...prevItems];
        newItems[index] = { ...newItems[index], rentDays: parseInt(rentDay) };
        return newItems;
    });
};

  const calculateProductsTotal = () => {
    let total = 0;
    items.forEach(item => {
      let d=item.rentDays
      if(!item.rentDays)
      d=1;

      total += (item.price*item.quantity + (item.price*item.quantity * 0.25))*d;

    });

        return Math.round(total);

  };

 

  const shipping=()=>{
 let totalQty=0;
        items.forEach(item=>{
          totalQty+=item.quantity;
        })
        // return totalQty*100;
            return Math.round((totalQty * 100) * 1.05);

  }
  const calculateTotal = () => {
    const productsTotal = parseFloat(calculateProductsTotal());
    let totalQty=0;
    items.forEach(item=>{
      totalQty+=item.quantity;
    })
    const shippingTotal = shipping();
    // setBill({...bill,['shipping']:shippingTotal});
    const total = productsTotal + shippingTotal;
    // return total.toFixed(2);
        return Math.ceil(total);

  };

   const order = () => {
    let checkRentday=false;
    items.map((item)=>{
      if(item.rentDays)
      checkRentday=true
    else
    checkRentday=false
    })
    if(checkRentday)
    setModalShow(true)
  else{
    Swal.fire({
      position: "middle",
      icon: "warning",
      title: "please enter for how many days you want Equipment",
      showConfirmButton: false,
      timer: 1500
    });
  }

  }



  const orderConfirm = () => {

    // setModalShow(true)

    console.log("inside order function")
    let total = parseFloat(calculateProductsTotal());
    let shippingCharge = shipping();
    let grandTotal = calculateTotal();
    let order = {
      total,
      shippingCharge,
      grandTotal,
       address,
      //  rentday
       
    }
    console.log("order in cart", order);
    
    if(address)
    navigate('/market/equipInvoice', { state: { order, items } });

    // to='/market/grainInvoice'
  }

  useEffect(() => {
    getCartitem({ token, email });
  }, [token]);

  return (
    <>
      <section className="h-100 gradient-custom w-100">
        <div className="container-fluid py-1">
          <div className="row d-flex my-0">
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header py-4">
                  <h5 className="mb-0">Equipment-Cart-{eCartcount}</h5>
                </div>
                <div className="card-body">
                  {items.map((cart, i) => (
                    <div className="row" key={i}>
                      <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                        <img src={`http://localhost:3000/${cart.image}`} className="w-100" style={{height:"25vh"}} alt="Product" />
                      </div>
                      <div className='col-9'>
                      <div className="row">
                      <div className="col-lg-7 col-md-6 mb-4 mb-lg-0">
                        <p><strong>{cart.productName}</strong></p>
                        <p>{cart.productDescription}</p>
                        <p>Rs. {(cart.price) + (cart.price) * (0.25)}</p>

                        <button type="button" className="btn btn-warning btn-sm me-1 mb-2" onClick={() => handleRemove(cart._id, cart.productId)}>
                          <i className="fas fa-trash"></i> Remove
                        </button>

                      </div>

                      <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
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
                        <input id='rent-day' type="text" className='border-1 w-50 mx-auto' placeholder='for how many days you want Equipment'
                      onChange={(e) => handleRent(e,i)} />
                      </div>
                      </div>

                     

                      <hr className="my-4" />
                    </div>
                  ))}

                </div>

              </div>
            </div>

            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Equipment-Cart Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Equipments
                      <span>${calculateProductsTotal()}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Shipping
                      <span>{shipping()}</span>
                    </li>
                    {/* <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Gst(5%)
                      <span>{gstTotal()}</span>
                    </li> */}
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                        <strong>
                          <p className="mb-0">(including shipping)</p>
                        </strong>
                      </div>
                      <span><strong>${calculateTotal()}</strong></span>
                    </li>
                  </ul>
                  <button type="button" className="btn btn-warning  btn-lg btn-block"  onClick={order}>  
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
          // days={(e)=>{setRentday(e.target.value)}}
        />
      </section>
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
          Enter nedded details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className=' mx-auto '>
        <h6 className='fw-bolder mt-1'> Enter Equipment shipping address</h6>
        <input type="text" name="" id="" placeholder='Enter Shipping Addrees' onChange={props.shipping} className='px-5 text-center' />
        {/* <h6 className='fw-bolder mt-2'>For How many days you want Eqiupment</h6>
        <input type="number" name="" id="" placeholder='Enter Shipping Addrees' onChange={props.days} className='px-5 text-center' /> */}

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} className='bg-danger border-0'>Close</Button>
        <Button onClick={props.order} className='bg-success'>Ok</Button>

      </Modal.Footer>
    </Modal>
  );
}