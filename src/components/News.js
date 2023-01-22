import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
class News extends Component {
    static defaultProps = {
        country:'in',
        pageSize:8,
        category:'general',
    }
    static propTypes = {
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string,
    }
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
        }
    }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6a6f9ce8f48244588895064e1a52e377&page=1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        });
    }
    handlePreviousClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6a6f9ce8f48244588895064e1a52e377&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            page: this.state.page - 1,
            loading: false,
        })
    }
    handleNextClick = async () => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / (this.props.pageSize)))) {

            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6a6f9ce8f48244588895064e1a52e377&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({ loading: true });
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                articles: parsedData.articles,
                page: this.state.page + 1,
                loading: false,
            })
        }
    }
    render() {
        return (
            <div className='container my-3'>
                <h1 className='text-center'>NewsMonkey - Top Headlines</h1>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {
                        !this.state.loading && this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imgUrl={!element.urlToImage ? "https://images.moneycontrol.com/static-mcnews/2020/08/ICICI-Bank-770x433.jpg" : element.urlToImage} url={element.url} />
                            </div>
                        })
                    }
                </div>
                {
                    !this.state.loading && <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} onClick={this.handlePreviousClick} className="btn btn-dark" type='button'>&laquo; Previous</button>
                        <button onClick={this.handleNextClick} disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / (this.props.pageSize))} className="btn btn-dark" type='button'>Next &raquo;</button>
                    </div>
                }
            </div>
        );
    }
}
export default News;