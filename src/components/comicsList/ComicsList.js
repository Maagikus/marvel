import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import useMarvelService from "../../services/MarverService";
import Error from "../error/Error";
import Spinner from "../spinner/spinner";

const ComicsList = () => {



    const [comics, setComicsList] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(0)
    const [comicsEnded, setComicsEnded] = useState(false)

    useEffect(()=>{
        onRequest(offset, true)
    },[])
    const  {loading, error, getAllComics} = useMarvelService()
    const onRequest = (offset, initial) => {
        initial ?  setNewItemLoading(false) :  setNewItemLoading(true)
        getAllComics(offset)
            .then(onComicsListLoaded)
    }
    const onComicsListLoaded = (newComicsList) =>{
        let ended = false
        if(newComicsList.length < 8){
            ended = true
        }
        setComicsList(comics => [...comics, ...newComicsList])
        setNewItemLoading(false)
        setOffset(offset => offset + 9)
        setComicsEnded(comicsEnded => ended)
    }
    function renderItems(arr) {
        const items = arr.map((item, i) => {
            return(
                <li className="comics__item" key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }
    const items = renderItems(comics)
    const errorMessage = error ? <Error/> : null
    const spinner = loading && !newItemLoading ? <Spinner/> : null






    return (

        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button
                disabled={newItemLoading}
                style={{'display' : comicsEnded ? 'none' : 'block'}}
                className="button button__main button__long"
                onClick={() => onRequest(offset)}
                >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;