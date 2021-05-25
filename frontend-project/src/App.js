import React from "react";
import "./App.css";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import {
  PopMovies,
  PopTVShows,
  TopRatedMovies,
  TopRatedTVShows,
  Info,
  Results,
  NotFound,
} from "./components";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  FormGroup,
  // NavDropdown,
} from "react-bootstrap";

// Main class => the navbar + routing
class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: "",
    };
    this.afterSubmission = this.afterSubmission.bind(this);
  }

  handleRoute = (route) => () => {
    this.props.history.push({ pathname: route });
  };

  handleSearchInput = (event) => {
    this.setState({
      searchText: event.target.value,
    });
  };

  handleSearchSubmit = () => {
    if (document.getElementById("searchBar").value) {
      this.props.history.replace({
        pathname:
          "/results/" +
          encodeURIComponent(document.getElementById("searchBar").value),
        state: {
          searchText: document.getElementById("searchBar").value,
        },
      });
    } else {
      alert("Please enter text in search bar!");
    }
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.handleSearchSubmit();
    }
  };

  afterSubmission(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="custom-navbar">
        <Navbar id="navbar" bg="black" variant="dark" expand="lg">
          <Navbar.Brand className="active" href="/">
            App Name
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav id="nav" className="mr-auto" bg="black">
              <Nav.Link id="current" href="/movie/popular/1">
                Popular Movies
              </Nav.Link>
              <Nav.Link href="/tv/popular/1">Popular TV Shows</Nav.Link>
              <Nav.Link href="/movie/top_rated/1">Top Rated Movies</Nav.Link>
              <Nav.Link href="/tv/top_rated/1">Top Rated TV Shows</Nav.Link>
            </Nav>

            <Form id="search-form" inline onSubmit={this.afterSubmission}>
              <FormGroup>
                <Form.Label className="hidden" htmlFor="searchBar">
                  Search
                </Form.Label>
                <FormControl
                  onKeyDown={this.handleKeyPress}
                  type="text"
                  placeholder="Search"
                  required
                  className="mr-sm-1"
                  id="searchBar"
                />
              </FormGroup>
              <Button variant="outline-light" onClick={this.handleSearchSubmit}>
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Redirect exact from="/" to="/movie/popular/1" />
          <Redirect exact path="/movie/popular/" to="/movie/popular/1" />
          <Route exact path="/movie/popular/:page" component={PopMovies} />

          <Redirect exact path="/tv/popular/" to="/tv/popular/1" />
          <Route exact path="/tv/popular/:page" component={PopTVShows} />

          <Redirect exact path="/movie/top_rated/" to="/movie/top_rated/1" />
          <Route
            exact
            path="/movie/top_rated/:page"
            component={TopRatedMovies}
          />
          <Redirect exact path="/tv/top_rated/" to="/tv/top_rated/1" />
          <Route exact path="/tv/top_rated/:page" component={TopRatedTVShows} />
          <Route
            exact
            path="/info/:imdbID/:mediaType/:tmdbID?"
            component={Info}
          />
          <Redirect exact path="/results/:title/" to="/results/:title/1" />
          <Route exact path="/results/:title/:page" component={Results} />

          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Main);
