import React, { useEffect } from 'react'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import RecentProducts from '../RecentProducts/RecentProducts'

export default function Home() {
 
useEffect(()=>{
  document.title = "Home";
  window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
},[]) 
  return (
  <>
  <MainSlider />
  <CategorySlider />
  <RecentProducts />
  </>
  )
}
