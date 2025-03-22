import { useState } from 'react'
import { useBlog } from '../context/BlogContext'

const values = {
  title: '',
  author: '',
  url: '',
}

function CreateNewForm() {
  const { newBlogMutation } = useBlog()
  const [formCreate, setFormCreate] = useState(false)

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
    setFormCreate(false)
  }

  if (!formCreate) {
    return (
      <button
        onClick={() => setFormCreate(true)}
        className='cursor-pointer rounded-md p-1 text-sm border hover:bg-amber-200'
      >
        Create new
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col'>
        <label className='font-semibold'>Title</label>
        <input
          value={formData.title}
          onChange={handleInputChange}
          name='title'
          type='text'
          className='border rounded-md placeholder-gray-600'
        />
      </div>
      <div className='flex flex-col'>
        <label className='font-semibold'>Author</label>
        <input
          value={formData.author}
          onChange={handleInputChange}
          name='author'
          type='text'
          className='border rounded-md placeholder-gray-600'
        />
      </div>
      <div className='flex flex-col'>
        <label className='font-semibold'>Url</label>
        <input
          value={formData.url}
          onChange={handleInputChange}
          name='url'
          type='text'
          className='border rounded-md placeholder-gray-600'
        />
      </div>
      <div className='flex gap-2 mt-2 items-center justify-center'>
        <button
          className='cursor-pointer rounded-md p-1 text-sm border bg-green-500 hover:bg-green-600'
          type='submit'
        >
          Create New
        </button>
        <button
          className='cursor-pointer rounded-md p-1 text-sm border bg-red-500 hover:bg-red-600'
          type='button'
          onClick={() => setFormCreate(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default CreateNewForm
