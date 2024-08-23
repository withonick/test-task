import { useState, useEffect } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  const [data, setData] = useState(null)
  const [categories, setCategories] = useState([])

  const fetchData = async () => {
    const response = await axios.get('http://localhost:3000/transactions')
    setData(response.data)
  }

  const fetchCategories = async () => {
    const response = await axios.get('http://localhost:3000/transactions/categories')
    setCategories(response.data)
  }

  useEffect(() => {
    fetchData()
    fetchCategories()
  }, [])

  const insertData = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const formValues = Object.fromEntries(formData.entries())

    try {
      await axios.post('http://localhost:3000/transactions', formValues)
      e.target.reset()
      
      fetchData()

    } catch (error) {
      console.error('Insert error:', error)
    }
  }

  return (
    <> 
      <div className="container d-flex flex-column justify-content-center p-4">
      
        <div className="mb-4">
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#dataModal">Добавить</button>
        </div>

        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Дата</th>
              <th scope="col">Автор</th>
              <th scope="col">Сумма</th>
              <th scope="col">Категория</th>
              <th scope="col">Комментарий</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((item, index) => (
              <tr key={index}>
                <td scope="row">{item.datetime}</td>
                <td>{item.author}</td>
                <td>{item.sum}</td>
                <td>{item.category}</td>
                <td>{item.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="modal fade" id="dataModal" tabIndex="-1" aria-labelledby="dataModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="dataModalLabel">Добавить транзакцию</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={insertData}>
                <div className="mb-3">
                  <label htmlFor="dateTime" className="form-label">Дата</label>
                  <input  
                    type="date" 
                    name="dateTime" 
                    className="form-control" 
                    id="dateTime" 
                    min="2024-01-01"
                    max="2030-12-31" />
                </div>

                <div className="mb-3">
                  <label htmlFor="author" className="form-label">Автор</label>
                  <input 
                    type="text" 
                    name="author" 
                    className="form-control" 
                    id="author" />
                </div>

                <div className="mb-3">
                  <label htmlFor="sum" className="form-label">Сумма</label>
                  <input 
                    type="number" 
                    name="sum" 
                    className="form-control" 
                    id="sum" />
                </div>

                <div className="mb-3">
                  <label htmlFor="category" className="form-label">Категория</label>
                  <select 
                    name="category" 
                    className="form-control" 
                    id="category">
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="comment" className="form-label">Комментарий</label>
                  <textarea 
                    className="form-control" 
                    name="comment" 
                    id="comment" 
                    rows="3">
                  </textarea>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                  <button type="submit" className="btn btn-primary">Записать</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
