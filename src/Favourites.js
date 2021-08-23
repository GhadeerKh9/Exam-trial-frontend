import React from "react";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import UpdateForm from "./UpdateForm";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

class Favourites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrOfData: [],
      strDrink: "",
      strDrinkThumb: "",
      show: false,
      index: -1,
    };
  }

  componentDidMount = () => {
    const ownerEmail = this.props.auth0.user.email;

    axios
      .get(`${process.env.REACT_APP_URL}/getDataBase?ownerEmail=${ownerEmail}`)
      .then((results) => {
        this.setState({
          arrOfData: results.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  deleteFavs = (idx) => {
    const deleteObj = {
      ownerEmail: this.props.auth0.user.email,
    };
    axios
      .delete(`${process.env.REACT_APP_URL}/deleteData/${idx}`, {
        params: deleteObj,
      })
      .then((results) => {
        this.setState({
          arrOfData: results.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  updateFavs = (idx) => {
    this.setState({
      strDrink: this.state.arrOfData[idx].strDrink,
      strDrinkThumb: this.state.arrOfData[idx].strDrinkThumb,
      show: true,
      index: idx,
    });
  };

  updateValues = (e) => {
    e.preventDefault();

    const updateObj = {
      ownerEmail: this.props.auth0.user.email,
      strDrink: e.target.value.strDrink,
      strDrinkThumb: e.target.value.strDrinkThumb,
    };

    axios
      .put(
        `${process.env.REACT_APP_URL}/updateData/${this.state.index}`,
        updateObj
      )
      .then((results) => {
        this.setState({
          arrOfData: results.data,
        });
      });
  };

  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  render() {
    return (
      <>
        {this.state.arrOfData.map((item, idx) => {
          return (
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button onClick={() => this.deleteFavs(idx)}>Delete</Button>
                <Button onClick={() => this.updateFavs(idx)}>update</Button>
              </Card.Body>
            </Card>
          );
        })}

        <UpdateForm
          strDrink={this.state.strDrink}
          strDrinkThumb={this.state.strDrinkThumb}
          show={this.state.show}
          updateValues={this.updateValues}
          handleClose={this.handleClose}
        />
      </>
    );
  }
}
export default withAuth0(Favourites);
