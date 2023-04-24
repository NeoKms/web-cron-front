<template>
  <div v-if="!!user" class="min-h-screen">
    <Disclosure v-slot="{ open }" as="nav" class="bg-gray-800 shadow-lg">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton class="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span class="sr-only">Open main menu</span>
              <common-my-svg-icon v-if="!open" :path="mdiMenu" class="block h-6 w-6" type="mdi" />
              <common-my-svg-icon v-else :path="mdiClose" class="block h-6 w-6" type="mdi" />
            </DisclosureButton>
          </div>
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img class="h-10" src="~/assets/img/logo-text.svg" alt="Your Company">
            </div>
            <div class="text-white">
              {{ currentRoute.name }}
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <button type="button" class="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span class="sr-only">View notifications</span>
                <common-my-svg-icon class="h-6 w-6" :path="mdiBellOutline" type="mdi" />
              </button>
              <!-- Profile dropdown -->
              <Menu as="div" class="relative ml-3">
                <div>
                  <MenuButton class="px-3 flex max-w-xs items-center rounded-full bg-gray-800 text-sm">
                    <span class="sr-only">Open user menu</span>
                    <div class="flex-shrink-0">
                      <common-my-svg-icon class="text-white" :path="mdiAccount" type="mdi" />
                    </div>
                    <div class="ml-3">
                      <div class="text-base font-medium leading-none text-white">
                        {{ user.fio }}
                      </div>
                      <div class="text-sm font-medium leading-none text-gray-400">
                        {{ user.email }}
                      </div>
                    </div>
                  </MenuButton>
                </div>
                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                      <nuxt-link :to="item.href" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer']" @click="item.action">
                        {{ item.name }}
                      </nuxt-link>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>
      <transition
        enter-active-class="transition ease-in-out duration-300"
        enter-from-class="transform opacity-0  scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <DisclosurePanel class="md:hidden absolute top-[3.9rem] w-full bg-gray-800">
          <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3 ">
            <DisclosureButton
              v-for="item in navigation"
              :key="item.name"
              as="a"
              :href="item.href"
              :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'space-x-4 relative items-center flex  block rounded-md px-3 py-2 text-base font-medium']"
              :aria-current="item.current ? 'page' : undefined"
            >
              <common-my-svg-icon :path="item.icon" type="mdi" />
              <span class="-mr-1 font-medium">{{ item.name }}</span>
            </DisclosureButton>
          </div>
          <div class="border-t border-gray-700 pb-3 pt-4">
            <div class="flex items-center px-5">
              <div class="flex-shrink-0">
                <common-my-svg-icon class="text-white" :path="mdiAccount" type="mdi" />
              </div>
              <div class="ml-3">
                <div class="text-base font-medium leading-none text-white">
                  {{ user.fio }}
                </div>
                <div class="text-sm font-medium leading-none text-gray-400">
                  {{ user.email }}
                </div>
              </div>
              <button type="button" class="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span class="sr-only">View notifications</span>
                <common-my-svg-icon class="h-6 w-6" :path="mdiBellOutline" type="mdi" />
              </button>
            </div>
            <div class="mt-3 space-y-1 px-2">
              <DisclosureButton v-for="item in userNavigation" :key="item.name" as="a" :href="item.href" class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                {{ item.name }}
              </DisclosureButton>
            </div>
          </div>
        </DisclosurePanel>
      </transition>
    </Disclosure>
    <div class="flex">
      <div class="z-10 hidden md:block absolute sidebar w-[3.35rem] overflow-hidden border-r hover:w-[200px] hover:bg-white hover:shadow-lg">
        <div class="flex h-full flex-col justify-between pb-6">
          <div>
            <ul class="space-y-2 tracking-wide">
              <template v-for="item in navigation">
                <li v-if="!item.skip" :key="item.name" class="min-w-max">
                  <nuxt-link :to="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-700 hover:text-white', 'space-x-4 relative items-center flex px-4 py-3 text-sm font-medium']" :aria-current="item.current ? 'page' : undefined">
                    <common-my-svg-icon :path="item.icon" type="mdi" />
                    <span class="-mr-1 font-medium">{{ item.name }}</span>
                  </nuxt-link>
                </li>
              </template>
            </ul>
          </div>
          <div>
            <ul class="space-y-2 tracking-wide">
              <template v-for="item in navigation">
                <li v-if="item.skip" :key="item.name" class="min-w-max">
                  <nuxt-link :to="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-700 hover:text-white', 'space-x-4 relative items-center flex px-4 py-3 text-sm font-medium']" :aria-current="item.current ? 'page' : undefined">
                    <common-my-svg-icon :path="item.icon" type="mdi" />
                    <span class="-mr-1 font-medium">{{ item.name }}</span>
                  </nuxt-link>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
      <main class="md:ml-[3.35rem] px-4 flex-1 mx-auto py-6 sm:px-6 lg:px-8 overflow-auto h-screen">
        <slot />
      </main>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  mdiAccount,
  mdiBellOutline,
  mdiCalendarCheck,
  mdiClose,
  mdiCog, mdiFormatListChecks,
  mdiMenu,
  mdiServerNetwork,
  mdiViewDashboardVariant
} from '@mdi/js';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { useRoute } from '#app';
import { useAuthStore } from '~/store/auth';
const route = useRoute();
const authStore = useAuthStore();
const user = computed(() => authStore.user);
const navigation = ref([
  { name: 'Dashboard', href: '/', current: route.fullPath === '/', icon: mdiViewDashboardVariant },
  { name: 'Logs', href: '/logs', current: false, icon: mdiFormatListChecks },
  { name: 'Jobs', href: '/jobs', current: false, icon: mdiCalendarCheck },
  { name: 'Servers', href: '/ssh', current: false, icon: mdiServerNetwork },
  { name: 'Users', href: '/users', current: false, icon: mdiAccount },
  { name: 'Settings', href: '/settings', current: false, icon: mdiCog, skip: true }
]);
const checkCurrentNav = () => {
  navigation.value.forEach((e) => {
    e.current = false;
  });
  if (route.fullPath === '/') {
    navigation.value[0].current = true;
  } else {
    const exist = navigation.value.filter(n => n.href !== '/').find(n => route.fullPath.includes(n.href));
    !!exist && (exist.current = true);
  }
};
checkCurrentNav();
watch(route, checkCurrentNav);
const currentRoute = computed(() => navigation.value.find(e => e.current) ?? { name: '' });
const userNavigation = [
  { name: 'Your Profile', href: '/profile' },
  { name: 'Sign out', action: authStore.logout }
];
</script>

<style scoped lang="scss">
.sidebar {
  transition:all .2s ease-in-out;
  height: calc(100vh - 4rem);
}
main {
  height: calc(100vh - 4rem);
}
</style>
