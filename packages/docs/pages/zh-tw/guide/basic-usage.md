# 基礎使用

::: warning
由於 VitePress 的樣式限制，文件中的組件展示效果可能與實際使用時有所差異，請以實際安裝後的效果為準。
:::

## DatePicker 組件

::: raw

<div class="demo-container space-y-2">
  <DatePicker v-model="basicDate" :locale="locale" />
  <div class="py-1 px-2 bg-gray-100 rounded dark:bg-gray-800 text-sm">
      v-model: {{ basicDate }}
  </div>
</div>

:::

```vue
<template>
  <DatePicker v-model="date" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { DatePicker } from "@tiaohsun/vue-datepicker";
import "@tiaohsun/vue-datepicker/style";

const date = ref("");
</script>
```

## DateRange 組件

::: raw

<div class="demo-container space-y-2">
  <DateRange v-model="dateRange" :locale="locale" />
  <div class="py-1 px-2 bg-gray-100 rounded dark:bg-gray-800 text-sm">
      v-model: {{ dateRange }}
  </div>
</div>
:::

```vue
<template>
  <DateRange v-model="dateRange" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { DateRange } from "@tiaohsun/vue-datepicker";
import "@tiaohsun/vue-datepicker/style";

const dateRange = ref({
  start: "",
  end: "",
});
</script>
```

## 自定義格式

::: raw

<div class="demo-container space-y-2">
  <DatePicker v-model="formattedDate" date-format="DD/MM/YYYY" :locale="locale" output-type="custom" dateSeparator="/" />
  <div v-if="formattedDate" class="py-1 px-2 bg-gray-100 rounded dark:bg-gray-800 text-sm">
      v-model: {{ formattedDate }}
  </div>
</div>
:::

::: details Code Example

```vue
<template>
  <DatePicker
    v-model="date"
    date-format="DD/MM/YYYY"
    output-type="custom"
    dateSeparator="/"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { DatePicker } from "@tiaohsun/vue-datepicker";
import "@tiaohsun/vue-datepicker/style";

const date = ref(null);
</script>
```

:::

## 啟用時間

::: raw

<div class="demo-container space-y-2">
  <DatePicker v-model="timeDate" :locale="locale" output-type="custom" :show-time="true" />
  <div v-if="timeDate" class="py-1 px-2 bg-gray-100 rounded dark:bg-gray-800 text-sm">
      v-model: {{ timeDate }}
  </div>
</div>
:::

::: details Code Example

```vue
<template>
  <DatePicker v-model="date" output-type="custom" :show-time="true" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { DatePicker } from "@tiaohsun/vue-datepicker";
import "@tiaohsun/vue-datepicker/style";

const date = ref(null);
</script>
```

:::

## 使用不同日曆

::: raw

<div class="demo-container space-y-2">
  <DatePicker v-model="rocDate"  :locale="locale" calendar="roc" output-type="custom" />
  <div v-if="rocDate" class="py-1 px-2 bg-gray-100 rounded dark:bg-gray-800 text-sm">
      v-model: {{ rocDate }}
  </div>
</div>
:::

::: details Code Example

```vue
<template>
  <DatePicker v-model="date" calendar="roc" output-type="custom" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { DatePicker } from "@tiaohsun/vue-datepicker";
import "@tiaohsun/vue-datepicker/style";

const date = ref(null);
</script>
```

:::

## 自定義樣式

### Theme

::: raw

<div class="demo-container">
  <DatePicker v-model="themeDate" :locale="locale" theme="blue"  />
</div>

:::

### Dark Mode

::: raw

<div class="demo-container">
  <DatePicker v-model="themeDate" :locale="locale" mode="dark"  />
</div>

:::

::: details Code Example

```vue
<template>
  <DatePicker v-model="date1" theme="blue" />
  <DatePicker v-model="date2" mode="dark" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { DatePicker } from "@tiaohsun/vue-datepicker";
import "@tiaohsun/vue-datepicker/style";

const date1 = ref(null);
const date2 = ref(null);
</script>
```

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()
const locale = computed(() => lang.value);

const basicDate = ref('')
const formattedDate = ref(null)
const dateRange = ref({
  start: '',
  end: '',
})

const timeDate = ref('')

const rocDate = ref('');
const themeDate = ref('');
</script>
