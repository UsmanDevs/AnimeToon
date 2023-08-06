import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { styled } from "styled-components";

const Anime = () => {
  const { id } = useParams();

  const [anime, setAnime] = useState({});
  const [character, setCharacter] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const {
    title,
    images,
    trailer,
    duration,
    synopsis,
    aired,
    season,
    rank,
    score,
    scored_by,
    popularity,
    status,
    rating,
    source,
  } = anime;

  const getAnime = async (anime) => {
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime/${anime}`);
      const data = await res.json();
      setAnime(data.data);
    } catch (error) {
      console.log(error);
    }
  };
 const getCharacter = async(anime)=>{
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}/characters`)
      const data = await response.json()
      setCharacter(data.data)
      console.log(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAnime(id);
    getCharacter(id)
  }, [id]);

  return (
    <>
      <AnimeItemStyle>
        <h1 className="title">{title}</h1>
        <div className="details">
        <div className="bg">
          <div className="detail">
            <div className="image">
              <img src={images?.jpg.large_image_url} alt="" />
            </div>
            <div className="anime-detail">
              <p>
                <span>Aired:</span> <span>{aired?.string}</span>{" "}
              </p>
              <p>
                <span>Rating:</span> <span>{rating}</span>{" "}
              </p>
              <p>
                <span>Ranking:</span> <span>{rank}</span>{" "}
              </p>
              <p>
                <span>Score:</span> <span>{score}</span>{" "}
              </p>
              <p>
                <span>Scored By:</span> <span>{scored_by}</span>{" "}
              </p>
              <p>
                <span>Popularity:</span> <span>{popularity}</span>{" "}
              </p>
              <p>
                <span>Status:</span> <span>{status}</span>{" "}
              </p>
              <p>
                <span>Score:</span> <span>{source}</span>{" "}
              </p>
              <p>
                <span>Season:</span> <span>{season}</span>{" "}
              </p>
              <p>
                <span>duration:</span> <span>{duration}</span>{" "}
              </p>
            </div>
          </div>
          <p className="description">
              {/* {showMore? synopsis : synopsis?.subString(0 , 450) + '....'}
              <button onClick={()=>{
                setShowMore(!showMore)
              }}>
              {showMore ? 'Show Less' : 'Read More'} </button> */}

              {showMore ? synopsis : synopsis?.slice(0, 450)}
              <button
                onClick={() => {
                  setShowMore(!showMore);
                }}
              >
                {showMore ? "Show Less" : "Read More" + "...."}{" "}
              </button>
            </p>
            </div>
          <h3 className="title">Trailer</h3>
          <div className="trailer">
            {trailer && trailer.embed_url && (
              <iframe src={trailer.embed_url}
               width={800} 
              height={400}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
               allowFullScreen></iframe>
            )}
          </div>
        </div>

        <h3 className="title">Character</h3>
        <div className="characters">
          {
            character.map((character , index) =>{
              const {role} = character;
              const {images , name , mal_id} = character.character;
              return <Link to={`/character/${mal_id}`}  key={index}>
                <div className="character">
                <img src={images.jpg.image_url} alt="" />
                <h4>{name}</h4>
                <p>{role}</p>
                </div>
              </Link>
            })
          }
        </div>

      </AnimeItemStyle>
    </>
  );
};

const AnimeItemStyle = styled.div`
padding: 3rem 8rem;
h1{
  margin-left: 7rem;
  font-size: 2rem;
  display: inline-block;
    transition: all .4s ease-in-out;
  &:hover{
    transform: skew(-15deg);
  }
}
.details{
  padding: 3rem 8rem;
}
.bg{
  background-color:   #1f1e1e;
}
.detail{
  display: flex;
  flex-direction: row;
  gap: 10rem;
}
.image{
  padding: 1rem 2rem;
}
.anime-detail p{
  padding-bottom: 1rem;
  span:nth-child(1){
    font-weight: bold;
    font-size: 1.2rem;
  }
  span:nth-child(2){
    margin-left: 1.5rem;
    color: silver;
  }
}
.description{
  padding: 1rem;
  color: silver;
  font-family: Arial, Helvetica, sans-serif;
  button{
    background: none;
    border: none;
    outline: none;
    font-size: 1.2rem;
    color: green;
    font-weight: 700;
    cursor: pointer;
  }
}
.title{
  background: linear-gradient(to right , #A855F7 , #27AE60);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2rem;   
}
.trailer{
  display: flex;
  justify-content: center;
}
.characters{
  display: grid;
  grid-template-columns: repeat(auto-fill , minmax(250px , 1fr));
  grid-gap: 2rem;
  background: #000000;
  padding: 1rem 1rem 1.5rem 1rem;
}
.characters{
  img{
    width: 100%;
  }
  h4{
    padding: 0.5rem 0;
    color: #454e56;
    text-decoration: none;
  }
  p{
    color: #27AE60;
  }
}
@media screen and (max-width: 767px) {
padding: 1rem 0;
  .title{
  font-size: 1rem;
  margin-left: 1rem;
}
  .details{
  padding: 3rem 0rem;
}
.bg{
  background-color:   #1f1e1e;
}
.detail{
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.image{
  padding: 1rem 1.2rem;
  img{
    width: 20rem;
  }
}
.anime-detail p{
  padding-bottom: 1rem;
  margin-left: 2rem;
}
}
@media screen and (min-width: 768px) and (max-width: 1023px) {
padding: 1rem 0;
  .title{
  font-size: 1rem;
  margin-left: 1rem;
}
  .details{
  padding: 3rem 0rem;
}
.bg{
  background-color:   #1f1e1e;
}
.detail{
  display: flex;
  flex-direction: row;
  gap: 10rem;
  padding: 1rem 2rem;
}
.image{
  padding: 1rem 1.2rem;
  img{
    width: 20rem;
  }
}
.anime-detail p{
  font-size: 1rem;
  padding-bottom: 1rem;
  margin-left: 2rem;
}
}
@media screen and (min-width: 1024px) and (max-width: 1365px) {
padding: 1rem 0;
  .title{
  font-size: 2rem;
  margin-left: 1rem;
}
  .details{
  padding: 3rem 0rem;
}
.bg{
  background-color:   #1f1e1e;
}
.detail{
  display: flex;
  flex-direction: row;
  gap: 20rem;
  padding: 1rem 2rem;
}
.image{
  padding: 1rem 1.2rem;
}
.anime-detail p{
  margin-left: 2rem;
  span:nth-child(1){
    font-weight: bold;
    font-size: 1.2rem;
  }
  span:nth-child(2){
    margin-left: 1.5rem;
    color: silver;
  }
}
}
@media only screen and (min-width: 1366px) and (max-width: 1680px) {

  padding: 3rem 0rem;
h1{
  margin-left: 7rem;
  font-size: 2rem;
  display: inline-block;
    transition: all .4s ease-in-out;
  &:hover{
    transform: skew(-15deg);
  }
}
.details{
  padding: 3rem 8rem;
}
.bg{
  background-color:   #1f1e1e;
}
.detail{
  display: flex;
  flex-direction: row;
  gap: 10rem;
}
.image{
  padding: 1rem 2rem;
}
.anime-detail p{
  padding-bottom: 1rem;
  span:nth-child(1){
    font-weight: bold;
    font-size: 1.2rem;
  }
  span:nth-child(2){
    margin-left: 1.5rem;
    color: silver;
  }
}
.description{
  padding: 1rem;
  color: silver;
  font-family: Arial, Helvetica, sans-serif;
  button{
    background: none;
    border: none;
    outline: none;
    font-size: 1.2rem;
    color: green;
    font-weight: 700;
    cursor: pointer;
  }
}
.title{
  background: linear-gradient(to right , #A855F7 , #27AE60);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2rem;   
}
.trailer{
  display: flex;
  justify-content: center;
}
.characters{
  display: grid;
  grid-template-columns: repeat(auto-fill , minmax(250px , 1fr));
  grid-gap: 2rem;
  background: #000000;
  padding: 1rem 1rem 1.5rem 1rem;
}
.characters{
  img{
    width: 100%;
  }
  h4{
    padding: 0.5rem 0;
    color: #454e56;
    text-decoration: none;
  }
  p{
    color: #27AE60;
  }
}
}


`



export default Anime;
