let displayDetailFields=false

class App extends React.Component {
  state = {
    title: '',
    authors: '',
    description: '',
    thumbnail: '',
    averageRating: 0,
    books: [],
    googleBook: {},
    alison: [],
    autumn: [],
    carole: [],
    titleOne: '',
    authorOne: '',
    infoOne: '',
    imgOne: '',
    ratingOne: 0,
    autumn: [],
    titleTwo: '',
    authorTwo: '',
    infoTwo: '',
    imgTwo: '',
    ratingTwo: 0,
    carole: [],
    titleThree: '',
    authorThree: '',
    infoThree: '',
    imgThree: '',
    ratingThree: ''
  }
  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value })
  }
  handleSubmit = event => {
    event.preventDefault()
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
    axios
    .get('/alison').then(alisonresponse => {
      this.setState(
        {
          alison: alisonresponse.data
        })
    })
    axios
    .get('/autumn').then(autumnresponse => {
      this.setState(
        {
          autumn: autumnresponse.data
        })
    })
    axios
    .get('/carole').then(caroleresponse => {
      this.setState(
        {
          carole: caroleresponse.data
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

    displayDetailFields=true;

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


        <h3>STAFF PICKS</h3>
          <div className="row-staff-picks">

            <div className="alison-container">
            <div className="header-footer">
              <h5>Alison's</h5>
            </div>
              { this.state.alison.map( (alison) => { return (
                <div className="alison" key={alison._id}>
                  <div className="card">
                    <div className="card-image waves-effect waves-block waves-light">
                      <img className="activator" src={alison.imgOne}/>
                    </div>

                    <div className="card-reveal">
                      <span className="card-title grey-text text-darken-4">{alison.titleOne}<i className="material-icons right">close</i></span>
                      <p>{alison.authorOne}</p>
                      <p>{alison.infoOne}</p>
                      <p>{alison.ratingOne} ⭐</p>
                    </div>
                  </div>
                </div>
              ) } ) }
              <div className="header-footer">
                <h5>footer-social media?</h5>
              </div>
            </div>

            <div className="autumn-container">
            <div className="header-footer">
              <h5>Autumn's</h5>
            </div>
              { this.state.autumn.map( (autumn) => { return (
                <div className="autumn" key={autumn._id}>
                  <div className="card">
                    <div className="card-image waves-effect waves-block waves-light">
                      <img className="activator" src={autumn.imgTwo}/>
                    </div>

                    <div className="card-reveal">
                      <span className="card-title grey-text text-darken-4">{autumn.titleTwo}<i className="material-icons right">close</i></span>
                      <p>{autumn.authorTwo}</p>
                      <p>{autumn.infoTwo}</p>
                      <p>{autumn.ratingTwo} ⭐</p>
                    </div>
                  </div>
                </div>
              ) } ) }
              <div className="header-footer">
                <h5>footer-social media?</h5>
              </div>
            </div>

            <div className="carole-container">
              <div className="header-footer">
                <h5>Carole's</h5>
              </div>
              { this.state.carole.map( (carole) => { return (
                <div className="carole" key={carole._id}>
                  <div className="card">
                    <div className="card-image waves-effect waves-block waves-light">
                      <img className="activator" src={carole.imgThree}/>
                    </div>

                    <div className="card-reveal">
                      <span className="card-title grey-text text-darken-4">{carole.titleThree}<i className="material-icons right">close</i></span>
                      <p>{carole.authorThree}</p>
                      <p>{carole.infoThree}</p>
                      <p>{carole.ratingThree} ⭐</p>
                    </div>
                  </div>
                </div>
              ) } ) }
              <div className="header-footer">
                <h5>footer-social media?</h5>
              </div>
            </div>
        </div>

        <h3>YOUR READING LIST</h3>
        <div className="book-container">



          <div className="row-books">

            { this.state.books.map( book => { return (

              <div className="card amber lighten-4" key={book._id}>

                <div className="card-image waves-effect waves-block waves-light">
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

            <summary><button className="btn waves-effect waves-light" type="submit" name="action">ADD A BOOK
            </button></summary>

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

              <button className="btn waves-effect waves-light" type="submit" name="action">Submit BOOK
                <i className="material-icons right">send</i>
              </button>

            </form>
          </details>
        </div>

        <div className="find-book-container">

          <div className="google-books-input">
            <form onSubmit={this.findBook}>
              <input type="text" onKeyUp={this.changeName}/>
              <button className="btn waves-effect waves-light" type="submit" name="action">FIND BOOK
                <i className="material-icons right">send</i>
              </button>

            </form>
          </div>

          {
           (displayDetailFields) ?
            <div className="google-book">
              <p>Title: {this.state.googleTitle}</p>
              <p>Author(s): {this.state.googleAuthors}</p>
              <p>Description: {this.state.googleDescription}</p>
              <p>Rating: {this.state.googleAverageRating} ⭐</p>
            </div>
          : ""
         }

          <div className="google-book-image">
            <img src={this.state.googleImage} />
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
