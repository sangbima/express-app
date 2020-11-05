import React from 'react'
import Axios from 'axios'
// import { useHistory } from 'react-router-dom'

const List = () => {
  const [products, setProducts] = React.useState([])
  // const history = useHistory()

  React.useEffect(() => {
    Axios.get('http://localhost:3000/products')
    .then(response => {
      const { status, message, data } = response.data
      if (status === 'success') {
        setProducts(data)
      } else {
        alert(message)
      }
    })
    .catch(error => {
      alert(error)
    })
  }, [])
  return <>
    <h2>Halaman List Product</h2>
    <a href="/product/create">+ Create</a>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        { products && products.map((product, index) => {
          return <tr key={index}>
            <td><a href={`/product/single/${product._id}`}>{product.name}</a></td>
            <td className="center">{product.price}</td>
            <td className="center">{product.stock}</td>
            <td className="center"><a href={`/product/update/${product._id}`}>Update</a></td>
          </tr>
        })}
      </tbody>
    </table>
  </>
}

export default List