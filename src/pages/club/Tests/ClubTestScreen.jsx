import {
    Button,
    Container,
    Divider,
    Grid,
    Typography
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import ClubTestTile from "../../../components/Club/TestTile/TestTile";
import { ClubContext } from "../../../context/ClubContext";
import "./ClubTestScreen.css";

const ClubTestScreen = () => {
    const { testsCreated } = useContext( ClubContext );

    const history = useHistory();

    const handleTestClick = ( test ) => {
        history.push( `/club/test/${
            test._id
        }` );
    };

    return (
        <Container className="club-dash-tests">
            <div style={
                {
                    display: "flex",
                    flexDirection: "row"
                }
            }>
                <Typography gutterBottom variant='h2'
                    style={
                        {
                            fontFamily: "Source Sans Pro",
                            fontWeight: "600",
                            flex: 1
                        }
                }>
                    My Tests
                </Typography>
                <div className="club-dash-test-bar"
                    style={
                        {
                            flex: 1,
                            marginTop: "25px",
                            marginRight: "25px"
                        }
                }>
                    <Link to="/club/createTest">
                        <Button variant="contained" color="primary">
                            <Add/>
                            Create Test
                        </Button>
                    </Link>
                </div>
            </div>
            <Divider/>
            <div className="club-test-list">
                {
                testsCreated.length === 0 ? (
                    <div className="no-tests-div">
                        <Typography variant="h2" className="light-text">
                            No tests created
                        </Typography>
                    </div>
                ) : (
                    <div className="club-tests-display">
                        <Grid container
                            spacing={2}>
                            {
                            testsCreated.map( ( test, i ) => (
                                <Grid key={i}
                                    item
                                    sm={6}
                                    md={3}
                                    onClick={
                                        () => handleTestClick( test )
                                }>
                                    <ClubTestTile test={test}/>
                                </Grid>
                            ) )
                        } </Grid>
                    </div>
                )
            } </div>
        </Container>
    );
};

export default ClubTestScreen;
