import { useEffect, useState } from "react";
import './cocktail.css'

const Cocktail = () => {
    let [cocktails, setCocktails] = useState([])
    let [searchItem, setSearchItem] = useState('')
    let [searchInitial, setsearchInitial] = useState('l')
    let [loading, setLoading] = useState(false)
    let [isError, setError] = useState({
        status:false, 
        msg: ''
    })

    let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`
    //let url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'

    let fetchData = async(apiUrl) => {
        setLoading(true)
        setError({status:false, msg: ''})
        try {
            let response = await fetch(apiUrl)
            let {drinks} = await response.json()
            setCocktails(drinks)
            setLoading(false)
            setError({status:false, msg: ''})
            //console.log(cocktails)
            if(!cocktails){
                throw new Error('data not found')
            }
        } catch (error) {
            setLoading(false)
            setError({status:true, msg: error.message || 'somting went worng'})
        }
    }

    useEffect(() => {
        let currectUrl = `${url}${searchInitial}`
        searchItem ? currectUrl = `${url}${searchItem}` : `${url}${searchInitial}`
        fetchData(currectUrl)
    }, [searchItem])
    
    return (
        <>
            <div className="container">
                <h1 >cocktails</h1>
                <input type="text" placeholder="search your favorite cocktail" value={searchItem}
                    onChange={(e)=>{setSearchItem(e.target.value)}}
                    // ref={searchItem}
                />
            </div>
            <hr/>
            <div className="loading">
                {loading && !isError?.status && <h3 className="loader"></h3>}
            {isError?.status && <h3 style={{textAlign: 'center', color: 'tomato'}}>{isError.msg}</h3>}
            </div>
            
            {!loading && !isError?.status && (
                <div className="box wrapper">
                {
                    cocktails && cocktails.map((cocktail) => {
                        const {idDrink, strDrink, strCategory, strDrinkThumb, strGlass, strAlcoholic} = cocktail
                        return <li className="boxContainer" key={idDrink}>
                                    <div>
                                        <img width= '300px' src={strDrinkThumb} alt={strDrink} />
                                    </div>
                                    <div>
                                        <h2>{strDrink}</h2>
                                        <strong>{strGlass}</strong>
                                        <p style={{color: 'gray'}}><i>-{strAlcoholic}-</i></p>
                                    </div>
                                </li>
                    })
                }
            </div>
            )}
        </>
    )
}

export default Cocktail;