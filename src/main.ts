import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import './style.css';
import * as hiragana from './japanese/hiragana';
import * as katakana from './japanese/katakana';
import App from './App.vue';
import TestCase from './components/TestCase.vue';
import HomePage from './views/HomePage.vue';
import KanaTable from './views/KanaTable.vue';
import SelectKanaCategory from './views/SelectKanaCategory.vue';
import NotFound from './views/NotFound.vue';

const routes = [
    { path: '/', name: 'home', component: HomePage },
    { path: '/test', name: 'test', component: TestCase },
    { path: '/list/hiragana/basic', name: 'hiraganaBasic', component: KanaTable,
        props: {
            categories: hiragana.CATEGORIES,
            selectViewName: 'selectHiraganaBasic',
        }
    },
    { path: '/list/hiragana/basic/select', name: 'selectHiraganaBasic', component: SelectKanaCategory,
        props: {
            categories: hiragana.CATEGORIES
        }
    },
    { path: '/list/katakana/basic', name: 'katakanaBasic', component: KanaTable,
        props: {
            categories: katakana.CATEGORIES,
            selectViewName: 'selectKatakanaBasic',
        }
    },
    { path: '/list/katakana/basic/select', name: 'selectKatakanaBasic', component: SelectKanaCategory,
        props: {
            categories: katakana.CATEGORIES
        }
    },
    { path: '/:pathMatch(.*)', component: NotFound },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

createApp(App).use(router).mount('#app');
