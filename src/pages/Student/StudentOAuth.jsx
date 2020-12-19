import React, { useContext, useEffect, useState } from "react";
import Loading from "../Loading";
import { StudentContext } from "../../context/StudentContext";
import { Redirect } from "react-router-dom";

const StudentOAuth = (props) => {
	const token = props.match.params.token;
	const { isLoggedIn, setLoginTrue } = useContext(StudentContext);

	const [redirect, setRedirect] = useState(false);

	useEffect(() => {
		if (token) {
			setLoginTrue(token);
		}
	}, []);

	useEffect(() => {
		if (isLoggedIn) {
			setRedirect(true);
		}
	}, [isLoggedIn]);

	if (redirect) {
		return <Redirect to="/student/dashboard" />;
	}

	return <Loading />;
};

export default StudentOAuth;