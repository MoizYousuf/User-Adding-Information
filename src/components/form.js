import React, { Component } from "react";
import * as firebase from "firebase";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const styles = {
  card: {
    width: "20%",
    textAlign: "center"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  textField: {
    width: 200
  },
  pos: {
    marginBottom: 12
  },
  cardPar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
};

class Form extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      fatherName: "",
      contactNumber: "",
      data: null
    };
  }

  componentDidMount() {
    const database = firebase.database();
    database.ref(`/users/info`).on("value", snapshot => {
      //   console.log(snapshot.val());
      this.setState({
        data: snapshot.val()
      });
    });
  }

  submit = () => {
    const database = firebase.database();
    database
      .ref(`/users/info`)
      .push({
        data: {
          name: this.state.name,
          fatherName: this.state.fatherName,
          contactNumber: this.state.contactNumber
        }
      })
      .then(() => {
        document.getElementById("standard-name").value = "";
        document.getElementById("standard-name2").value = "";
        document.getElementById("standard-name3").value = "";
      });
  };

  render() {
    let data;
    if (this.state.data !== null) {
       data = Object.values(this.state.data);
    }
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.cardPar}>
          <Card className={classes.card}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                <h1>User Information</h1>
                <TextField
                  id="standard-name"
                  label="Name"
                  className={classes.textField}
                  margin="normal"
                  onChange={e => this.setState({ name: e.target.value })}
                />
                <br />
                <TextField
                  id="standard-name2"
                  label="Fathername"
                  className={classes.textField}
                  margin="normal"
                  onChange={e => this.setState({ fatherName: e.target.value })}
                />
                <br />
                <TextField
                  id="standard-name3"
                  label="Contact Number"
                  className={classes.textField}
                  margin="normal"
                  onChange={e =>
                    this.setState({ contactNumber: e.target.value })
                  }
                />
                <br />
                <Button onClick={() => this.submit()}>Submit</Button>
              </Typography>
            </CardContent>
          </Card>
        </div>
        <br />
        <br />
        <div>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Fathername</th>
                <th scope="col">Contact No</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data !== null
                ? data.map((value, index) => {
                    console.log(value);
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{value.data.name}</td>
                        <td>{value.data.fatherName}</td>
                        <td>{value.data.contactNumber}</td>
                      </tr>
                    );
                  })
                : ""}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

Form.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Form);
