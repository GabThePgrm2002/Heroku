import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import swal from 'sweetalert';
import HashLoader from "react-spinners/HashLoader";
import {useParams} from 'react-router-dom'

const initialState = {
    product_id: '',
    title: '',
    price: 0,
    description: '',
    content: '',
    category: '',
    _id: ''
}


function CreateProduct() {

    const state = useContext(GlobalState)
    const [product, setProduct] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [images, setImages] = useState(false)
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [loading, setLoading] = useState(false);
    const [color, setColor] = useState("#157A3F");
    const [products] = state.productsAPI.products
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.categoriesAPI.callback

    const param = useParams()

    useEffect(() => {
        if(param.id){
            setOnEdit(true)
            products.forEach(product => {
                if(product._id === param.id){
                    setProduct(product)
                    setImages(product.images)
                } 
            })
        }else{
            setOnEdit(false)
            setProduct(initialState)
            setImages(false)
        }
    }, [param.id, products])
    

    const handleUpload = async e => {
        e.preventDefault();
        try {
            if(!isAdmin) return (swal({
                title: "Message from ArvaZon!",
                text: "You're not an Admin!",
                icon: "warning",
                button: true,
              }))

              const file = e.target.files[0]
              
              if(!file) return (swal({
                title: "Message from ArvaZon!",
                text: "Files does not exists!",
                icon: "warning",
                button: true,
              }))

              if(file.size > 1024 * 1024) // 1mb
              return (swal({
                title: "Message from ArvaZon!",
                text: "File size too large!",
                icon: "warning",
                button: true,
              }))

              if(file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
              return (swal({
                title: "Message from ArvaZon!",
                text: "Invalid file format!",
                icon: "warning",
                button: true,
              }))

              let formData = new FormData()
              formData.append('file', file)

            setLoading(true)
              const res = await axios.post('/api/upload', formData, {
                  headers: {
                    'content-type': 'multipart/form-data',  
                    Authorization: token}
              })

              setImages(res.data)
              setLoading(false)
              
        

            
        } catch (err) {
            swal({
                title: "Message from ArvaZon!",
                text: err.response.data.msg,
                icon: "warning",
                button: true,
              })
        }
    }

    const handleDestroy = async () => {
        try {
            if(!isAdmin) return (swal({
                title: "Message from ArvaZon!",
                text: "You're not an Admin!",
                icon: "warning",
                button: true,
              }))
            setLoading(true)
              await axios.post('/api/destroy', {public_id: images.public_id}, {
                  headers: {Authorization: token}
              })
              setImages(false)
            setLoading(false)


        } catch (err) {
            swal({
                title: "Message from ArvaZon!",
                text: err.response.data.msg,
                icon: "warning",
                button: true,
              })    
        }
    }

    const handleChangeInput = e => {
        const {name, value} = e.target;
        setProduct({...product, [name]: value})
    }

    const handleSubmit = async e => {
        e.preventDefault();
        
        try {

            if(!isAdmin) return (swal({
                title: "Message from ArvaZon!",
                text: "You're not an Admin!",
                icon: "warning",
                button: true,
              }))
              if(!images) return (swal({
                title: "Message from ArvaZon!",
                text: "No image uploaded!",
                icon: "warning",
                button: true,
              }))

              if(onEdit){
                await axios.put(`/api/products/${product._id}`,{...product, images},{
                    headers: {Authorization: token}
                })
              }else{
                await axios.post('/api/products',{...product, images},{
                    headers: {Authorization: token}
                })
              }
              
              setCallback(!callback)
              window.location.href = "/";
            
        } catch (err) {
            swal({
                title: "Message from ArvaZon!",
                text: err.response.data.msg,
                icon: "warning",
                button: true,
              })
        }
    }

    const styleUpload = {
        display: images ? "block": "none"
    }

    return (
        <>
        <div className="container mt-100">
        <h2 className="page-title mt-200">Manage Product</h2>

            <form className="bg-white p-50 border-radius" onSubmit={handleSubmit}>
            <label htmlFor="file">Image</label>
            <div className="upload">
                <input className="form-control" type="file" name="file" id="file_up" onChange={handleUpload} />
                
                {
                    loading ? <div id="file_loader">
                        <HashLoader color={color} loading={loading} size={150} />
                    </div>
                     : 
                    <div id="file_img" style={styleUpload}>
                        <img src={images ? images.url : ''} />
                        <span onClick={handleDestroy}>X</span>
                    </div>
                }
                
            </div>

               <div className="form-group">
                  <label htmlFor="product_id">Product ID</label>
                  <input className="form-control" type="text" name="product_id" id="product_id" required value={product.product_id} onChange={handleChangeInput} disabled={product._id} />
               </div> 

               <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input className="form-control" type="text" name="title" id="title" required value={product.title} onChange={handleChangeInput} />
               </div> 

               <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <input className="form-control" type="number" name="price" id="price" required value={product.price} onChange={handleChangeInput} />
               </div> 

               <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea className="form-control" type="text" name="description" id="description" required value={product.description} rows="5" onChange={handleChangeInput} />
               </div> 

               <div className="form-group">
                  <label htmlFor="content">Content</label>
                  <textarea className="form-control" type="text" name="content" id="content" required value={product.content} rows="7" onChange={handleChangeInput} />
               </div> 

               <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select className="form-control" name="category" value={product.category} required onChange={handleChangeInput}>
                      {
                          categories.map(category => (
                              <option value={category._id} key={category._id}>
                                  {category.name}
                              </option>
                          ))
                      }
                  </select>
               </div> 

                <div className="form-group text-center">
                      <button className="form_btn" type="submit">{onEdit ? "Update Product" : "Create Product"}</button>
                </div>

            </form>

        </div>
        </>
    )
}

export default CreateProduct
