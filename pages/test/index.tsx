import type { NextPage } from 'next'

import { TEST } from '../../constans';

const Test: NextPage = () => {

    console.log(TEST);

    return (
        <div>
            Test
        </div>
    )
}

Test.getInitialProps = () => {
    return { a: 'test' };
}

export default Test;
