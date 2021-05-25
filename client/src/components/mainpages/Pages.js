import React, {useContext} from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './auth/Login'
import Detailproduct from './detailProduct/DetailProduct'
import Register from './auth/Register'
import OrderHistory from './history/OrderHistory'
import OrderDetails from './history/OrderDetails'
import Cart from './cart/Cart'
import Products from './products/Products'
import NotFound from './utils/not_found/NotFound'
import Categories from './categories/Categories'
import {GlobalState} from '../../GlobalState'
import CreateProduct from './createProduct/CreateProduct'

function Pages(){

    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin


    return (
        
        <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/detail/:id" exact component={Detailproduct} />
            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/register" exact component={isLogged ? NotFound : Register} />
            <Route path="/category" exact component={isAdmin ? Categories : NotFound} />
            <Route path="/create_product" exact component={isAdmin ? CreateProduct : NotFound} />
            <Route path="/edit_product/:id" exact component={isAdmin ? CreateProduct : NotFound} />
            <Route path="/history" exact component={isLogged ? OrderHistory : NotFound} />
            <Route path="/history/:id" exact component={isLogged ? OrderDetails : NotFound} />
            <Route path="/cart" exact component={isLogged ? Cart : Products} />
            <Route path="*" exact component={NotFound} />
        </Switch>
    )
}

export default Pages;