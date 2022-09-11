import { atom } from 'recoil';

export const isLoginAtom = atom({
    key: 'isLoginAtom',
    default: null,
});

export const currentGymAtom = atom({
    key: 'currentGymAtom',
    default: null,
});

export const reservedInfoAtom = atom({
    key: 'reservedInfoAtom',
    default: null,
});