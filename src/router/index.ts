import { createRouter, createWebHashHistory } from 'vue-router';
import * as hiragana from '@/japanese/hiragana';
import * as katakana from '@/japanese/katakana';
import QuizPage from '@/views/QuizPage.vue';
import HomePage from '@/views/HomePage.vue';
import KanaTablePage from '@/views/KanaTablePage.vue';
import SelectKanaCategoryPage from '@/views/SelectKanaCategoryPage.vue';
import NotFoundPage from '@/views/NotFoundPage.vue';

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/quiz', name: 'quiz', component: QuizPage },
  {
    path: '/list/hiragana/basic',
    name: 'hiraganaBasic',
    component: KanaTablePage,
    props: {
      categories: hiragana.CATEGORIES,
      selectViewName: 'selectHiraganaBasic',
    },
  },
  {
    path: '/list/hiragana/basic/select',
    name: 'selectHiraganaBasic',
    component: SelectKanaCategoryPage,
    props: {
      categories: hiragana.CATEGORIES,
    },
  },
  {
    path: '/list/katakana/basic',
    name: 'katakanaBasic',
    component: KanaTablePage,
    props: {
      categories: katakana.CATEGORIES,
      selectViewName: 'selectKatakanaBasic',
    },
  },
  {
    path: '/list/katakana/basic/select',
    name: 'selectKatakanaBasic',
    component: SelectKanaCategoryPage,
    props: {
      categories: katakana.CATEGORIES,
    },
  },
  { path: '/:pathMatch(.*)', component: NotFoundPage },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
