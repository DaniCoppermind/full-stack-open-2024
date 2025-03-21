import React, { useState } from 'react'

// type blog = {
//   title: String,
//   author: String,
//   url: String,
//   likes: Number,
//   user: {
//     username: String,
//     name: String,
//     id: String
//   }
//   id: String,
// }

const BlogCard = ({ blog }) => {
  // const [isShow, setisShow] = useState(false)

  return (
    <div className='border rounded-md p-2'>
      <a className='underline' href='#'>
        {blog.title}
      </a>
    </div>
  )
}

export default BlogCard

{
  /* <div className='border rounded-md p-2'>
<div className='flex gap-2'>
  <h3>{blog.title}</h3>
  <button
    className='text-xs rounded-md border p-1 cursor-pointer'
    onClick={() => setisShow(!isShow)}
  >
    Show More Details
  </button>
</div>
{isShow && (
  <div>
    <p className='font-semibold'>{blog.author}</p>
    <a
      className='underline text-rose-400'
      href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      target='blank'
    >
      {blog.url}
    </a>
    <div className='flex gap-1 items-center'>
      <p>Likes: {blog.likes}</p>
      <button className='cursor-pointer border rounded-md px-1 text-sm text-white bg-blue-600'>
        Like
      </button>
    </div>
  </div>
)}
</div> */
}
