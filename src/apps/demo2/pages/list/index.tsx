import React from 'react';

import styles from './index.less';


export default props => {

    const { history } = props;

    const handleClick =() => {
        history.push('/detail');
    }

    const main = (
        <div className={styles.pageList}>
            <div>列表页</div>
            <a onClick={handleClick}>查看详情</a>
        </div>
    )

    return main;
}