import { Button, Container, Divider, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React, { useContext } from "react";
import { ClubContext } from "../../../context/ClubContext";
import "./ClubTestScreen.css";

const ClubTestScreen = () => {
	const { testsCreated } = useContext(ClubContext);

	return (
		<Container className="club-dash-tests">
			<div className="club-dash-test-bar">
				<Button variant="contained" color="primary">
					<Add /> Create Test
				</Button>
			</div>
			<Divider />
			<div className="club-test-list">
				{testsCreated.length === 0 ? (
					<div className="no-tests-div">
						<Typography variant="h2" className="light-text">
							No tests created
						</Typography>
					</div>
				) : null}
			</div>
		</Container>
	);
};

export default ClubTestScreen;
