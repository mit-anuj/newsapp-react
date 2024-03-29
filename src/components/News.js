import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
  static propDefault = {
    pageSize: 6,
    country: 'in'
  }
  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string
  }
  constructor(props) {
    super(props);
    this.state = {
      article: [],
      loading: true,
      page: 1,
      totalResult: 0,
      error: null,
    };
    document.title = `NewsMonkey-${this.props.category}`
  }
  async updateNews() {
    this.props.setProgress(10)
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({
        loading: true
      })
    this.props.setProgress(30)

      let data = await fetch(url);
      // if(data.status >= 400  && data.status <= 600) throw data;
      let parsedData = await data.json();
    this.props.setProgress(70)

      this.setState({
        article: parsedData.articles,
        totalResult: parsedData.totalResults,
        loading: false,
      });
    } catch (e) {
      this.setState({
        ...this.state,
        error: e.message,
        loading: false
      });
    }
    this.props.setProgress(100)

  }

  async componentDidMount() {
    this.updateNews()
  }

  fetchMoreData = async () => {
    this.setState({
      page: this.state.page + 1
    })
    // ! we are not calling the updateNews function because we need to concatenate the new articles with the current articles so in order to do that we are writing the custom login
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9225e6d8b8c04de6b9b4d0aaf3d213cc&page=${this.state.page}&pageSize=${this.props.pageSize}`;

      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        // ! we need to concatenate the previous data with the new data so that it will not replace the existing data.
        article: this.state.article.concat(parsedData.articles),
        totalResult: parsedData.totalResults,
        loading: false,
      });
    } catch (e) {
      this.setState({
        ...this.state,
        error: e.message,
        loading: false
      });
    }
  }

  render() {
    return (
      <div className="container">
        <h2 className="text-center">NewsMonkey - Top News</h2>
        {this.state.loading && <Spinner />}
        {/* implementing infinite scroll from here */}
        <InfiniteScroll
          dataLength={this.state.article.length}
          next={this.fetchMoreData}
          hasMore={this.state.article.length < this.state.totalResult}
          loader={<Spinner />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {/* added this div so that we can remove the horizontal slider from the bottom */}
          <div className="container">
            <div className="row">
              {/* using map function of array collection to iterate the array and fetch all the data from it.
                        a function must be passed as a parameter to the map funtion so we created an arrow function. */}
              {this.state.article.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    {/* using slice method to restrict the number of characters on the card */}
                    <Newsitem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={!element.urlToImage ? "https://d3hnfqimznafg0.cloudfront.net/images/news/ImageForNews_33264_16813708189423484.jpg": element.urlToImage} newsUrl={element.url} date={element.publishedAt} author={element.author} />
                  </div>
                )
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}
export default News;
