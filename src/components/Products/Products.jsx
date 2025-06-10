import React,{useEffect} from 'react'

export default function Products() {
  useEffect(()=>{
    document.title = "products";
    window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
  },[]) 
  return (
    <div>
      products
    </div>
  )
}
