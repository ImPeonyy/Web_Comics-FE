import { createContext, useContext, useEffect, useState } from 'react';

import { StoreContext } from '@contexts/StoreProvider';

export const LevelsContext = createContext();

const levelSystem = [
    {
        level: 1,
        name: 'Luyện Khí',
        exp: 0,
        color: '#8B4513' // Nâu đất
    },
    {
        level: 2,
        name: 'Trúc Cơ',
        exp: 100,
        color: '#4B0082' // Tím đậm
    },
    {
        level: 3,
        name: 'Kim Đan',
        exp: 200,
        color: '#FFD700' // Vàng
    },
    {
        level: 4,
        name: 'Nguyên Anh',
        exp: 500,
        color: '#00CED1' // Xanh ngọc
    },
    {
        level: 5,
        name: 'Hóa Thần',
        exp: 1000,
        color: '#FF4500' // Cam đỏ
    },
    {
        level: 6,
        name: 'Luyện Hư',
        exp: 2000,
        color: '#9400D3' // Tím nhạt
    },
    {
        level: 7,
        name: 'Hợp Thể',
        exp: 5000,
        color: '#FF1493' // Hồng đậm
    },
    {
        level: 8,
        name: 'Đại Thừa',
        exp: 10000,
        color: '#00FF00' // Xanh lá
    },
    {
        level: 9,
        name: 'Độ Kiếp',
        exp: 100000,
        color: '#FF0000' // Đỏ
    }
];

export const LevelsProvider = ({ children }) => {
    const { myInfo } = useContext(StoreContext);
    const [exp, setExp] = useState(0);

    useEffect(() => {
        if (myInfo?.exp !== undefined) {
            setExp(myInfo.exp);
        }
    }, [myInfo]);

    const currentLevel = levelSystem.reduce((acc, curr) => {
        if (exp >= curr.exp) {
            return curr;
        }
        return acc;
    }, levelSystem[0]);

    // Tìm level tiếp theo
    const nextLevel =
        levelSystem.find((l) => l.level === currentLevel.level + 1) ||
        currentLevel;

    // Tính phần trăm exp
    const expNeeded = nextLevel.exp - currentLevel.exp;
    const currentExpProgress = exp - currentLevel.exp;
    const expPercentage = ((currentExpProgress / expNeeded) * 100).toFixed(2);

    return (
        <LevelsContext.Provider
            value={{
                currentLevel,
                nextLevel,
                expPercentage: Math.min(100, Math.max(0, expPercentage))
            }}
        >
            {children}
        </LevelsContext.Provider>
    );
};
