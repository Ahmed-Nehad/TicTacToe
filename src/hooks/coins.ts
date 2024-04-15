import { Preferences } from '@capacitor/preferences';
let coins = 0;

export const getCoinsFromStorge = async () => {
    const { value } = await Preferences.get({ key: 'coins' });
    coins = value ? +value : coins;
};

export const setCoinsStorge = async () => {
    await Preferences.set({
      key: 'coins',
      value: `${coins}`,
    });
};

  
export const addCoins = (diffculity?: '' | 'easy' | 'mid' | 'hard' | 'imp' ) => {
    coins += diffculity === undefined ? 10 : diffculity === '' ? 5 : diffculity === 'easy' ? 5 : diffculity === 'mid' ? 7 : diffculity === 'hard' ? 10 : 1000000;
    setCoinsStorge();
}

export const getCoins = () => coins

getCoinsFromStorge();