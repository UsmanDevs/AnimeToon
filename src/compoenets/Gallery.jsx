import { Link, useParams } from "react-router-dom"
import {useGlobalContext} from '../context/Global'
import { useEffect, useState } from "react"
import { styled } from "styled-components"

const Gallery = () => {
    const {getAnimePictures , pictures} =  useGlobalContext()
    const {id} =  useParams()

    const [index , setIndex]= useState(0)

    const handleImageClick = (i)=>{
        setIndex(i)
    }

    useEffect(()=>{
        getAnimePictures(id)
    },[])

  return (
    <GalleryStyled>
    <div className="back">
        <Link to='/'>Back</Link>
    </div>
    <div className="big-image">
    <img src={pictures[index]?.jpg.image_url} alt="" />
    </div>
    <div className="small-images">
        {pictures?.map((picture , i)=>{
                return <div className="image-con" onClick={()=>{
                    handleImageClick(index)
                }} key={i}>
                 <img src={picture.jpg.image_url} alt="" />   
                </div>
            })
        }
    </div>
    </GalleryStyled>
  )
}


const GalleryStyled = styled.div`
min-height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
.back{
    position: absolute;
    top: 2rem;
    left: 2rem;
    a{
        font-weight: 600;
        text-decoration: none;
        color: #EB5757;
    }
}

.big-image{
     display   : inline-block;
     padding: 2rem;
     margin: 2rem 0;
     background-color: #000;
     border-radius: 7px;
     position: relative;
     img{
        width: 350px;
     }
    }
.small-images{
    display: flex;
    flex-wrap: wrap;
    cursor: pointer;
    gap: .5rem;
    padding: 2rem;
    border-radius: 7px;
    border: 5px solid #e5e7eb;
    img{
        width: 10rem;
        height: 10rem;
        object-fit: cover;
        cursor: pointer;
        border-radius: 5px;
        border: 3px solid #e5e7eb;
    }
}
@media screen and (max-width:767px){
    
.big-image{
     margin: 5rem 0;
     img{
        width: 300px;
     }
    }
    .small-images{
    gap: 1rem;
    border: none;
    img{
        margin-left: 3.5rem;
        border: 1px solid #e5e7eb;
    }
}
    
}

`

export default Gallery
