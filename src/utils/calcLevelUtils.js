const levelSystem = [
    {
        level: 1,
        name: 'Luyện Khí',
        exp: 0,
        style: 'linear-gradient(135deg, #8B4513, #00FF00)' // Nâu đất -> Xanh lá
    },
    {
        level: 2,
        name: 'Trúc Cơ',
        exp: 100,
        style: 'linear-gradient(135deg, #4B0082, #FFFF00)' // Tím đậm -> Vàng sáng
    },
    {
        level: 3,
        name: 'Kim Đan',
        exp: 200,
        style: 'linear-gradient(135deg, #FFD700, #FF00FF)' // Vàng -> Tím hồng
    },
    {
        level: 4,
        name: 'Nguyên Anh',
        exp: 500,
        style: 'linear-gradient(135deg, #00CED1, #FF4500)' // Xanh ngọc -> Cam đỏ
    },
    {
        level: 5,
        name: 'Hóa Thần',
        exp: 1000,
        style: 'linear-gradient(135deg, #FF4500, #9400D3)' // Cam đỏ -> Tím đậm
    },
    {
        level: 6,
        name: 'Luyện Hư',
        exp: 2000,
        style: 'linear-gradient(135deg, #9400D3, #00CED1)' // Tím nhạt -> Xanh ngọc
    },
    {
        level: 7,
        name: 'Hợp Thể',
        exp: 5000,
        style: 'linear-gradient(135deg, #FF1493, #FFD700)' // Hồng đậm -> Vàng
    },
    {
        level: 8,
        name: 'Đại Thừa',
        exp: 10000,
        style: 'linear-gradient(135deg, #00FF00, #FF0000)' // Xanh lá -> Đỏ
    },
    {
        level: 9,
        name: 'Độ Kiếp',
        exp: 100000,
        style: 'linear-gradient(135deg, #FF0000, #4B0082)' // Đỏ -> Tím đậm
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

export { calcCurrentLevel, calcNextLevel };
