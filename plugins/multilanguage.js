import Vue from 'vue'
import MultiLanguage from 'vue-multilanguage'

Vue.use(MultiLanguage, {
  default: 'en',
  en: {
    title: 'We develop independent belarusian cinema',
    lang: 'На русском языке',
    aboutMovie: 'About the Movie',
    watchTrailer: 'Watch a Trailer',
    cooperation: 'Cooperation',
    massMedia: 'Mass Media',
    written: 'Written about Us',
    aboutUs: 'About Us',
    team: 'Our Team',
    projects: 'Projects',
    press: 'Press',
    contacts: 'Contacts',
    toProjects: 'Back to Projects'
  },
  ru: {
    title: 'Мы создаем независимое белорусское кино.',
    lang: 'In English',
    aboutMovie: 'О Фильме',
    watchTrailer: 'Смотреть трейлер',
    cooperation: 'Сотрудничество',
    massMedia: 'СМИ',
    written: 'О нас пишут',
    aboutUs: 'О нас',
    team: 'Команда проекта',
    projects: 'Проекты',
    press: 'Пресса',
    contacts: 'Контакты',
    toProjects: 'Назад к проектам'
  }
})
