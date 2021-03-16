import React, { useEffect, useState, createContext } from 'react';
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
    }
}))
export default function Autocomplete() {
    const classes = useStyles();
    const [countries, setCountries] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [text, setText] = useState('');
    const [descriptionCountries, setDescriptionCountries] = useState([]);   //ESTE HOOK HAY QUE MODIFICAR DESDE CardTimeZone.js
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
    }, [])

    const onTextChanged = (event) => {
        const value = event.target.value;
        let suggestionsAux = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestionsAux = countries.sort().filter(v => regex.test(v));
        }
        setSuggestions(suggestionsAux);
        setText(value);
    }

    const suggestionSelected = (value) => {
        setText(value);
        setSuggestions([]);
        const country1 = [{ time: '21:25 PM', date: '19/03/2021', id: uuidv4(), name: value }]
        setCard(true);
        setText("");
        setDescriptionCountries([...descriptionCountries, ...country1]);
    }

    const renderSuggestions = () => {
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul>
                {suggestions.map((item) => <li key={uuidv4()} onClick={() => suggestionSelected(item)}>{item}</li>)}
            </ul>
        );
    }

    const removeCountry = (id) => {
        const newArrayCountries = descriptionCountries.filter((user) => user.id !== id);
        setDescriptionCountries(newArrayCountries);
    }

    var itemsArray = [];
    if (card) {
        descriptionCountries.map((country) => {
            itemsArray.push(<li className="grid-item" key={country.id} >
                <CardTimeZone time={country.time} date={country.date} id={country.id} name={country.name} delete={removeCountry} /></li>)
        })
    }
    return (

        <div>
            {load ? <CircularProgress /> : <div>
                <div className="grid-header-search">
                    <div className="grid-item-search" ><input className={classes.input} value={text} onChange={onTextChanged} type="text" placeholder="Search" /></div>
                </div>
                <div>
                    {renderSuggestions()}
                </div>
                {descriptionCountries.length > 0 &&
                    <ul className="background:#a6dced" className="grid-card">
                        {itemsArray}
                    </ul>
                }
            </div>}
        </div>
    );
}