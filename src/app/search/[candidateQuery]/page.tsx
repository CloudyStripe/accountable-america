'use client'

import styles from './page.module.scss'

export interface paramsObject {
    params: {
        candidateQuery: string;
    }
    searchParams: {}
}

const Results: React.FC<paramsObject> = (props) => {

    const { params } = props;

    return (
        <div>Results</div>
    )
}

export default Results