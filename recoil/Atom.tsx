import { atom } from 'recoil';

export const isLoginAtom = atom({
    key: 'isLoginAtom',
    default: "null",
});

export const currentGymAtom = atom({
    key: 'currentGymAtom',
    // default: {
    //     id: 1,
    //     name: "〇〇ジム　原宿店",
    // },
    default: null,
});

export const reservedInfoAtom = atom({
    key: 'reservedInfoAtom',
    default: null,
});