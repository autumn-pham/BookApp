
class App extends React.Component {
  state = {
    title: '',
    authors: '',
    description: '',
    thumbnail: '',
    averageRating: 0,
    books: [],
    googleBook: {}
  }
  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value })
  }
  handleSubmit = event => {
    event.preventDefault()
    console.log(this.state)
    axios
    .post('/books', this.state)
    .then(response =>
      this.setState(
        {
          books: response.data,
          title: '',
          authors: '',
          description: '',
          thumbnail: '',
          averageRating: 0
         }
      )
    )
  }
  componentDidMount = () => {
    axios.get('/books').then(response => {
      this.setState({
        books: response.data
      })
    })
  }
  deleteBook = event => {
    axios.delete('/books/' + event.target.value).then(response => {
      this.setState({
        books: response.data
      })
    })
  }
  updateBook = event => {
    event.preventDefault()
    const id = event.target.id
    axios.put('/books/' + id, this.state).then(response => {
      this.setState({
        books: response.data,
        title: '',
        authors: '',
        description: '',
        thumbnail: '',
        averageRating: 0
      })
    })
  }
  findBook = (event) => {
    event.preventDefault();
      event.target.reset()
        axios.get('https://www.googleapis.com/books/v1/volumes?q=' + this.state.name + '&key=AIzaSyB%20AZFHPTcUSvMx_Gx5Cd5tcQLP2c72htwA').then(
          (data) => {
            console.log(data.data.items[0].volumeInfo)
              this.setState(
                {
                  googleBook: data.data.items[0].volumeInfo,
                  googleTitle: data.data.items[0].volumeInfo.title,
                  googleAuthors: data.data.items[0].volumeInfo.authors[0],
                  googleImage: data.data.items[0].volumeInfo.imageLinks.thumbnail,
                  googleDescription: data.data.items[0].volumeInfo.description,
                  googleAverageRating: data.data.items[0].volumeInfo.averageRating,
                }
              )
            }
        )
    }
    changeName = (event) => {
      this.setState(
            {
              name: event.target.value
            }
      )
    }
  render = () => {
    return (
      <div className="main-div">

        <nav>
          <div className="nav-wrapper">
            <h1>BOOKS</h1>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><button className="nav-button">Sign-in</button></li>
              <li><button className="nav-button">Sign-up</button></li>
            </ul>
          </div>
        </nav>

        <h3>STAFF RECOMMENDATIONS</h3>
        <div className="favs-container">
          <div className="row">
          <h5>Autumn's Favs</h5>
            { this.state.books.map( (book, index) => { return (
              <div className="Autumn">
                {
                  (index >= 0 && index < 2) ? book.title : ""
                }
              </div>
            ) } ) }
          </div>
        </div>

        <h3>YOUR READING LIST</h3>
        <div className="book-container">

          <div className="book-image-div">
            <img src="https://i.imgur.com/UWxZc3X.jpg?" className="book-image"/>
          </div>

          <div className="row">

            { this.state.books.map( book => { return (

              <div className="card" key={book._id}>

                <div className="thumbnail card-image waves-effect waves-block waves-light">
                  <img className="activator" src={book.thumbnail}/>
                </div>

                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">{book.title}<i className="material-icons right">close</i></span>
                  <p>{book.authors} </p>
                  <p>{book.description} </p>
                  <p>Average Rating: {book.averageRating} ⭐</p>

                    <details>
                      <summary>EDIT</summary>
                      <form id={book._id} onSubmit={this.updateBook}>
                        <label htmlFor="title">Title</label>
                        <br />
                        <input
                          type="text"
                          id="title"
                          onChange={this.handleChange}
                          value={this.state.title}
                        />
                        <br />
                        <label htmlFor="authors">Authors</label>
                        <br />
                        <input
                          type="text"
                          id="authors"
                          onChange={this.handleChange}
                          value={this.state.authors}
                        />
                        <br />
                        <label htmlFor="thumbnail">Image</label>
                        <br />
                        <input
                          type="text"
                          id="thumbnail"
                          onChange={this.handleChange}
                          value={this.state.thumbnail}
                        />
                        <br />
                      <label htmlFor="description">Description</label>
                      <br />
                      <input
                        type="text"
                        id="description"
                        onChange={this.handleChange}
                        value={this.state.description}
                      />
                      <label htmlFor="averageRating">Rating</label>
                      <br />
                      <input
                        type="text"
                        id="averageRating"
                        onChange={this.handleChange}
                        value={this.state.averageRating}
                      />
                      <input type="submit" value="UPDATE" />
                    </form>
                  </details>
                  <button value={book._id} onClick={this.deleteBook}>
                    DELETE
                  </button>

                </div>
              </div>
            ) } ) }
          </div>
        </div>

        <div className="new-book">
          <details>
            <summary><button className="add-button">Add a Book</button></summary>
            <form className="new-book-form" onSubmit={this.handleSubmit}>
              <label htmlFor="title">TITLE:</label>
              <br />
              <input type="text" id="title" onChange={this.handleChange} />
              <br />
              <label htmlFor="authors">AUTHORS:</label>
              <br />
              <input type="text" id="authors" onChange={this.handleChange} />
              <br />
              <label htmlFor="description">DESCRIPTION</label>
              <br />
              <input type="text" id="description" onChange={this.handleChange} />
              <br />
              <label htmlFor="thumbnail">IMAGE LINK:</label>
              <br />
              <input type="text" id="thumbnail" onChange={this.handleChange} />
              <br />
              <label htmlFor="averageRating">RATING:</label>
              <br />
              <input type="text" id="averageRating" onChange={this.handleChange} />
              <br />
              <input type="submit" value="ADD A BOOK" />
            </form>
          </details>
        </div>

        <div className="findBookContainer">
          <div className="googleBooksInput">
            <form onSubmit={this.findBook}>
              <input type="text" onKeyUp={this.changeName}/>
              <input type="submit" value="Find Book"/>
            </form>
          </div>

          <div className="googleBook">
            <dl>
            <dt>Title</dt>
            <dd>{this.state.googleTitle}</dd>

            <dt>Author(s)</dt>
            <dd>{this.state.googleAuthors}</dd>

            <dd><img src={this.state.googleImage} /></dd>

            <dt>Description</dt>
            <dd>{this.state.googleDescription}</dd>

            <dt>Rating</dt>
            <dd>{this.state.googleAverageRating} ⭐</dd>
            </dl>
          </div>
        </div>

        <div className="footer">
          <h3>Footer text</h3>
        </div>

      </div>
    )
  }
}

ReactDOM.render(
    <App></App>,
    document.querySelector('main')
);
