import { makeAutoObservable } from 'mobx';

export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    provider: 'google' | 'facebook';
}

export type Language = 'vi' | 'en';

const AUTH_KEY = 'auth_user';
const LANG_KEY = 'app_language';

class AuthStore {
    user: User | null = null;
    language: Language = 'vi';

    constructor() {
        makeAutoObservable(this);
        try {
            const saved = localStorage.getItem(AUTH_KEY);
            if (saved) this.user = JSON.parse(saved);
            const savedLang = localStorage.getItem(LANG_KEY) as Language | null;
            if (savedLang) this.language = savedLang;
        } catch {
            this.user = null;
        }
    }

    loginWithGoogle() {
        this.user = {
            id: 'google_001',
            name: 'Nguyễn Tuấn Kiệt',
            email: 'kietnguyen1909lhvl@gmail.com',
            avatar: 'https://ui-avatars.com/api/?name=Nguyen+Tuan+Kiet&background=f5568f&color=fff&size=128&rounded=true',
            provider: 'google',
        };
        localStorage.setItem(AUTH_KEY, JSON.stringify(this.user));
    }

    loginWithFacebook() {
        this.user = {
            id: 'fb_001',
            name: 'Nguyễn Tuấn Kiệt',
            email: 'kietnguyen1909lhvl@gmail.com',
            avatar: 'https://ui-avatars.com/api/?name=Nguyen+Tuan+Kiet&background=1877f2&color=fff&size=128&rounded=true',
            provider: 'facebook',
        };
        localStorage.setItem(AUTH_KEY, JSON.stringify(this.user));
    }

    logout() {
        this.user = null;
        localStorage.removeItem(AUTH_KEY);
    }

    setLanguage(lang: Language) {
        this.language = lang;
        localStorage.setItem(LANG_KEY, lang);
    }

    get isLoggedIn() {
        return !!this.user;
    }
}

export const authStore = new AuthStore();
