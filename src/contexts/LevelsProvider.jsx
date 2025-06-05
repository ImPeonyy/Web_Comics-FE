import { calcCurrentLevel, calcNextLevel } from '@utils/calcLevelUtils';
import { createContext, useContext, useEffect, useState } from 'react';

import { StoreContext } from '@contexts/StoreProvider';
import { getExp } from '@services/UserService';

export const LevelsContext = createContext();

export const LevelsProvider = ({ children }) => {
    const { myInfo } = useContext(StoreContext);
    const [exp, setExp] = useState(0);

    const fetchExp = () => {
        getExp()
            .then((res) => {
                setExp(res.data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        if (myInfo) {
            fetchExp();
        }
    }, [myInfo]);

    const currentLevel = calcCurrentLevel(exp);
    const nextLevel = calcNextLevel(exp);

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
