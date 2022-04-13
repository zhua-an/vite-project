import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'

// https://github.com/hannoeru/vite-plugin-pages
export function createPages() {
  return Pages({
    extensions: ['vue', 'md'],
  })
}

// https://github.com/JohnCampionJr/vite-plugin-vue-layouts
export function createLayouts() {
  return Layouts()
}