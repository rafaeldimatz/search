import React, { useEffect, useState, createContext } from 'react';
import Button from '@material-ui/core/Button';
import { fade, makeStyles } from '@material-ui/core/styles';
import CardTimeZone from './CardTimeZone';
import '../App.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme) => ({

    box: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: '5px',
        width: '100%',
        border: '1px solid red'
    },
    input: {
        width: '95%',
        height: '40px',
        boxShadow: '0px 0px 6px 1px rgba(0, 0, 0, .6)',
        borderRadius: '10px',
        border: 'none',
        paddingLeft: '15px',
        outline: 'none',
        margin: '10px'
    },
    button: {
        alignSelf: 'center',
        margin: '5px'
    },


}))
export default function Autocomplete() {
    const classes = useStyles();
    const [countries, setCountries] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [text, setText] = useState('');
    const [descriptionCountries, setDescriptionCountries] = useState([]);   //ESTE HOOK HAY QUE MODIFICAR DESDE CardTimeZone.js
    const [searchWord, setSearchWord] = useState('');
    const [card, setCard] = useState(false);
    const [load, setLoad] = useState(true);

    useEffect(function () {
        const url = process.env.REACT_APP_TIMEZONE;
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setCountries(data);
                setLoad(false);
            })
            .catch((err) => console.log('Error:' + err))
    }, [descriptionCountries])

    const handleClickSearch = (searchWord) => {
        setCard(true);

        const country1 = [{ time: '21:25 PM', date: '19/03/2021', id: uuidv4(), name: 'Argentina' }]
        const country2 = [{ time: '22:25 PM', date: '20/03/2021', id: uuidv4(), name: 'Francia' }]
        const country3 = [{ time: '13:25 PM', date: '21/03/2021', id: uuidv4(), name: 'Alemania' }]
        const country4 = [{ time: '8:25 AM', date: '22/03/2021', id: uuidv4(), name: 'España' }]
        const country5 = [{ time: '22:50 PM', date: '23/03/2021', id: uuidv4(), name: 'Brasil' }]
        setDescriptionCountries([...country1, ...country2, ...country3, ...country4, ...country5]);
    }

    const onTextChanged = (event) => {
        const value = event.target.value;
        setCard(false)
        setSearchWord(value)
        setDescriptionCountries([]);
        let suggestionsAux = [];
        if (value.length > 0) {
            setCard(false);
            const regex = new RegExp(`^${value}`, 'i');
            suggestionsAux = countries.sort().filter(v => regex.test(v));
        } else {
            setCard(true);
        }
        setSuggestions(suggestionsAux);
        setText(value);
    }

    const suggestionSelected = (value) => {
        setText(value);
        setSearchWord(value);
        setSuggestions([]);
    }

    const renderSuggestions = () => {
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <div className="srchList">
                <ul>
                    {suggestions.map((item) => <li key={uuidv4()} onClick={() => suggestionSelected(item)}>{item}</li>)}
                </ul>
            </div>
        );
    }

    const removeCountry = (id) => {
        const newArrayCountries = descriptionCountries.filter((user) => user.id !== id);
        setDescriptionCountries(newArrayCountries);
    }


    var itemsArray = [];
    if (card) {
        descriptionCountries.map((country) => {
            itemsArray.push(<li className="flex-item" key={country.id} >
                <CardTimeZone time={country.time} date={country.date} id={country.id} name={country.name} delete={removeCountry} /></li>)
        })
    }
    return (

        <div>
            {load ? <CircularProgress /> : <div>
                <div className="flex-search">
                    <div className="flex-itemsearch"><input className={classes.input} value={text} onChange={onTextChanged} type="text" placeholder="Search" /></div>
                    <div className="flex-itemsearch" className={classes.button} ><Button size="small" onClick={() => handleClickSearch(searchWord)} variant="contained" >Search</Button>
                    </div>
                </div>
                <div>
                    {renderSuggestions()}
                </div>
                {descriptionCountries.length > 0 ?

                    <ul className="background:grey" className="flex-container">

                        {itemsArray}

                    </ul> : ""

                }
            </div>}
        </div>

    );
}