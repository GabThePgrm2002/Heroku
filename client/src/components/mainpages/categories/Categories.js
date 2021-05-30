import React, {useState, useContext, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import swal from 'sweetalert';
import axios from 'axios'
import AOS from 'aos';
import "aos/dist/aos.css";

function Categories() {
    
    useEffect(() => {
        AOS.init({});
    })

    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories
    const [category, setCategory] = useState('')
    const [token] = state.token
    const [callback, setCallback] = state.categoriesAPI.callback
    const [onEdit, setOnEdit] = useState(false)
    const [id, setId] = useState('')

    const createCategory = async e => {
        e.preventDefault();
        try{
            if(onEdit){
                const res = await axios.put(`/api/category/${id}`, {name: category}, {
                    headers: {Authorization: token}
                })
                swal({
                    title: "Message from ArvaZon!",
                    text: "Category updated!",
                    icon: "success",
                    button: true,
                  })
            }else{
                const res = await axios.post('/api/category', {name: category}, {
                    headers: {Authorization: token}
                })
                swal({
                    title: "Message from ArvaZon!",
                    text: "Category created!",
                    icon: "success",
                    button: true,
                  })
            }
            setOnEdit(false)
            setCallback(!callback)
                setCategory('')
            
        }catch(err){
            swal({
                title: "Message from ArvaZon!",
                text: err.response.data.msg,
                icon: "warning",
                button: true,
              })
        }
    }

    const editCategory = async (name,id) => {
        setId(id)
        setCategory(name)
        setOnEdit(true)
    }

    const deleteCategory = async (id) => {
        try {
            const res = await axios.delete(`/api/category/${id}`, {
                headers: {Authorization: token}
            })
            setCallback(!callback)
            if(swal({
                title: "Message from ArvaZon!",
                text: "Category deleted successfully!",
                icon: "success",
                button: true,
              }));
        } catch (err) {
            swal({
                title: "Message from ArvaZon!",
                text: err.response.data.msg,
                icon: "warning",
                button: true,
              })
        }
    }


    return (
        <React.Fragment>
        <div className="container mt-100">
        <h2 data-aos="fade-in" className="page-title mt-200">Manage Categories</h2>
            <form data-aos="zoom-in" className="bg-white p-50 border-radius" onSubmit={createCategory}>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input className="form-control" type="text" name="category" value={category} required onChange={e => setCategory(e.target.value)} />
                </div>
                    <div data-aos="zoom-in" data-aos-delay="300" className="form-group text-center">
                    <button className="form_btn" type="submit">{onEdit ? "Update Category": "Create Category"}</button>
                    </div>
            </form>
        </div>

        <div data-aos="zoom-in" className="container bg-white mt-100 text-center p-50 border-radius">
            <h2 className="mt20">Categories List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Category Name</th>
                        <th>Edit Category</th>
                        <th>Delete Category</th>
                    </tr>
                </thead>
                <tbody>
                {
                categories.map(category =>(
                   <tr key={category._id}>
                       <td>{category.name}</td>
                       <td>
                       <button className="btn-edit" onClick={() => editCategory(category.name, category._id)}><FontAwesomeIcon icon={faEdit}  size="2x" title="Edit category" /></button>
                       </td>
                       <td>
                       <button className="btn-delete" onClick={() => deleteCategory(category._id)}><FontAwesomeIcon icon={faTrashAlt}  size="2x" title="Delete category" /></button>
                       </td>
                   </tr> 

                ))
            }
                </tbody>
            </table>
        </div>
        </React.Fragment>
    )
}

export default Categories
