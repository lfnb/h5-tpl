import React, { useEffect } from "react";

import styles from "./index.less";

import DragonImg from "../../assets/dragon.jpg";

export default (props) => {
	const { history } = props;

	useEffect(() => {
		console.log("eee", process.env.NODE_ENV);
	}, []);

	const handleClick = () => {
		history.push("/detail");
	};

	const main = (
		<div className={styles.pageList}>
			<div>列表页测试</div>
			<img src={DragonImg} />
			<a onClick={handleClick}>查看详情</a>
		</div>
	);

	return main;
};
