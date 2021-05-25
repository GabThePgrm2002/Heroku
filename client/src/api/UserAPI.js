import React, {useState, useEffect} from 'react'
import axios from 'axios'
import swal from 'sweetalert';


function UserAPI(token) {

    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])

    useEffect(() => {
        if(token){
            const getUser = async () => {
                try{
                    const res = await axios.get('/user/info', {
                        headers: {Authorization: token}
                    })

                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

                    setCart(res.data.cart);

                }catch(err){
                    alert(err.response.data.msg);
                }
            }
            getUser();
        }
    }, [token])


    const addCart = async (product) => {
        if(!isLogged) return swal({
            title: "Message from ArvaZon!",
            text: "You must log in in order to continue shopping!",
            icon: "warning",
            button: true,
          })

        const check = cart.every(item => {
            return item._id !== product._id;
        })

        if(check){
            setCart([...cart, {...product, quantity: 1}]);
            swal({
                title: "Message from ArvaZon!",
                text: "Product has been added to cart!",
                icon: "success",
                button: true,
              })
            await axios.patch('/user/addcart', {cart: [...cart, {...product, quantity: 1}]},{
                headers: {Authorization: token}
                
        })
        }else{
            swal({
                title: "Message from ArvaZon!",
                text: "Product is already in the cart!",
                icon: "success",
                button: true,
                dangerMode: false
              })    
        }

    }


    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart,
        history: [history, setHistory],
    }
}

export default UserAPI
