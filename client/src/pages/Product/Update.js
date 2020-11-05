import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Axios from 'axios'

const Update = () =>{
  const history = useHistory()
  const { productId } = useParams()
  const [product, setProduct] = React.useState({
    name: '',
    price: 0,
    stock: 1,
    status: true
  })

  React.useEffect(() => {
    Axios.get(`http://localhost:3000/products/${productId}`)
      .then(response => {
        const { status, message, data } = response.data
        if (status === 'success') {
          setProduct(data)
        } else {
          alert(message)
        }
      })
      .catch(error => {
        alert(error)
      })
  }, [productId])

  const handleChange = (e, name) => {
    const value = e.target.value
    setProduct({ ...product, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await Axios.put(`http://localhost:3000/products/${productId}`, product)
      const { status, message } = response.data
      if (status === 'success') {
        alert(message)
        history.push('/product')
      } else {
        alert(message)
      }
    } catch (error) {
      alert('Network error')
    }
  }

  return (
    <>
      <h2>Halaman Form Update Product</h2>
      <form>
        <label>Name </label>
        <input type="text" size={50} value={product.name} onChange={(e) => handleChange(e, 'name')} />
        <label>Price </label>
        <input type="number" value={product.price} onChange={(e) => handleChange(e, 'price')} />
        <label>Stock </label>
        <input type="number" size={50} value={product.stock} onChange={(e) => handleChange(e, 'stock')} />
        <label>Status </label>
        <select value={product.status} onChange={(e) => handleChange(e, 'status')}>
          <option value={false}>Off</option>
          <option value={true}>On</option>
        </select>
        <label></label>
        <button onClick={ handleSubmit }>Submit</button>
      </form>
      <button onClick={() => history.push('/product')}>&laquo; Back</button>
    </>
  )
}

export default Update
