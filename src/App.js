import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';

//Styles
import "./css/index.css"

//Components
import Header from './components/Header';
import Welcome from './components/Welcome';
import Gallery from './components/Gallery';
import Error from './components/Error';

// Api Key
import key from './config.js';

class App extends Component {

  constructor () {
    super();
    
    // Initialise state
    this.state = {
      pictures: [],
      searchTag: '',
      isLoading: true
    }

    // Initialise static pictures object to fill in later
    this.staticPics = {
      pictures : {
        sunset: {
          pictures: [],
          searchTag: 'sunset',
          isLoading: true
        },
        waterfall: {
          pictures: [],
          searchTag: 'waterfall',
          isLoading: true
        },
        forest: {
          pictures: [],
          searchTag: 'forest',
          isLoading: true
        },
      }
    }
  }

  // Reset state function
  resetLoadState = () => {
    this.setState({
      pictures: [],
      searchTag: '',
      isLoading: true
    })
  }

  fetchDynamicData = (query) => {
    // Reset state so Components aren't loaded with wrong/incomplete data
    this.resetLoadState();
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(res => res.json())
    .then(jsonData => {
      this.setState({
        pictures: jsonData.photos.photo,
        searchTag: query,
        isLoading: false
      })        
    })
    .catch(err => {
      console.log('Error retrieving data', err);
    })
  }

  // Function to fetch default static data (cats, dogs, birds) and update staticPics object
  fetchStaticData = () => {
    Promise.all([
      fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=sunset&per_page=24&format=json&nojsoncallback=1`),
      fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&per_page=24&tags=waterfall&format=json&nojsoncallback=1`),
      fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&per_page=24&tags=forest&format=json&nojsoncallback=1`)
    ])
    .then(res => {
      Promise.all(res.map(response => response.json())
      )
      .then(jsonData => {
        this.staticPics.pictures.sunset.pictures = jsonData[0].photos.photo
        this.staticPics.pictures.sunset.isLoading = false

        this.staticPics.pictures.waterfall.pictures = jsonData[1].photos.photo
        this.staticPics.pictures.waterfall.isLoading = false

        this.staticPics.pictures.forest.pictures = jsonData[2].photos.photo
        this.staticPics.pictures.forest.isLoading = false

        this.setState({
            isLoading: false
          }) 
      })
    })
    .catch(err => {
      console.log('Oopsie Woopsie', err)
    })
  }
  
  componentDidMount() {
    this.fetchStaticData()

    // Fetch dynamic data again if user refreshes page on search route.
    if(window.location.pathname.includes('search') && this.state.searchTag === ''){
      this.fetchDynamicData(window.location.pathname.slice(8))
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">      
          <Header searchFunc={this.fetchDynamicData}></Header>
          {/* Router switch for handling unknown routes */}
          <Switch>
            <Route exact path="/" component={Welcome}></Route>
            <Route exact path="/sunset" component={() => <Gallery data={this.staticPics.pictures.sunset}></Gallery>}></Route>         
            <Route exact path="/waterfall" component={() => <Gallery data={this.staticPics.pictures.waterfall}></Gallery>}></Route>
            <Route exact path="/forest" component={() => <Gallery data={this.staticPics.pictures.forest}></Gallery>}></Route>
            <Route path="/search=:query" component={() => <Gallery data={this.state}></Gallery>}></Route>
            <Route component={Error}/>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;