import { createRouter, createWebHistory } from 'vue-router';
import Words from './views/Words.vue';
import New from './views/New.vue';
import Show from './views/Show.vue';
import Edit from './views/Edit.vue';
import Test from './views/Test.vue';
import Translator from './components/Translator.vue';

const routes = [
    { path: '/', redirect: '/words' },
    { path: '/words', name: 'words', component: Words },
    { path: '/words/new', name: 'new-word', component: New },
    { path: '/words/:id', name: 'show', component: Show },
    { path: '/words/:id/edit', name: 'edit', component: Edit },
    { path: '/test', name: 'test', component: Test },
    { path: '/translator', name: 'translator', component: Translator }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active'
});

export default router;