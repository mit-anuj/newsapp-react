import React, { Component } from 'react'
import Newsitem from './Newsitem'

export class News extends Component {
    
    constructor() {
        super();
        this.state = {
            article: [""],
            loading: false
        }
    }
    async componentDidMount(){
        try{
        let url= 'https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=9225e6d8b8c04de6b9b4d0aaf3d213cc'
        let data= await fetch(url);
        let parsedData= await data.json()
        this.setState({article: parsedData.articles})
        }
        catch (e) {
            console.log("something went wrong")
        }
    }
    render() {
        return (
            <div className='container'>
                <h2>NewsMonkey - Top News</h2>
                <div className="row">
                    {/* using map function of array collection to iterate the array and fetch all the data from it.
                        a function must be passed as a parameter to the map funtion so we created an arrow function. */}
                    {this.state.article.map((element) => {
                        return (<div className="col-md-4" key={element.url}>
                            {/* using slice method to restrict the number of characters on the card */}
                            <Newsitem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
                        </div>
                        )
                    })
                    }
                </div>

            </div>
        )
    }
}

export default News
