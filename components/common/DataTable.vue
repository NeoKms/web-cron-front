<template>
  {{ paginationObj }}
  {{ optionsInternal.page }}
  <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
    <div class="flex flex-1 justify-between sm:hidden">
      <a href="#" class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
      <a href="#" class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Showing
          <span class="font-medium">{{
            (optionsInternal.page - 1) * optionsInternal.itemsPerPage + 1
          }}</span>
          to
          <span class="font-medium">{{
            optionsInternal.page * optionsInternal.itemsPerPage > totalItems ? totalItems : optionsInternal.page * optionsInternal.itemsPerPage
          }}</span>
          of
          <span class="font-medium">{{ totalItems }}</span>
          results
        </p>
      </div>
      <div>
        <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <button :disabled="optionsInternal.page==1" class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0" @click="optionsInternal.page--">
            <span class="sr-only">Previous</span>
            <common-my-svg-icon :path="mdiChevronLeft" class="h-5 w-5" aria-hidden="true" />
          </button>
          <template v-for="leftEl in paginationObj.left" :key="leftEl.val">
            <pagination-pg-button :current="leftEl.current" @click="optionsInternal.page = leftEl.val">
              {{ leftEl.val }}
            </pagination-pg-button>
          </template>
          <span v-if="(!paginationObj.middle.length || paginationObj.left.length===1) && pageCount>7" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
          <template v-for="midEl in paginationObj.middle" :key="midEl.val">
            <pagination-pg-button :current="midEl.current" @click="optionsInternal.page = midEl.val">
              {{ midEl.val }}
            </pagination-pg-button>
          </template>
          <span v-if="paginationObj.right.length===1" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
          <template v-for="rightEl in paginationObj.right" :key="rightEl.val">
            <pagination-pg-button :current="rightEl.current" @click="optionsInternal.page = rightEl.val">
              {{ rightEl.val }}
            </pagination-pg-button>
          </template>
          <button :disabled="pageCount==optionsInternal.page" class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0" @click="optionsInternal.page++">
            <span class="sr-only">Next</span>
            <common-my-svg-icon :path="mdiChevronRight" class="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { PropType } from 'vue';
import { copyObject } from '~/helpers';
import { DataTableHeaderElement, DataTableOptions } from '~/interfaces';
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
  let itemsCopy = copyObject<any[]>(props.items);
  if (props.totalCountExternal >= 0) {
    itemsCopy = itemsCopy.splice(0, optionsInternal.value.itemsPerPage);
  } else {
    itemsCopy = itemsCopy.splice((optionsInternal.value.page - 1) * optionsInternal.value.itemsPerPage, optionsInternal.value.itemsPerPage);
  }
  return itemsCopy;
});
const changeItemsPerPage = (val: number) => {
  optionsInternal.value.itemsPerPage = val;
};
const isSort = ({ value }: {value: string}) => {
  return optionsInternal.value.sortBy.includes(value);
};
const isSortDesc = ({ value }: {value: string}) => {
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
</script>

<style scoped>

</style>
