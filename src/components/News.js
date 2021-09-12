import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
    static defaultProps = {
        country : "in",
        pagesize : 8,
        category : 'general'
    }

    static propTypes = {
        country : PropTypes.string,
        pagesize : PropTypes.number,
        category : PropTypes.string
    }
    capitalizeFirstLetter = (string) =>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props){
        super(props);
        this.state = {
            articles : [],
            loading: true,
            page : 1,
            totalResults : 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`
    }

    async update(){
        let url  = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8b099c6909cc4dd1897be03a665013f4&page=${this.state.page}&pagesize=${this.props.pagesize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading:false
        });
    }

    async componentDidMount(){
        this.update();
    }

    // handlePrevClick = async()=> {
    //     // console.log("Previous Button Clicked");
    //    this.setState({
    //         page: this.state.page -1 
    //    })
    //    this.update();
    // }
    // handleNextClick = async()=> {
    //     if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pagesize))){
    //       this.setState({
    //           page : this.state.page + 1
    //       })
    //       this.update();
    //     }
    // }

    fetchMoreData = async() => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        this.setState({
            page : this.state.page+1
        });
        let url  = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8b099c6909cc4dd1897be03a665013f4&page=${this.state.page}&pagesize=${this.props.pagesize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
        });
      };
    render() {
        return (
                <>
                    <h2 className = "text-center" style ={{margin :'35px 0px'}}>News Monkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
                   {/* {this.state.loading && <Spinner/>} */}
                
                   <InfiniteScroll
                            dataLength={this.state.articles.length}
                            next={this.state.articles.length !== this.state.totalResults}
                            hasMore={true}
                            loader={<Spinner/>}
                            >
                     <div className="conatiner">
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-4" key = {element.url}>
                                         <NewsItem title = {element.title ? element.title : " "} description = {element.description ?element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : "http://vignette3.wikia.nocookie.net/lego/images/a/ac/No-Image-Basic.png/revision/latest?cb=20130819001030"} newsUrl = {element.url}
                                         author ={element.author} date ={element.publishedAt} source = {element.source.name}/>
                                     </div> 
                        })}
                    </div>
                    </div>
                    </InfiniteScroll>
                </>
                
        )
    }
}
