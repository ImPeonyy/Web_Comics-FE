import { Flex, Spin } from 'antd';

import { LoadingOutlined } from '@ant-design/icons';

const Loading = ({ ...props }) => {
    return (
        <Flex align='center' gap='middle'>
            <Spin indicator={<LoadingOutlined spin />} {...props} />
        </Flex>
    );
};

export default Loading;
