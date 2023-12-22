var BASE_URL = 'https://hn.algolia.com/api/v1/';

function doSearch(query){
    var url = BASE_URL + 'search?query=' + query + '&hitsPerPage=200';
    return fetch(url)
        .then (response => response.json())
        .then (data => data.hits);
}

class App extends React.Component{
    constructor(){
        super();
        this.state={
            input: '',
            list: []
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(e){
        e.preventDefault();
    }
    onChange(e){
        this.setState({input:e.target.value});
        doSearch(this.state.input)
            .then((hits) => this.setState({list:hits}));
    }
    render(){
        return (
            <div>
                <h1>Search Hacker News with React</h1>
                <form type="submit" onSubmit={this.onSubmit} >
                    <input type="text" onChange={this.onChange} value={this.state.input} />
                    <button type="submit">Search</button>
                </form>
                {this.state.list.map((item)=>
                <div key={item.objectID}><a href={item.url}>{item.title}</a></div>)}
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)