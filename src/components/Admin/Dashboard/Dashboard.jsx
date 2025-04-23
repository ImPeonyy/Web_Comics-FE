import {
    Avatar,
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Modal,
    Popconfirm,
    Select,
    Space,
    Table,
    Tabs,
    Tag,
    message
} from 'antd';
import {
    DeleteOutlined,
    EditOutlined,
    SearchOutlined,
    UserOutlined
} from '@ant-design/icons';
import { deleteComic, updateComic } from '@services/ComicService';
import { deleteUser, updateUser } from '@services/UserService';
import { useContext, useRef, useState } from 'react';

import { DashboardContext } from '@contexts/DashboardProvider';
import { calcCurrentLevel } from '@utils/calcLevelUtils';
import style from './style.module.scss';

const Dashboard = () => {
    const { allUsers, allComics, genres, fetchAllUsers, fetchAllComics } =
        useContext(DashboardContext);
    const [isUserModalVisible, setIsUserModalVisible] = useState(false);
    const [isComicModalVisible, setIsComicModalVisible] = useState(false);
    const [userForm] = Form.useForm();
    const [comicForm] = Form.useForm();
    const [loadingUser, setLoadingUser] = useState(false);
    const [loadingComic, setLoadingComic] = useState(false);
    const [deletingUser, setDeletingUser] = useState(null);
    const [deletingComic, setDeletingComic] = useState(null);
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm) => {
        confirm();
    };

    const handleReset = (clearFilters, confirm) => {
        clearFilters();
        confirm();
    };

    const getColumnSearchProps = (dataIndex, title) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters
        }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Tìm kiếm ${title}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() => handleSearch(selectedKeys, confirm)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type='primary'
                        onClick={() => handleSearch(selectedKeys, confirm)}
                        icon={<SearchOutlined />}
                        size='small'
                        style={{ width: 90 }}
                    >
                        Tìm kiếm
                    </Button>
                    <Button
                        onClick={() => handleReset(clearFilters, confirm)}
                        size='small'
                        style={{ width: 90 }}
                    >
                        Đặt lại
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{ color: filtered ? '#1890ff' : undefined }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex]
                      .toString()
                      .toLowerCase()
                      .includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        }
    });

    // Mock data cho thể loại
    const genreOptions = genres.map((genre) => ({
        value: genre.id,
        label: genre.name
    }));

    const handleEditUser = (user) => {
        userForm.setFieldsValue({
            id: user.id,
            username: user.username,
            email: user.email,
            exp: user.exp,
            role: user.role
        });
        setIsUserModalVisible(true);
    };

    const handleEditComic = (comic) => {
        comicForm.setFieldsValue({
            id: comic.id,
            title: comic.title,
            author: comic.author,
            status: comic.status,
            description: comic.description,
            genres: comic.genres?.map((genre) => genre.id) || []
        });
        setIsComicModalVisible(true);
    };

    const handleDeleteUser = async (userId) => {
        setDeletingUser(userId);
        deleteUser(userId)
            .then(() => {
                message.success('Xóa người dùng thành công');
                fetchAllUsers();
            })
            .catch((err) => {
                console.error('Lỗi khi xóa người dùng:', err);
                message.error('Có lỗi xảy ra khi xóa người dùng');
            })
            .finally(() => {
                setDeletingUser(null);
            });
    };

    const handleDeleteComic = async (comicId) => {
        setDeletingComic(comicId);
        deleteComic(comicId)
            .then(() => {
                message.success('Xóa truyện thành công');
                fetchAllComics();
            })
            .catch((err) => {
                console.error('Lỗi khi xóa truyện:', err);
                message.error('Có lỗi xảy ra khi xóa truyện');
            })
            .finally(() => {
                setDeletingComic(null);
            });
    };

    const handleUserSubmit = async (values) => {
        setLoadingUser(true);
        updateUser(values.id, values)
            .then(() => {
                message.success('Cập nhật người dùng thành công');
                fetchAllUsers();
                setIsUserModalVisible(false);
            })
            .catch((err) => {
                console.error('Lỗi khi cập nhật người dùng:', err);
                message.error('Có lỗi xảy ra khi cập nhật người dùng');
            })
            .finally(() => {
                setLoadingUser(false);
            });
    };

    const handleComicSubmit = async (values) => {
        setLoadingComic(true);
        console.log(values);
        updateComic(values.id, values)
            .then(() => {
                message.success('Cập nhật truyện thành công');
                fetchAllComics();
                setIsComicModalVisible(false);
            })
            .catch((err) => {
                console.error('Lỗi khi cập nhật truyện:', err);
                message.error('Có lỗi xảy ra khi cập nhật truyện');
            })
            .finally(() => {
                setLoadingComic(false);
            });
    };

    // Mock data cho bảng người dùng
    const userColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            ...getColumnSearchProps('id', 'ID')
        },
        {
            title: 'Avatar',
            key: 'avatar',
            align: 'center',
            render: (_, record) => (
                <Avatar size={70} src={record.avatar} icon={<UserOutlined />} />
            )
        },
        {
            title: 'Tên người dùng',
            dataIndex: 'username',
            key: 'username',
            sorter: (a, b) => a.username.localeCompare(b.username),
            ...getColumnSearchProps('username', 'tên người dùng')
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
            ...getColumnSearchProps('email', 'email')
        },
        {
            title: 'Kinh nghiệm',
            dataIndex: 'exp',
            key: 'exp',
            align: 'center',
            sorter: (a, b) => a.exp - b.exp,
            render: (exp) => {
                const currentLevel = calcCurrentLevel(exp);
                return (
                    <div>
                        <div>{exp?.toLocaleString('vi-VN') || '0'} EXP</div>
                        <Tag color='blue' style={{ marginTop: '4px' }}>
                            {currentLevel.name}
                        </Tag>
                    </div>
                );
            },
            filters: [
                { text: 'Luyện Khí (0-99)', value: '1' },
                { text: 'Trúc Cơ (100-199)', value: '2' },
                { text: 'Kim Đan (200-499)', value: '3' },
                { text: 'Nguyên Anh (500-999)', value: '4' },
                { text: 'Hóa Thần (1000-1999)', value: '5' },
                { text: 'Luyện Hư (2000-4999)', value: '6' },
                { text: 'Hợp Thể (5000-9999)', value: '7' },
                { text: 'Đại Thừa (10000-99999)', value: '8' },
                { text: 'Độ Kiếp (100000+)', value: '9' }
            ],
            onFilter: (value, record) => {
                const currentLevel = calcCurrentLevel(record.exp);
                return currentLevel.level.toString() === value;
            }
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role',
            align: 'center',
            sorter: (a, b) => a.role.localeCompare(b.role),
            filters: [
                { text: 'Admin', value: 'admin' },
                { text: 'User', value: 'user' }
            ],
            onFilter: (value, record) => record.role === value,
            render: (role) => (
                <Tag color={role === 'admin' ? 'red' : 'blue'}>
                    {role === 'admin' ? 'Admin' : 'User'}
                </Tag>
            )
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'created_at',
            key: 'created_at',
            sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
            render: (date) => (
                <div>
                    {new Date(date).toLocaleDateString('vi-VN')}
                    <div style={{ fontSize: '12px', color: '#666' }}>
                        {new Date(date).toLocaleTimeString('vi-VN')}
                    </div>
                </div>
            )
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space size='middle'>
                    <Button
                        type='primary'
                        icon={<EditOutlined />}
                        onClick={() => handleEditUser(record)}
                    >
                        Sửa
                    </Button>
                    <Popconfirm
                        title='Bạn có chắc chắn muốn xóa?'
                        okText='Có'
                        cancelText='Không'
                        onConfirm={() => handleDeleteUser(record.id)}
                    >
                        <Button
                            type='primary'
                            danger
                            icon={<DeleteOutlined />}
                            loading={deletingUser === record.id}
                        >
                            Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    // Cột cho bảng truyện
    const comicColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            ...getColumnSearchProps('id', 'ID')
        },
        {
            title: 'Ảnh bìa',
            key: 'cover',
            align: 'center',
            width: 100,
            render: (_, record) => (
                <img
                    src={record.cover_image}
                    alt={record.title}
                    style={{
                        width: '80px',
                        height: '120px',
                        objectFit: 'cover',
                        borderRadius: '4px'
                    }}
                />
            )
        },
        {
            title: 'Tên truyện',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => a.title.localeCompare(b.title),
            ...getColumnSearchProps('title', 'tên truyện')
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
            key: 'author',
            sorter: (a, b) => a.author.localeCompare(b.author),
            ...getColumnSearchProps('author', 'tác giả')
        },
        {
            title: 'Thể loại',
            dataIndex: 'genres',
            key: 'genres',
            filters: genreOptions.map((genre) => ({
                text: genre.label,
                value: genre.value
            })),
            onFilter: (value, record) =>
                record.genres?.some((genre) => genre.id === value),
            render: (genres) => (
                <>
                    {Array.isArray(genres) &&
                        genres.map((genre) => (
                            <Tag color='blue' key={genre.id}>
                                {genre.name}
                            </Tag>
                        ))}
                </>
            )
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            align: 'center',
            key: 'status',
            sorter: (a, b) => a.status.localeCompare(b.status),
            filters: [
                { text: 'Hoàn thành', value: 'Completed' },
                { text: 'Đang tiến hành', value: 'Ongoing' }
            ],
            onFilter: (value, record) => record.status === value,
            render: (status) => (
                <Tag color={status === 'Completed' ? 'green' : 'orange'}>
                    {status === 'Completed' ? 'Hoàn thành' : 'Đang tiến hành'}
                </Tag>
            )
        },
        {
            title: 'Lượt xem',
            dataIndex: 'totalViews',
            align: 'center',
            key: 'totalViews',
            sorter: (a, b) => a.totalViews - b.totalViews,
            ...getColumnSearchProps('totalViews', 'lượt xem'),
            render: (views) => views?.toLocaleString('vi-VN') || '0'
        },
        {
            title: 'Lượt yêu thích',
            dataIndex: 'totalFavorites',
            align: 'center',
            key: 'totalFavorites',
            sorter: (a, b) => a.totalFavorites - b.totalFavorites,
            ...getColumnSearchProps('totalFavorites', 'lượt yêu thích'),
            render: (favorites) => favorites?.toLocaleString('vi-VN') || '0'
        },
        {
            title: 'Số chương',
            dataIndex: 'totalChapters',
            align: 'center',
            key: 'totalChapters',
            sorter: (a, b) => a.totalChapters - b.totalChapters,
            ...getColumnSearchProps('totalChapters', 'số chương'),
            render: (chapters) => chapters?.toLocaleString('vi-VN') || '0'
        },
        {
            title: 'Chương mới nhất',
            key: 'latestChapter',
            sorter: (a, b) => {
                const dateA = a.latestChapter?.created_at
                    ? new Date(a.latestChapter.created_at)
                    : new Date(0);
                const dateB = b.latestChapter?.created_at
                    ? new Date(b.latestChapter.created_at)
                    : new Date(0);
                return dateA - dateB;
            },
            render: (_, record) => {
                const latestChapter = record.latestChapter;
                if (!latestChapter) return 'Chưa có chương';
                return (
                    <div>
                        <div>{latestChapter.title}</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                            {new Date(
                                latestChapter.created_at
                            ).toLocaleDateString('vi-VN')}
                        </div>
                    </div>
                );
            }
        },
        {
            title: 'Thao tác',
            align: 'center',
            key: 'action',
            render: (_, record) => (
                <Space size='middle'>
                    <Button
                        type='primary'
                        icon={<EditOutlined />}
                        onClick={() => handleEditComic(record)}
                    >
                        Sửa
                    </Button>
                    <Popconfirm
                        title='Bạn có chắc chắn muốn xóa?'
                        okText='Có'
                        cancelText='Không'
                        onConfirm={() => handleDeleteComic(record.id)}
                    >
                        <Button
                            type='primary'
                            danger
                            icon={<DeleteOutlined />}
                            loading={deletingComic === record.id}
                        >
                            Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    // Xử lý dữ liệu trước khi truyền vào bảng
    const processedComics = allComics?.data || [];
    const processedUsers = Array.isArray(allUsers) ? allUsers : [];

    const items = [
        {
            key: '1',
            label: 'Quản lý người dùng',
            children: (
                <>
                    <Table
                        columns={userColumns}
                        dataSource={processedUsers}
                        rowKey='id'
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            showTotal: (total) => `Tổng số ${total} người dùng`
                        }}
                    />
                    <Modal
                        title='Sửa thông tin người dùng'
                        open={isUserModalVisible}
                        onCancel={() => setIsUserModalVisible(false)}
                        footer={null}
                    >
                        <Form
                            form={userForm}
                            layout='vertical'
                            onFinish={handleUserSubmit}
                        >
                            <Form.Item name='id' hidden>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name='username'
                                label='Tên người dùng'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên người dùng'
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name='email'
                                label='Email'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập email'
                                    },
                                    {
                                        type: 'email',
                                        message: 'Email không hợp lệ'
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name='exp'
                                label='Kinh nghiệm'
                                rules={[
                                    {
                                        validator: (_, value) => {
                                            if (
                                                value === undefined ||
                                                value === null
                                            ) {
                                                return Promise.reject(
                                                    'Vui lòng nhập kinh nghiệm'
                                                );
                                            }
                                            if (typeof value !== 'number') {
                                                return Promise.reject(
                                                    'Kinh nghiệm phải là số'
                                                );
                                            }
                                            if (value < 0) {
                                                return Promise.reject(
                                                    'Kinh nghiệm không được âm'
                                                );
                                            }
                                            return Promise.resolve();
                                        }
                                    }
                                ]}
                            >
                                <InputNumber
                                    style={{ width: '100%' }}
                                    formatter={(value) =>
                                        `${value}`.replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ','
                                        )
                                    }
                                    parser={(value) =>
                                        value.replace(/\$\s?|(,*)/g, '')
                                    }
                                    min={0}
                                />
                            </Form.Item>
                            <Form.Item
                                name='role'
                                label='Vai trò'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn vai trò'
                                    }
                                ]}
                            >
                                <Select>
                                    <Select.Option value='admin'>
                                        Admin
                                    </Select.Option>
                                    <Select.Option value='user'>
                                        User
                                    </Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Space>
                                    <Button
                                        type='primary'
                                        htmlType='submit'
                                        loading={loadingUser}
                                    >
                                        Cập nhật
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            setIsUserModalVisible(false)
                                        }
                                    >
                                        Hủy
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    </Modal>
                </>
            )
        },
        {
            key: '2',
            label: 'Quản lý truyện',
            children: (
                <>
                    <Table
                        columns={comicColumns}
                        dataSource={processedComics}
                        rowKey='id'
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            showTotal: (total) => `Tổng số ${total} truyện`
                        }}
                    />
                    <Modal
                        title='Sửa thông tin truyện'
                        open={isComicModalVisible}
                        onCancel={() => setIsComicModalVisible(false)}
                        footer={null}
                        width={800}
                    >
                        <Form
                            form={comicForm}
                            layout='vertical'
                            onFinish={handleComicSubmit}
                        >
                            <Form.Item name='id' hidden>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name='title'
                                label='Tên truyện'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên truyện'
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name='author'
                                label='Tác giả'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên tác giả'
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name='genres'
                                label='Thể loại'
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Vui lòng chọn ít nhất một thể loại'
                                    }
                                ]}
                            >
                                <Select
                                    mode='multiple'
                                    placeholder='Chọn thể loại'
                                    options={genreOptions}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                            <Form.Item
                                name='status'
                                label='Trạng thái'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn trạng thái'
                                    }
                                ]}
                            >
                                <Select>
                                    <Select.Option value='Completed'>
                                        Hoàn thành
                                    </Select.Option>
                                    <Select.Option value='Ongoing'>
                                        Đang tiến hành
                                    </Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name='description' label='Mô tả'>
                                <Input.TextArea rows={4} />
                            </Form.Item>
                            <Form.Item>
                                <Space>
                                    <Button
                                        type='primary'
                                        htmlType='submit'
                                        loading={loadingComic}
                                    >
                                        Cập nhật
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            setIsComicModalVisible(false)
                                        }
                                    >
                                        Hủy
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    </Modal>
                </>
            )
        }
    ];

    return (
        <div className={style.dashboard}>
            <div className={style.container}>
                <h1>Quản lý hệ thống</h1>
                <Tabs defaultActiveKey='1' items={items} />
            </div>
        </div>
    );
};

export default Dashboard;
