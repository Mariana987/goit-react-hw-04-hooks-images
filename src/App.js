import { useState } from 'react';
import './App.module.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Searchbar from './components/Searchbar'
import ImageGallery from './components/ImageGallery';



export default function App() {
  const [pictureName, setPictureName] = useState('')


  // const handleFormSubmit = pictureName => {
  //   setPictureName(pictureName)
  // }


  return (
    <div>
      <Searchbar onSubmitProp={setPictureName} />
      <ImageGallery pictureName={pictureName} />
      <ToastContainer autoClose={3000} />
    </div>
  );

}



