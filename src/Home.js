import React from "react";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      arrOfData: [],
    };
  }

  componentDidMount = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/getData`)
      .then((results) => {
        this.setState({
          arrOfData: results.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  addingFavs = (idx) => {
    const obj = {
      ownerEmail: this.props.auth0.user.email,
      strDrink: this.state.arrOfData[idx].strDrink,
      strDrinkThumb: this.state.arrOfData[idx].strDrinkThumb,
    };
    axios
      .post(`${process.env.REACT_APP_URL}/addingData`, obj)
      .then((results) => {
        this.setState({
          arrOfData: results.data,
        });
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
                <Button onClick={() => this.addingFavs(idx)}>
                  Add whatever
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </>
    );
  }
}
export default withAuth0(Home);
