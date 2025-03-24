import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBlog } from '../context/BlogContext'

const values = {
  title: '',
  author: '',
  url: '',
}

function CreateNewForm() {
  const { newBlogMutation } = useBlog()
  const navigate = useNavigate()

  const [formData, setFormData] = useState(values)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    newBlogMutation.mutate(formData)
    setFormData(values)
    navigate('/blogs')
  }

  return (
    <form
      className='flex flex-col items-center justify-center gap-3'
      onSubmit={handleSubmit}
    >
      <div className='flex flex-col items-start justify-center gap-1'>
        <label className='font-semibold'>Title</label>
        <input
          required
          value={formData.title}
          onChange={handleInputChange}
          name='title'
          type='text'
          className='border rounded-md placeholder-gray-600'
        />
      </div>
      <div className='flex flex-col items-start justify-center gap-1'>
        <label className='font-semibold'>Author</label>
        <input
          required
          value={formData.author}
          onChange={handleInputChange}
          name='author'
          type='text'
          className='border rounded-md placeholder-gray-600'
        />
      </div>
      <div className='flex flex-col items-start justify-center gap-1'>
        <label className='font-semibold'>Url</label>
        <input
          required
          value={formData.url}
          onChange={handleInputChange}
          name='url'
          type='text'
          className='border rounded-md placeholder-gray-600'
        />
      </div>
      <div className='flex gap-5'>
        <button
          className='cursor-pointer rounded-md p-1 text-sm border bg-green-500 hover:bg-green-600 w-25'
          type='submit'
        >
          Create New
        </button>
        <button
          className='cursor-pointer rounded-md p-1 text-sm border bg-red-500 hover:bg-red-600 w-25'
          type='button'
          onClick={() => {
            setFormData(values)
            navigate('/blogs')
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default CreateNewForm
