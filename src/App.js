import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {
  // ! getting apikey from the .env.local file.
  apiKey=process.env.REACT_APP_API_KEY 
  state={
    progress :0
  }
  setProgress = (progress)=>{
    this.setState({
      progress: progress
    })
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
          height={3}
          loaderSpeed={1000}
        color='#f11946'
        progress={this.state.progress}
        onLoaderFinished={() => this.setProgress(this.state.progress)}
      />
          <Routes>
            <Route exact path='/' element={<News apiKey={this.apiKey}  setProgress={this.setProgress}  key={'general'}pageSize={5} country={'in'} category={'general'}/>} />
            <Route exact path='/sports' element={<News apiKey={this.apiKey}  setProgress={this.setProgress}  key={'sports'}pageSize={5} country={'in'} category={'sports'} />} />
            <Route exact path='/business' element={<News apiKey={this.apiKey}  setProgress={this.setProgress}  key={'business'} pageSize={5} country={'in'} category={'business'} />} />
            <Route exact path='/general' element={<News apiKey={this.apiKey}  setProgress={this.setProgress}  key={'general'}pageSize={5} country={'in'} category={'general'} />} />
            <Route exact path='/science' element={<News apiKey={this.apiKey}  setProgress={this.setProgress}  key={'science'}pageSize={5} country={'in'} category={'science'} />} />
            <Route exact path='/health' element={<News apiKey={this.apiKey}  setProgress={this.setProgress}  key={'health'}pageSize={5} country={'in'} category={'health'} />} />
            <Route exact path='/technology' element={<News apiKey={this.apiKey}  setProgress={this.setProgress}  key={'technology'}pageSize={5} country={'in'} category={'technology'} />} />
            <Route exact path='/entertainment' element={<News apiKey={this.apiKey}  setProgress={this.setProgress}  key={'entertainment'}pageSize={5} country={'in'} category={'entertainment'} />} />
          </Routes>
        </Router>
      </div>
    )
  }
}
