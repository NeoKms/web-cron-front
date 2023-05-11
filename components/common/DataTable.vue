<template>
  <div class="flex-col w-full overflow-auto my-2">
    <div class="min-h-10 overflow-auto">
      <table class="w-full">
        <thead
          :class="{
            'sticky top-0 z-[2] bg-white':stickyHead
          }"
        >
          <tr>
            <template v-for="h in headers" :key="h.value">
              <th
                :class="{
                  'text-black cursor-pointer': (isSort(h) || hoverHeaderElements.has(h.value)) && (h.sort ?? true),
                  'text-gray-500': !(isSort(h) || hoverHeaderElements.has(h.value))
                }"
                class="text-left select-none font-normal border-t border-gray-200 cursor-default py-1"
                @mouseenter="(h.sort ?? true) && hoverHeaderElements.add(h.value)"
                @mouseleave="hoverHeaderElements.delete(h.value)"
                @click="(h.sort ?? true)&& changeSort(h)"
              >
                <div class="flex w-full">
                  <span>
                    {{ h.text }}
                  </span>
                  <transition name="header">
                    <common-my-svg-icon
                      v-if="(hoverHeaderElements.has(h.value)||isSort(h)) && !isSortDesc(h)"
                      :path="mdiArrowUp"
                    />
                    <common-my-svg-icon v-else-if="isSortDesc(h)" :path="mdiArrowDown" />
                  </transition>
                </div>
              </th>
            </template>
          </tr>
        </thead>
        <tbody class="relative">
          <template v-if="loading">
            <div
              class="loader-posts lposabs"
              :class="{'lposabs': filtredItems.length}"
            >
              Загрузка...
            </div>
          </template>
          <template v-if="!filtredItems.length">
            <tr>
              <th :colspan="headers.length" class="text-center">
                <span>Нет данных</span>
              </th>
            </tr>
          </template>
          <template v-else>
            <tr
              v-for="(v,ind) in filtredItems"
              :key="ind+'item'"
              class="border-t border-gray-200"
            >
              <td v-for="h in headers" :key="h.value+ind">
                <span class="inline-block py-2">
                  <slot :name="'item.'+h.value" :item="v" :header="h">
                    {{ v[h.value] }}
                  </slot>
                </span>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div class="flex flex-1 justify-between sm:hidden items-center text-center">
        <button
          :disabled="optionsInternal.page===1"
          class="justify-center w-16 relative inline-flex items-center rounded-md border border-gray-300 bg-white px-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          @click="optionsInternal.page--"
        >
          <span class="sr-only">Previous</span>
          <common-my-svg-icon :path="mdiChevronLeft" class="h-5 w-5" aria-hidden="true" />
        </button>
        <p class="text-sm text-gray-700">
          <span class="font-medium">{{ showing }}</span>
          to
          <span class="font-medium">{{ showingTo }}</span>
          of
          <span class="font-medium">{{ totalItems }}</span>
        </p>
        <button
          :disabled="optionsInternal.page===pageCount"
          class="justify-center w-16 relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          @click="optionsInternal.page++"
        >
          <span class="sr-only">Next</span>
          <common-my-svg-icon :path="mdiChevronRight" class="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Showing
            <span class="font-medium">{{ showing }}</span>
            to
            <span class="font-medium">{{ showingTo }}</span>
            of
            <span class="font-medium">{{ totalItems }}</span>
            results
          </p>
        </div>
        <div>
          <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              :disabled="optionsInternal.page==1"
              class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              @click="optionsInternal.page--"
            >
              <span class="sr-only">Previous</span>
              <common-my-svg-icon :path="mdiChevronLeft" class="h-5 w-5" aria-hidden="true" />
            </button>
            <template v-for="leftEl in paginationObj.left" :key="leftEl.val">
              <pagination-pg-button :current="leftEl.current" @click="optionsInternal.page = leftEl.val">
                {{ leftEl.val }}
              </pagination-pg-button>
            </template>
            <span
              v-if="(!paginationObj.middle.length || paginationObj.left.length===1) && pageCount>7"
              class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
            >...</span>
            <template v-for="midEl in paginationObj.middle" :key="midEl.val">
              <pagination-pg-button :current="midEl.current" @click="optionsInternal.page = midEl.val">
                {{ midEl.val }}
              </pagination-pg-button>
            </template>
            <span
              v-if="paginationObj.right.length===1"
              class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
            >...</span>
            <template v-for="rightEl in paginationObj.right" :key="rightEl.val">
              <pagination-pg-button :current="rightEl.current" @click="optionsInternal.page = rightEl.val">
                {{ rightEl.val }}
              </pagination-pg-button>
            </template>
            <button
              :disabled="pageCount==optionsInternal.page"
              class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              @click="optionsInternal.page++"
            >
              <span class="sr-only">Next</span>
              <common-my-svg-icon :path="mdiChevronRight" class="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { mdiArrowDown, mdiArrowUp, mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { PropType } from 'vue';
import { DataTableHeaderElement, DataTableOptions } from '~/interfaces';
import { copyObject } from '~/helpers';

const props = defineProps({
  stickyHead: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  items: {
    type: Array,
    default: () => [],
    required: true
  },
  headers: {
    type: Array as PropType<DataTableHeaderElement[]>,
    default: () => [],
    required: true
  },
  pageCountExternal: {
    type: Number,
    default: () => null
  },
  totalCountExternal: {
    type: Number as PropType<number>,
    default: () => null
  },
  options: {
    type: Object as PropType<DataTableOptions>,
    default: () => ({
      page: 1,
      itemsPerPage: 20,
      sortBy: [],
      sortDesc: []
    })
  }
});
const emits = defineEmits(['update:options']);
const optionsInternal = computed<DataTableOptions>({
  get: () => props.options,
  set: v => emits('update:options', v)
});
const totalItems = computed<number>(() => props.totalCountExternal || props.items?.length || 0);
const pageCount = computed<number>(() => props.pageCountExternal || parseInt((totalItems.value / optionsInternal.value.itemsPerPage).toString()) + ((totalItems.value % optionsInternal.value.itemsPerPage) > 0 ? 1 : 0));
const filtredItems = computed<any[]>(() => {
  let arr = copyObject<any[]>(props.items);
  if (props.totalCountExternal) {
    arr = arr.slice(0, optionsInternal.value.itemsPerPage);
  } else {
    const start = (optionsInternal.value.page - 1) * optionsInternal.value.itemsPerPage;
    arr = arr.slice(start, start + optionsInternal.value.itemsPerPage);
  }
  if (optionsInternal.value.sortBy.length) {
    const prop = optionsInternal.value.sortBy[0];
    const desc = optionsInternal.value.sortDesc.length && optionsInternal.value.sortDesc[0];
    arr.sort((a, b) => {
      if (desc && b[prop] < a[prop]) {
        return -1;
      } else if (!desc && a[prop] > b[prop]) {
        return 1;
      }
      return 0;
    });
  }
  return arr;
});
const isSort = ({ value }: { value: string }) => {
  return optionsInternal.value.sortBy.includes(value);
};
const isSortDesc = ({ value }: { value: string }) => {
  const index = optionsInternal.value.sortBy.findIndex(e => e === value) ?? -1;
  if (index >= 0) {
    return optionsInternal.value.sortDesc[index];
  } else {
    return null;
  }
};
const changeSort = (h: DataTableHeaderElement) => {
  if (isSort(h)) {
    const index = optionsInternal.value.sortBy.findIndex(e => e === h.value) ?? -1;
    optionsInternal.value.sortDesc[index] = !optionsInternal.value.sortDesc[index];
  } else {
    optionsInternal.value.sortBy[0] = h.value;
    optionsInternal.value.sortDesc[0] = false;
  }
};

interface PagElInterface {
  current: boolean;
  val: number;
}

interface PagObj {
  left: PagElInterface[],
  middle: PagElInterface[],
  right: PagElInterface[],
}

const getPageVals = (num: number, from: number): PagElInterface[] => Array.from(Array(num).keys()).map((n) => {
  const tmp = {
    val: (from || (n + 1)),
    current: (from || (n + 1)) === optionsInternal.value.page
  };
  from++;
  return tmp;
}) as PagElInterface[];
const paginationObj = computed<PagObj>(() => {
  const res: PagObj = {
    left: [],
    middle: [],
    right: []
  };
  if (pageCount.value <= 7) {
    res.left = getPageVals(pageCount.value, 1);
  } else if ([1, 2, 3].includes(optionsInternal.value.page)) {
    res.left = getPageVals(4, 1);
    res.right = getPageVals(3, pageCount.value - 2);
  } else if ([pageCount.value, pageCount.value - 1, pageCount.value - 2].includes(optionsInternal.value.page)) {
    res.left = getPageVals(1, 1);
    res.right = getPageVals(4, pageCount.value - 3);
  } else {
    res.left = getPageVals(1, 1);
    res.middle = getPageVals(3, optionsInternal.value.page - 1);
    res.right = getPageVals(1, pageCount.value);
  }
  return res;
});
const showing = computed(() => ((optionsInternal.value.page - 1) * optionsInternal.value.itemsPerPage + 1));
const showingTo = computed(() => (optionsInternal.value.page * optionsInternal.value.itemsPerPage > totalItems.value ? totalItems : optionsInternal.value.page * optionsInternal.value.itemsPerPage));
const hoverHeaderElements = ref<Set<string>>(new Set());
</script>

<style scoped lang="scss">
.header-enter-active {
  transition: opacity 0.2s ease-in-out;
}
.header-leave-active {
  transition: opacity 0.2s ease-in-out;
}
.header-enter-from {
  opacity: 0;
}
.header-enter-to {
  opacity: 1;
}
.header-leave-from {
  opacity: 1;
}
.header-leave-to {
  opacity: 0;
}
</style>
