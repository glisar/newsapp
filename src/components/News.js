import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
export class News extends Component {

    constructor() {
        super();
        // console.log("Hello i am a constructor from News constructor");
        this.state = {
            articles: [],
            loading: false,
            page: 1.

        }
    }

    async componentDidMount() {
        // console.log("cmd");
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=23eed8243d2248dda9d5f0b0dc0c6d9b&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parseData);
        this.setState({ articles: parsedData.articles ,
        loading: false })
    }


    previousClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=23eed8243d2248dda9d5f0b0dc0c6d9b&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log("previous");

        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
    }
    nextClick = async () => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {

       
            let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=23eed8243d2248dda9d5f0b0dc0c6d9b&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading: true});
            let data = await fetch(url);
            let parsedData = await data.json();
            // console.log(parseData);
            this.setState({loading: true});
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                totalResults: parsedData.totalResults,
                loading: false
                
            })
        }
    }
    render() {
        // console.log("render");
        return (<>
            <div className="container my-3">
                <h1 className='text-center'>NewsAdda - Top Headlines</h1>
                {this.state.loading && <Spinner/>}
                <div className="row mt-3">
                    {!this.state.loading && this.state.articles.map((element) => {

                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title : ""} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}


                </div>

            </div>
            <div className="container d-flex justify-content-between">
                <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.previousClick}>	&larr; Previous</button>

                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.nextClick}>Next &rarr;</button>
            </div>
        </>
        )
    }
}

export default News

