import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import InfoCards from './components/InfoCards/InfoCards';
import Map from './components/Map/Map';
import Table from './components/Table/Table';


function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])


  // Load all Country
  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/countries')
      .then(res => res.json())
      .then(data => {

        setCountries(data)
        // for set table
        setTableData(data)
      })
  }, [])


  // load all country Info
  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then(res => res.json())
      .then(data => setCountryInfo(data))
  }, [])


  // handle country change
  const handleCountryChange = (e) => {
    const countryCode = e.target.value
    console.log(countryCode)

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode.country}`
    console.log(url)

    fetch(url)
      .then(res => res.json())
      .then(data => {
        // set a single/specific country
        setCountry(countryCode)

        // all country info
        setCountryInfo(data)
      })
  }



  console.log(countryInfo)

  return (
    <div className="app">
      <div className="app-left">
        <div className='app-header'>
          <h1>Corona Stack</h1>
          <FormControl>
            <Select variant="outlined" onChange={handleCountryChange} value={country}>
              <MenuItem value='worldwide'>Worldwide</MenuItem>
              {
                countries.map(country => <MenuItem value={country} key={country.iso3}>{country.country}</MenuItem>)
              }

            </Select>
          </FormControl>
        </div>
        <div className="info-status">
          <InfoCards title='Cases' flags={countryInfo.flag} cases={countryInfo.todayCases} total={countryInfo.cases} test={countryInfo.tests}>

          </InfoCards>

          <InfoCards title='Recovered' flags={countryInfo.flag} cases={countryInfo.todayRecovered} total={countryInfo.recovered}>

          </InfoCards>

          <InfoCards title=' Deaths' flags={countryInfo.flag} cases={countryInfo.todayDeaths} total={countryInfo.deaths}>

          </InfoCards>
        </div>

        <Map></Map>
      </div>
      <Card className="app-right">
        <CardContent>

          <h3>Corona Cases By Country</h3>
          <Table countries={tableData}></Table>

          <h3>Corona Cases By Country</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
