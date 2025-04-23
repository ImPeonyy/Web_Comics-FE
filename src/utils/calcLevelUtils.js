const levelSystem = [
    {
        level: 1,
        name: 'Luyện Khí',
        exp: 0,
        style: 'linear-gradient(90deg, #D3D3D3, rgba(255, 255, 255, 0.5), #D3D3D3, rgba(255, 255, 255, 0.5), #D3D3D3, rgba(255, 255, 255, 0.5), #D3D3D3)'
    },
    {
        level: 2,
        name: 'Trúc Cơ',
        exp: 100,
        style: 'linear-gradient(90deg, #008000, rgba(50, 205, 50, 0.5), #008000, rgba(50, 205, 50, 0.5), #008000, rgba(50, 205, 50, 0.5), #008000)'
    },
    {
        level: 3,
        name: 'Kim Đan',
        exp: 200,
        style: 'linear-gradient(90deg, #FFD700, rgba(255, 165, 0, 0.5), #FFD700, rgba(255, 165, 0, 0.5), #FFD700, rgba(255, 165, 0, 0.5), #FFD700)'
    },
    {
        level: 4,
        name: 'Nguyên Anh',
        exp: 500,
        style: 'linear-gradient(90deg, #9370DB, rgba(70, 130, 180, 0.5), #9370DB, rgba(70, 130, 180, 0.5), #9370DB, rgba(70, 130, 180, 0.5), #9370DB)'
    },
    {
        level: 5,
        name: 'Hóa Thần',
        exp: 1000,
        style: 'linear-gradient(90deg, #0000CD, rgba(30, 144, 255, 0.5), #0000CD, rgba(30, 144, 255, 0.5), #0000CD, rgba(30, 144, 255, 0.5), #0000CD)'
    },
    {
        level: 6,
        name: 'Luyện Hư',
        exp: 2000,
        style: 'linear-gradient(90deg, #191970, rgba(105, 105, 105, 0.5), #191970, rgba(105, 105, 105, 0.5), #191970, rgba(105, 105, 105, 0.5), #191970)'
    },
    {
        level: 7,
        name: 'Hợp Thể',
        exp: 5000,
        style: 'linear-gradient(90deg, #800080, rgba(139, 0, 0, 0.7), #800080, rgba(139, 0, 0, 0.7), #800080, rgba(139, 0, 0, 0.7), #800080)'
    },
    {
        level: 8,
        name: 'Đại Thừa',
        exp: 10000,
        style: 'linear-gradient(90deg, #C0C0C0, rgba(230, 232, 250, 0.7), #C0C0C0, rgba(230, 232, 250, 0.7), #C0C0C0, rgba(230, 232, 250, 0.7), #C0C0C0)'
    },
    {
        level: 9,
        name: 'Độ Kiếp',
        exp: 100000,
        style: `linear-gradient(
        90deg,
        #ffd33d,
        #ea4aaa 17%,
        #b34bff 34%,
        #01feff 51%,
        #ffd33d 68%,
        #ea4aaa 85%,
        #b34bff
    )`
    }
];

const calcCurrentLevel = (exp) => {
    return levelSystem.reduce((acc, curr) => {
        if (exp >= curr.exp) {
            return curr;
        }
        return acc;
    }, levelSystem[0]);
};

const calcNextLevel = (exp) => {
    return (
        levelSystem.find((l) => l.level === calcCurrentLevel(exp).level + 1) ||
        calcCurrentLevel(exp)
    );
};

export { calcCurrentLevel, calcNextLevel, levelSystem };
