import { useState } from "react"
import Popular from './Popular'
import { useGlobalContext } from "../context/Global"
import { styled } from "styled-components"
import Airing from "./Airing"
import Upcoming from "./Upcoming"


const Home = () => {

    const {handleChange , handleSubmit , search , getAiringAnime , getUpcomingAnime} = useGlobalContext()
    const [rendered , setRendered ] = useState('popular')

    const switComponents = ()=>{
        switch(rendered){
            case 'popular':
            return <Popular rendered={rendered} />
            case 'airing':
            return <Airing rendered={rendered} />
            case 'upcoming':
            return <Upcoming rendered={rendered} />
            default:
                return <Popular rendered={rendered} />
        }
    }
  return (
    <HomeStyled>
    <header>
        <div className="logo">
            <h1>
                {rendered === 'popular' ? 'Popular Anime' : 
                rendered === 'airing' ? 'Airing Anime' : 'Upcoming Anime' }
            </h1>
        </div>
        <div className="search-container">
            <div className="filter-btn popular-filter">
                <button onClick={()=>{
                    setRendered('popular')
                }}>Popular</button>
            </div>
            <form action="" className="search-form">
                <div className="input-control">
                <input type="text" placeholder="Search Anime" value={search} onChange={handleChange} />
                <button type="submit" onClick={handleSubmit}>Serach</button>
                </div>
            </form>
            <div className="filter-btn airing-filter">
                <button onClick={()=>{
                    setRendered('airing')
                    getUpcomingAnime()
                }}>Airing</button>
            </div>
            <div className="filter-btn upcoming-filter">
                <button onClick={()=>{
                    setRendered('upcoming')
                    getAiringAnime()
                }}>Upcoming</button>
            </div>
        </div>
    </header>
    {switComponents()}
    </HomeStyled>
  )
}

const HomeStyled = styled.div`
header{
    padding: 2rem 2rem;
    width: 62%;
    margin: 0 auto;
    transition: all 0.4s ease-in-out;
    .logo{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 2rem;
    }
    .search-container{
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
            button{
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.7rem 1.5rem;
                outline: none;
                border-radius: 30px;
                font-size: 1.2rem;
                cursor: pointer;
            }
            form{
                position: relative;
                width: 100%;
                .input-control{
                    width: 100%;
                    display: flex;
                    position: relative;
                    transition: all .4s ease-in-out;
                }
                .input-control input{
                    width: 100%;
                    padding: 0.7rem 1rem;
                    border: none;
                    outline: none;
                    border-radius: 30px;
                    font-size: 1.2rem;
                    border: 1px solid #e5e7eb;
                    transition: all .4s ease-in-out;
                }
                .input-control button{
                    position: absolute;
                    top: 50%;
                    right: 0;
                    transform: translateY(-50%);
                }
            }
        }


         @media screen and (max-width:767px) {
         .logo{
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: .7rem;
         }
         .search-container{
            gap: 1rem;
            display: flex;
            flex-direction: column;
            button{
                padding: 0.5rem .5rem;
            }
         }
         form{
                position: relative;
                width: 100%;
                .input-control{
                    width: 100%;
                    display: flex;
                    position: relative;
                    transition: all .4s ease-in-out;
                }
                .input-control input{
                    width: 100%;
                    padding: 0.7rem 1rem;
                    border: none;
                    outline: none;
                    border-radius: 30px;
                    font-size: 1.2rem;
                    border: 1px solid #e5e7eb;
                    transition: all .4s ease-in-out;
                }
                .input-control button{
                    position: absolute;
                    top: 50%;
                    right: 0;
                    transform: translateY(-50%);
                }
            }
         
        }
        
        @media screen and (min-width: 768px) and (max-width: 1023px) {
         .logo{
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: .7rem;
         }
         .search-container{
            gap: 1rem;
            button{
                padding: 0.5rem .5rem;
            }
         }
         form{
                position: relative;
                width: 100%;
                .input-control{
                    width: 100%;
                display: flex;
                    position: relative;
                    transition: all .4s ease-in-out;
                }
                .input-control input{
                    width: 100%;
                    padding: 0.7rem 1rem;
                    border: none;
                    outline: none;
                    border-radius: 30px;
                    font-size: 1.2rem;
                    border: 1px solid #e5e7eb;
                    transition: all .4s ease-in-out;
                }
                .input-control button{
                    position: absolute;
                    top: 50%;
                    right: 0;
                    transform: translateY(-50%);
                }
            }
         
        }
        @media only screen and (min-width: 1024px) and (max-width: 1365px) {

            header{
    padding: 2rem 2rem;
    width: 62%;
    margin: 0 auto;
    transition: all 0.4s ease-in-out;
    .logo{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 2rem;
    }
    .search-container{
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
            button{
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.7rem 1.5rem;
                outline: none;
                border-radius: 30px;
                font-size: 1.2rem;
                cursor: pointer;
            }
            form{
                position: relative;
                width: 100%;
                .input-control{
                    width: 100%;
                    display: flex;
                    position: relative;
                    transition: all .4s ease-in-out;
                }
                .input-control input{
                    width: 100%;
                    padding: 0.7rem 1rem;
                    border: none;
                    outline: none;
                    border-radius: 30px;
                    font-size: 1.2rem;
                    border: 1px solid #e5e7eb;
                    transition: all .4s ease-in-out;
                }
                .input-control button{
                    position: absolute;
                    top: 50%;
                    right: 0;
                    transform: translateY(-50%);
                }
            }
        }


}
}
}
`


export default Home
