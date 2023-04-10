import React, { Component } from 'react'
import Newsitem from './Newsitem'

export class News extends Component {

    constructor() {
        super();
        this.state = {
            article: [],
            loading: false,
            page: 1,
            totalResult: 1
        }
        
    }
    
    async componentDidMount() {
        try {
            let url = 'https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=9225e6d8b8c04de6b9b4d0aaf3d213cc&page=1'
            let data = await fetch(url);
            let parsedData = await data.json()
            this.setState({
                article: parsedData.articles,
                totalResult: parsedData.totalResults
            })
        }
        catch (e) {
            console.log("something went wrong")
        }
    }
// handles the next button.
    handleNextCase = async () => {
        try {
            if (this.state.page + 1 > Math.ceil(this.state.totalResult / 20)) {
            } else {
                //! here we are adding 1 to the page so that we can jump to the next page.
                let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=9225e6d8b8c04de6b9b4d0aaf3d213cc&page=${this.state.page + 1}&pageSize=20`
                let data = await fetch(url);
                let parsedData = await data.json()
                this.setState({
                    article: parsedData.articles,
                    //! here this will update the value of page 
                    page: this.state.page + 1
                })
            }
        }
        catch (e) {
            console.log("something went wrong")
        }
    }
    // handles the previous button.
    handlePrevCase = async () => {
        try {
            //! here we are adding 1 to the page so that we can jump to the next page.
            let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=9225e6d8b8c04de6b9b4d0aaf3d213cc&page=${this.state.page - 1}&pageSize=20`
            let data = await fetch(url);
            let parsedData = await data.json()
            this.setState({
                article: parsedData.articles,
                //! here this will update the value of page 
                page: this.state.page - 1
            })
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
                            <p>this is a paragraph</p>
                            {/* using slice method to restrict the number of characters on the card */}
                            <Newsitem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                        )
                    })
                    }
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevCase}>&larr; Previous</button>
                    <button type="button" className="btn btn-dark" onClick={this.handleNextCase}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
